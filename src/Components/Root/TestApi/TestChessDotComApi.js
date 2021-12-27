import {useCallback, useEffect} from "react";
import {withModule} from "react-hoc-di";

/**
 * Tests out the chess.com APIs.
 */
const TestChessDotComApi = props => {
  const USERNAME = "hellowill89";
  const MONTH = 12;
  const YEAR = 2021;

  const {module} = props;
  const {playerGamesManager} = module;

  const onGames = useCallback(games => {
    console.log(games);
  }, []);

  useEffect(() => {
    playerGamesManager.addListener(onGames);
    return () => {
      playerGamesManager.removeListener(onGames);
    }
  }, [playerGamesManager, onGames]);

  const fetchGames = useCallback(async () => {
    await playerGamesManager.fetch(USERNAME, MONTH, YEAR);
  }, [playerGamesManager]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line
  }, []);

  return null;
}

export default withModule(TestChessDotComApi);
