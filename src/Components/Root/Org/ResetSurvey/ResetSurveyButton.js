import s from './ResetSurveyButton.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useState} from "react";
import ThemedButton from "../../Theme/Button/ThemedButton";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";

const ResetSurveyButton = ({profile, module, className, requests}) => {
  const {serverClient, toastRelay} = module;

  const [text, setText] = useState(`Reset Survey Submission`);

  const onClick = useCallback(async () => {
    const shouldReset = window.confirm(`Are you sure you want to reset the survey submission?`);
    if (!shouldReset) {
      return;
    }

    try {
      toastRelay.show('Resetting Submission Status', true);
      await serverClient.resetSubmissionStatus(profile.uid, requests)
      toastRelay.show(null);
      setText('Success');
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to reset submission status. Try again.', false, 5000);
    }

  }, [requests, profile, toastRelay, serverClient]);

  return (
    <ThemedButton className={`${s.outer} ${className ? className : ''}`} onClick={onClick}>
      {text}
    </ThemedButton>
  );
}

export default withSubscription(withModule(ResetSurveyButton));
