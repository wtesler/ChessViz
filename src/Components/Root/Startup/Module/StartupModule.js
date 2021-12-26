import Store from "../../../../Store/Store";
import {Subject} from "rxjs";
import ServerClient from "../../../../Server/ServerClient";
import DatabaseClient from "../../../../Server/DatabaseClient";
import {SurveyManager} from "../../../../Survey/SurveyManager";

const StartupModule = (rootModule) => {
  const serverClient = new ServerClient();
  const surveyManager = new SurveyManager(serverClient);

  const module = {
    saveClickSubject: new Subject(),
    serverClient: serverClient,
    databaseClient: new DatabaseClient(),
    store: new Store(),
    hamburgerMenuSubject: new Subject(),
    surveyManager: surveyManager,
  };

  return [
    module,
    () => {
      module.saveClickSubject.complete();
      serverClient.destruct();
      surveyManager.destruct();
      module.databaseClient.destruct();
      module.store.destruct();
      module.hamburgerMenuSubject.complete();
    }
  ];
}

export default StartupModule;
