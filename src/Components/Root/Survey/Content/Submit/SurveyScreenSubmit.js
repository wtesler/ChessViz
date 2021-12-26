import s from './SurveyScreenSubmit.module.css';
import {withModule} from "react-hoc-di";
import withSubscription from "../../../../../Subscriptions/shared/withSubscription";
import {withRouter} from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";

const SurveyScreenSubmit = ({module, requests}) => {
  const {userSurveyManager, serverClient, toastRelay} = module;

  const outerRef = useRef();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: outerRef.current.offsetTop
    });
  }, []);

  const createSubmission = useCallback(async () => {
    try {
      toastRelay.show('Submitting Survey...', true);
      await serverClient.createSubmission(requests);
      await userSurveyManager.readUserSurveyProgress();
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to create submission. Please try again.', false, 5000);
    }
  }, [requests, toastRelay, serverClient, userSurveyManager]);

  return (
    <div className={s.outer} ref={outerRef}>
      <div className={`${s.text}`}>
        {`By submitting the survey, you agree that all the information provided regarding your organization is truthful and all your responses are accurate.`}
      </div>
      <div className={`${s.button}`} onClick={createSubmission}>
        {`Submit`}
      </div>
    </div>
  );
}

export default withRouter(withSubscription(withModule(SurveyScreenSubmit)));
