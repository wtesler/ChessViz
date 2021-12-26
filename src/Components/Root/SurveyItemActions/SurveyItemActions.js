import s from './SurveyItemActions.module.css';
import React from 'react';
import {Icon} from "react-basic-icon";
import surveyArrowDown from "../../../Images/surveyArrowDown.svg";
import trashImage from "../../../Images/trash.svg";

const SurveyItemActions = ({item, onReorder, onDelete}) => {
  return (
    <div className={s.outer}>
      <Icon className={s.icon} src={surveyArrowDown} onClick={(evt) => onReorder(evt, false, item)}/>
      <Icon className={`${s.icon} ${s.iconUp}`} src={surveyArrowDown} onClick={(evt) => onReorder(evt, true, item)}/>
      <Icon className={`${s.icon} ${s.iconTrash}`} src={trashImage} onClick={(evt) => onDelete(evt, item)}/>
    </div>
  )
}

export default SurveyItemActions;
