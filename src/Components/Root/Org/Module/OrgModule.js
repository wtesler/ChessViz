import {LoginManager} from "firebase-login-manager";
import ProfileManager from "../../../../Profile/ProfileManager";
import PlanManager from "../../../../Plan/PlanManager";

const OrgModule = (rootModule) => {
  const serverClient = rootModule.serverClient;
  const toastRelay = rootModule.toastRelay;
  const loginManager = new LoginManager(false, toastRelay);

  const module = {
    orgProfileManager: new ProfileManager(loginManager, serverClient),
    orgPlanManager: new PlanManager(loginManager, serverClient, toastRelay)
  };

  return [
    module,
    () => {
      module.orgProfileManager.destruct();
      module.orgPlanManager.destruct();
    }
  ]
}

export default OrgModule;
