import s from './SectionItem.module.css';
import React, {useCallback, useMemo} from 'react';
import {withRouter} from "react-router-dom";
import {ROUTE_SURVEY_EDIT_SECTION} from "../../../../Constants/routes";
import SurveyItemActions from "../../SurveyItemActions/SurveyItemActions";
import {Icon} from "react-basic-icon";
import pencilImage from "../../../../Images/pencil.svg";

const SectionItem = ({section, history, onReorder, onDelete, onRename, i}) => {

  const titleElement = useMemo(() => {
    return (
      <div className={s.titleOuter}>
        {section.title}
      </div>
    )
  }, [section]);

  const numberElement = useMemo(() => {
    return (
      <div className={s.number}>
        {`${i + 1}.`}
      </div>
    )
  }, [i]);

  const onClick = useCallback(() => {
    history.push(`${ROUTE_SURVEY_EDIT_SECTION}/${section.id}`);
  }, [history, section]);

  const onRenameClick = useCallback(event => {
    event.stopPropagation();
    onRename(section);
  }, [onRename, section]);

  return (
    <div className={s.outer} onClick={onClick}>
      <div className={s.inner}>
        {numberElement}
        {titleElement}
        <Icon src={pencilImage} className={s.editIcon} onClick={onRenameClick} />
        <SurveyItemActions item={section} onReorder={onReorder} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default withRouter(SectionItem);
