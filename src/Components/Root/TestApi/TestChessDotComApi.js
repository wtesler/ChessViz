import {useCallback, useEffect} from "react";
import {withModule} from "react-hoc-di";

/**
 * Tests out the chess.com APIs.
 */
const TestChessDotComApi = props => {
  const {module} = props;
  const {playerGamesManager} = module;

  const onPlayerPgns = useCallback(playerPgns => {
    console.log(playerPgns);
  }, []);

  useEffect(() => {
    playerGamesManager.addListener(onPlayerPgns);
    return () => {
      playerGamesManager.removeListener(onPlayerPgns);
    }
  }, [playerGamesManager, onPlayerPgns]);

  const fetchPgns = useCallback(async () => {
    await playerGamesManager.setParams('hellowill89', 12, 2021);
  }, [playerGamesManager]);

  useEffect(() => {
    fetchPgns();
    // eslint-disable-next-line
  }, []);

  return null;
}

export default withModule(TestChessDotComApi);
