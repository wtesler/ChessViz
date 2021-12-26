import s from './SurveyQuestionChoices.module.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import SurveyQuestionChoice from "./Choice/SurveyQuestionChoice";
import {withModule} from "react-hoc-di";
import withSubscription from "../../../../../../Subscriptions/shared/withSubscription";
import {FAILED_UPDATE_QUESTION_PROGRESS, UPDATING_QUESTION_PROGRESS} from "../../../../../../Constants/i18n";
import {Subscription} from "rxjs";

const SurveyQuestionChoices = props => {
  const {question, questionProgress, questionId, sectionId, module, requests} = props;

  const {saveRelay, pageRelay, serverClient, toastRelay, userSurveyManager, dirtyManager} = module;

  const [progress, setProgress] = useState(questionProgress);

  const subRef = useRef(null);

  useEffect(() => {
    setProgress(questionProgress);
  }, [questionProgress]);

  const onSave = useCallback(async (increment, newProgress) => {
    if (userSurveyManager.isEvaluation()) {
      return;
    }

    let localProgress = progress;
    if (newProgress) {
      localProgress = newProgress;
    }

    if (localProgress) {
      try {
        if (dirtyManager.isDirty()) {
          toastRelay.show(UPDATING_QUESTION_PROGRESS, true);
          await serverClient.updateUserQuestionProgress(sectionId, questionId, localProgress, requests);
          await userSurveyManager.readUserSurveyProgress();
          toastRelay.show(null);
          dirtyManager.setDirty(false);
        }
      } catch (e) {
        toastRelay.show(null);
        toastRelay.show(FAILED_UPDATE_QUESTION_PROGRESS, false, 5000);
        return;
      }
    }
    if (increment !== null && increment !== undefined) {
      pageRelay.next(increment);
    }
  }, [pageRelay, questionId, sectionId, requests, toastRelay,
    serverClient, progress, userSurveyManager, dirtyManager]);

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

  const createNewProgress = useCallback(() => {
    let newProgress = {};
    if (progress) {
      newProgress = Object.assign(newProgress, progress);
    }
    return newProgress;
  }, [progress]);

  const onFieldChange = useCallback((field, value) => {
    if (userSurveyManager.isEvaluation()) {
      return;
    }
    dirtyManager.setDirty(true);
    const newProgress = createNewProgress();
    newProgress[field] = value;
    setProgress(newProgress);
    return newProgress;
  }, [createNewProgress, dirtyManager, userSurveyManager]);

  const onChoiceSelected = useCallback((choice) => {
    onFieldChange('choiceId', choice.id);
  }, [onFieldChange]);

  const onBriefResponseChange = useCallback(response => {
    onFieldChange('briefResponse', response);
  }, [onFieldChange]);

  const onLongResponseChange = useCallback(response => {
    onFieldChange('longResponse', response);
  }, [onFieldChange]);

  const onFileChange = useCallback(hasFile => {
    const newProgress = onFieldChange('hasFile', hasFile);
    onSave(null, newProgress);
  }, [onFieldChange, onSave]);

  const onMultipleSelectChange = useCallback((selections, selectionOther) => {
    onFieldChange('selections', {
      selections: selections,
      other: selectionOther
    });
  }, [onFieldChange]);

  const choices = useMemo(() => {
    function nextChar(c) {
      return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    let char = 'A';

    const elements = [];
    for (const choice of question.choices) {
      const selected = progress && progress.choiceId === choice.id;
      elements.push(
        <SurveyQuestionChoice
          choice={choice}
          questionProgress={progress}
          letter={char}
          selected={selected}
          onClick={onChoiceSelected}
          onBriefResponseChange={onBriefResponseChange}
          onLongResponseChange={onLongResponseChange}
          onFileChange={onFileChange}
          onMultipleSelectChange={onMultipleSelectChange}
          key={choice.id}/>
      );
      char = nextChar(char);
    }

    return elements;
  }, [question, progress, onChoiceSelected, onBriefResponseChange, onLongResponseChange, onFileChange, onMultipleSelectChange]);

  return (
    <div className={s.outer}>
      {choices}
    </div>
  )
}

export default withSubscription(withModule(SurveyQuestionChoices));
