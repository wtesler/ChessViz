import s from './MainScreen.module.css';
import {withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import { useMemo} from "react";
import MainModule from "./Module/MainModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import ChessBoard from "../ChessBoard/ChessBoard";
import GameControls from "../Game/GameControls";
import AttentionBar from "../AttentionBar/AttentionBar";
// import TestChessDotComApi from "../TestApi/TestChessDotComApi";

const MainScreen = () => {
  const bodyContent = useMemo(() => {
    return (
      <div className={s.body}>
        <ChessBoard/>
        <AttentionBar/>
        <GameControls/>
      </div>
    );
  }, []);

  return (
    <div className={s.outer}>
      <ThemedBackground/>
      {bodyContent}
      {/*<TestChessDotComApi />*/}
    </div>
  );
}

export default withRouter(withModule(MainScreen, MainModule));
