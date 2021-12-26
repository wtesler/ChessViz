import s from './SurveyQuestionEvaluator.module.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import withRole from "../../../../../../Roles/withRole";
import {BasicInput} from "react-forms-input";
import {Subscription} from "rxjs";
import {UPDATING_QUESTION_PROGRESS} from "../../../../../../Constants/i18n";
import withSubscription from "../../../../../../Subscriptions/shared/withSubscription";

const SurveyQuestionEvaluator = ({module, questionProgress, questionId, sectionId, requests}) => {
  const {userSurveyManager, user, saveRelay, pageRelay, toastRelay, serverClient} = module;

  const STATE_REJECT = 'Rejected';
  const STATE_ACCEPT = 'Accepted';

  const [status, setStatus] = useState(null);
  const [note, setNote] = useState('');

  const subRef = useRef(null);
  const dirtyRef = useRef(false);

  const egoEvaluation = useMemo(() => {
    if (!questionProgress || !questionProgress.evaluation) {
      return null;
    }
    const egoId = user.uid;
    return questionProgress.evaluation[egoId];
  }, [questionProgress, user]);

  const otherEvaluations = useMemo(() => {
    if (!questionProgress || !questionProgress.evaluation) {
      return null;
    }
    const egoId = user.uid;
    const evaluations = [];
    for (const uid of Object.keys(questionProgress.evaluation)) {
      // Filter out your own evaluation.
      if (uid === egoId) {
        continue;
      }
      const evaluation = questionProgress.evaluation[uid];
      evaluation.uid = uid; // Add uid to evaluation for convenience.
      evaluations.push(evaluation);
    }
    return evaluations;
  }, [questionProgress, user]);

  useEffect(() => {
    if (egoEvaluation) {
      const status = egoEvaluation.status;
      const note = egoEvaluation.note;
      setStatus(status);
      setNote(note ? note : '');
    } else {
      setStatus(null);
      setNote('');
    }
  }, [egoEvaluation]);

  const onSave = useCallback(async (increment) => {
    try {
      if (dirtyRef.current) {
        toastRelay.show(UPDATING_QUESTION_PROGRESS, true);
        const sid = userSurveyManager.getSid();
        await serverClient.updateEvaluatorQuestionProgress(sid, sectionId, questionId, status, note, requests);
        await userSurveyManager.readUserSurveyProgress();
        toastRelay.show(null);
        dirtyRef.current = false;
      }
    } catch (e) {
      toastRelay.show(null);
      toastRelay.show('Failed to save question evaluation. Please try again.', false, 5000);
      return;
    }

    if (increment !== null && increment !== undefined) {
      pageRelay.next(increment);
    }
  }, [pageRelay, userSurveyManager, toastRelay, serverClient, sectionId, questionId, requests, status, note]);

  useEffect(() => {
    if (subRef.current) {
      subRef.current.unsubscribe();
    }
    const subscription = new Subscription();
    subscription.add(saveRelay.subscribe(onSave));
    subRef.current = subscription;

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [saveRelay, onSave]);

  const onToggleClick = useCallback(clickedState => {
    dirtyRef.current = true;
    setStatus(clickedState);
  }, []);

  const toggleElement = useMemo(() => {
    const rejectSelect = status === STATE_REJECT ? s.toggleSelected : '';
    const acceptSelect = status === STATE_ACCEPT ? s.toggleSelected : '';

    return (
      <div className={s.toggleOuter}>
        <div className={`${s.toggleButtonOuter}`}>
          <div className={`${s.toggleButton} ${s.toggleReject} ${rejectSelect}`}
               onClick={() => onToggleClick(STATE_REJECT)}>
            {'Reject'}
          </div>
        </div>
        <div className={`${s.toggleButtonOuter}`}>
          <div className={`${s.toggleButton} ${s.toggleAccept} ${acceptSelect}`}
               onClick={() => onToggleClick(STATE_ACCEPT)}>
            {'Accept'}
          </div>
        </div>
      </div>
    )
  }, [status, onToggleClick]);

  const otherEvalsElement = useMemo(() => {
    if (!otherEvaluations) {
      return null;
    }
    const elements = [];
    for (const evaluation of otherEvaluations) {
      const {name, status, note, uid} = evaluation;
      const statusClass = status === STATE_ACCEPT ? s.otherStatusAccepted : s.otherStatusRejected;
      elements.push(
        <div className={`${s.otherOuter}`} key={uid}>
          <div className={`${s.otherTitle}`}>
            <span>
             {`${name}'s Evaluation:`}
            </span>
            <span className={`${s.otherStatus} ${statusClass}`}>
            {`${status}`}
            </span>
          </div>
          <div className={s.otherDivider}/>
          <div className={`${s.otherNote}`}>
            {`Note: ${note}`}
          </div>
        </div>
      );
    }
    return elements;
  }, [otherEvaluations]);

  const onNotesInputChange = useCallback(value => {
    dirtyRef.current = true;
    setNote(value);
  }, []);

  return (
    <div className={s.outer}>
      <div className={s.header}>
        {'Evaluator Panel'}
      </div>
      {toggleElement}
      <div className={s.notesInputOuter}>
        <BasicInput
          title={'Notes:'}
          className={s.notesInput}
          textClass={s.notesInputText}
          titleClass={s.notesInputTitle}
          initialValue={note}
          onChange={onNotesInputChange}
          maxChars={4096}
          isMultiline={true}
          minHeight={80}
          placeholder={'Explain the rationale for your decision, if necessary.'}
        />
      </div>
      <div className={s.othersContainer}>
        {otherEvalsElement}
      </div>
    </div>
  );
}

export default withRole(withSubscription(SurveyQuestionEvaluator), ['admin', 'liason', 'evaluator']);
