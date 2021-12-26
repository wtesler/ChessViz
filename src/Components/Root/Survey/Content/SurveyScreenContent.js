import s from './SurveyScreenContent.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import Item from "../Item/SectionItem";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";
import {FAILED_LOAD_PROFILE, PROGRESS, SECTION} from "../../../../Constants/i18n";
import {withRouter} from "react-router-dom";
import SurveyScreenSubmit from "./Submit/SurveyScreenSubmit";
import SurveyScreenEvaluatorSubmit from "./EvaluatorSubmit/SurveyScreenEvaluatorSubmit";

const SurveyScreenContent = props => {
  const {module, location, requests} = props;
  const {userSurveyManager, user, serverClient, toastRelay} = module;
  const [survey, setSurvey] = useState(null);
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState(null);
  const [profile, setProfile] = useState(null);

  userSurveyManager.initWithLocation(user, location);

  const onUserSurvey = useCallback((survey, progress, stats) => {
    setSurvey(survey);
    setProgress(progress);
    setStats(stats);
  }, []);

  useEffect(() => {
    userSurveyManager.addListener(onUserSurvey);

    return () => {
      userSurveyManager.removeListener(onUserSurvey);
    }
  }, [userSurveyManager, onUserSurvey]);

  const readProfile = useCallback(async () => {
    try {
      const uid = userSurveyManager.getUid();
      const profile = await serverClient.readProfileForEvaluation(uid, requests);
      setProfile(profile);
    } catch (e) {
      if (e.message.includes('Aborted')) {
        console.warn('Aborted');
        return;
      }
      console.error(e);
      toastRelay.show(FAILED_LOAD_PROFILE, false, 5000);
    }
  }, [requests, toastRelay, serverClient, userSurveyManager]);

  useEffect(() => {
    readProfile();
    // eslint-disable-next-line
  }, []);

  const evaluationHeader = useMemo(() => {
    if (!userSurveyManager.isEvaluation()) {
      return null;
    }
    if (!profile) {
      return null;
    }

    return (
      <div className={s.evaluationHeader}>
        {`Evaluation of ${profile.data.orgName}`}
      </div>
    )
  }, [userSurveyManager, profile]);

  const stasisCover = useMemo(() => {
    if (!progress) {
      return null;
    }

    // Condition For Evaluator
    if (userSurveyManager.isEvaluation() && !progress.finishedEvaluators.includes(user.uid)) {
      return null;
    }

    // Condition For Organization
    if (!userSurveyManager.isEvaluation() && !progress.meta.isReviewing) {
      return null;
    }

    return (
      <div
        className={s.stasisCover}
        onClick={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}>
        {'Submitted'}
      </div>
    )
  }, [progress, userSurveyManager, user]);

  const submitContent = useMemo(() => {
    if (!stats || !progress || userSurveyManager.isEvaluation()) {
      return null;
    }
    if (progress.meta.isReviewing) {
      return null; // We already submit the survey for review.
    }

    for (const section of Object.values(stats.sections)) {
      if (section.numCompletedQuestions < section.numQuestions) {
        return null;
      }
    }
    return (
      <SurveyScreenSubmit/>
    );
  }, [stats, progress, userSurveyManager]);

  const submitEvaluationContent = useMemo(() => {
    if (!stats || !progress || !userSurveyManager.isEvaluation()) {
      return null;
    }

    if (progress.finishedEvaluators.includes(user.uid)) {
      return null; // We already finished the evaluation.
    }

    for (const section of Object.values(stats.sections)) {
      if (section.numCompletedQuestions < section.numQuestions) {
        return null;
      }
    }

    return (
      <SurveyScreenEvaluatorSubmit/>
    );
  }, [stats, progress, userSurveyManager, user]);

  const mainContent = useMemo(() => {
    if (!survey || !stats) {
      return <BasicLoading/>;
    }

    const itemElements = [];
    for (let i = 0; i < survey.length; i++) {
      const section = survey[i];
      const sectionId = section.id;
      const sectionStats = stats.sections[sectionId];
      itemElements.push(<Item section={section} stats={sectionStats} i={i} key={section.id}/>);
    }

    return (
      <div className={s.outer}>
        {evaluationHeader}
        <div className={s.inner}>
          <div className={s.innerBody}>
            <div className={`${s.headerOuter}`}>
              <div className={`${s.headerFirst}`}>
                {SECTION}
              </div>
              <div className={`${s.headerSecond}`}>
                {PROGRESS}
              </div>
            </div>
            <div className={s.itemsContainer}>
              {itemElements}
            </div>
          </div>
          {stasisCover}
        </div>
        <div className={s.submitContainer}>
          {submitContent}
          {submitEvaluationContent}
        </div>
      </div>
    );
  }, [survey, stats, evaluationHeader, submitContent, submitEvaluationContent, stasisCover]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withRouter(withSubscription(withModule(SurveyScreenContent)));
