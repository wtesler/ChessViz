import PlayerGamesManager from "../../../../Games/PlayerGamesManager";
import ChessDotComClient from "../../../../APIs/ChessDotComClient";
import GameManager from "../../../../Game/GameManager";

const MainModule = (rootModule) => {
  const chessDotComClient = new ChessDotComClient();
  const playerGamesManager = new PlayerGamesManager(chessDotComClient);
  const gameManager = new GameManager(playerGamesManager);

  const module = {
    playerGamesManager: playerGamesManager,
    gameManager: gameManager
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
