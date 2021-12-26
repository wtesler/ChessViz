import s from "./NotFound.module.css";
import React, {useCallback} from "react";
import {HOME, PAGE_NOT_FOUND} from "../../../Constants/i18n";
import {withRouter} from "react-router-dom";
import {ROUTE_LANDING} from "../../../Constants/routes";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import ThemedButton from "../Theme/Button/ThemedButton";

const NotFound = props => {
  const {history} = props;

  const onHomeClick = useCallback(() => {
    history.push(ROUTE_LANDING);
  }, [history]);


  return (
    <div className={s.outer}>
      <ThemedBackground/>
      <div className={`${s.explanation} ThemeHeader`}>{PAGE_NOT_FOUND}</div>
      <ThemedButton className={s.homeButton} onClick={onHomeClick}>{HOME}</ThemedButton>
    </div>
  );
}

export default withRouter(NotFound);
