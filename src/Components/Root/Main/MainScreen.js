import s from './MainScreen.module.css';
import {withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import { useMemo} from "react";
import MainModule from "./Module/MainModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import {HELLO_MESSAGE} from "../../../Constants/i18n";

const MainScreen = () => {
  const bodyContent = useMemo(() => {
    return (
      <div className={s.body}>
        {HELLO_MESSAGE}
      </div>
    );
  }, []);

  return (
    <div className={s.outer}>
      <ThemedBackground/>
      {bodyContent}
    </div>
  );
}

export default withRouter(withModule(MainScreen, MainModule));
