import s from './SurveyScreenEvaluatorSubmit.module.css';
import {withModule} from "react-hoc-di";
import withSubscription from "../../../../../Subscriptions/shared/withSubscription";
import {withRouter} from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";

const SurveyScreenEvaluatorSubmit = ({module, requests}) => {
  const {userSurveyManager, serverClient, toastRelay} = module;

  const outerRef = useRef();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: outerRef.current.offsetTop
    });
  }, []);

  const createSubmissionEvaluation = useCallback(async () => {
    try {
      toastRelay.show('Submitting Evaluation...', true);
      const uid = userSurveyManager.getUid();
      const sid = userSurveyManager.getSid();
      await serverClient.createSubmissionEvaluation(uid, sid, requests);
      await userSurveyManager.readUserSurveyProgress();
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to submit evaluation. Please try again.', false, 5000);
    }
  }, [requests, toastRelay, serverClient, userSurveyManager]);


  return (
    <div className={s.outer} ref={outerRef}>
      <div className={`${s.text}`}>
        {`By submitting the evaluation, you agree that you have followed proper guidelines.`}
      </div>
      <div className={`${s.button}`} onClick={createSubmissionEvaluation}>
        {`Submit`}
      </div>
    </div>
  );
}

export default withRouter(withSubscription(withModule(SurveyScreenEvaluatorSubmit)));
