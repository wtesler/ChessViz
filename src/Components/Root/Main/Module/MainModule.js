import PlayerGamesManager from "../../../../Games/PlayerGamesManager";
import ChessDotComClient from "../../../../APIs/ChessDotComClient";

const MainModule = (rootModule) => {
  const chessDotComClient = new ChessDotComClient();
  const playerGamesManager = new PlayerGamesManager(chessDotComClient);

  const module = {
    playerGamesManager: playerGamesManager
  };

  return [
    module,
    () => {
      chessDotComClient.destruct();
      playerGamesManager.destruct();
    }
  ]
}

export default MainModule;
