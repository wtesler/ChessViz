import ChessPlayerPgnsManager from "../../../../Games/ChessPlayerPgnsManager";

const MainModule = (rootModule) => {
  const playerPgnsManager = new ChessPlayerPgnsManager();

  const module = {
    playerPgnsManager: playerPgnsManager
  };

  return [
    module,
    () => {
      playerPgnsManager.destruct();
    }
  ]
}

export default MainModule;
