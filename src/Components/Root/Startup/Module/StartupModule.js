import Store from "../../../../Store/Store";

const StartupModule = (rootModule) => {

  const module = {
    store: new Store(),
  };

  return [
    module,
    () => {
      module.store.destruct();
    }
  ];
}

export default StartupModule;
