import {LoginManager} from 'firebase-login-manager';
import {UserSurveyManager} from "../../../../Survey/UserSurveyManager";
import ProfileManager from "../../../../Profile/ProfileManager";
import PlanManager from "../../../../Plan/PlanManager";

export const LoginModule = (rootModule) => {
  const serverClient = rootModule.serverClient;
  const surveyManager = rootModule.surveyManager;
  const toastRelay = rootModule.toastRelay;

  const loginManager = new LoginManager(true, toastRelay);

  const module = {
    loginManager: loginManager,
    userSurveyManager: new UserSurveyManager(surveyManager, serverClient),
    profileManager: new ProfileManager(loginManager, serverClient),
    planManager: new PlanManager(loginManager, serverClient, toastRelay),
  };

  return [
    module,
    () => {
      module.userSurveyManager.destruct();
      module.profileManager.destruct();
      module.planManager.destruct();
      loginManager.destruct();
    }
  ];
}

export default LoginModule;
