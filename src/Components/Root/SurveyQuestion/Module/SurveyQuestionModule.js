import {Subject} from "rxjs";
import {DirtyManager} from "../../../../Dirty/DirtyManager";

const SurveyQuestionModule = (rootModule) => {
  const module = {
    saveRelay: new Subject(),
    pageRelay: new Subject(),
    dirtyManager: new DirtyManager(),
  };

  return [
    module,
    () => {
      module.saveRelay.complete();
      module.pageRelay.complete();
      module.dirtyManager.destruct();
    }
  ]
}

export default SurveyQuestionModule;
