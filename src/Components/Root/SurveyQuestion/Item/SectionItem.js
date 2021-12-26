import s from './SectionItem.module.css';
import React, {useCallback, useMemo} from 'react';
import {withRouter} from "react-router-dom";
import {ROUTE_SURVEY} from "../../../../Constants/routes";
import {Icon} from "react-basic-icon";
import survey_forward_arrow from "../../../../Images/survey_forward_arrow.svg";

const SectionItem = ({section, stats, history, i}) => {

  const titleElement = useMemo(() => {
    return (
      <div className={s.titleOuter}>
        {`${i + 1} - ${section.title}`}
      </div>
    )
  }, [section, i]);

  const progressElement = useMemo(() => {
    const percentDone = stats.completedRatio * 100;

    const completionText = stats.numCompletedQuestions === 0
      ? '' : `${stats.numCompletedQuestions}/${stats.numQuestions}`;

    const statusText = stats.numCompletedQuestions === 0
      ? 'Not started' : `Questions complete`;

    let progressText = 'Get Started';
    if (stats.numCompletedQuestions === stats.numQuestions) {
      progressText = 'Completed';
    } else if (stats.numCompletedQuestions > 0) {
      progressText = 'Continue';
    }

    return (
      <div className={s.progressOuter}>
        <div className={s.progressStatusOuter}>
          <div className={s.progressStatusCompletion}>
            {completionText}
          </div>
          <div className={s.progressStatus}>
            {statusText}
          </div>
        </div>
        <div className={s.progressBarOuter}>
          <div className={s.progressBarText}>
            {progressText}
          </div>
          <div className={s.progressBar}>
            <div className={s.progressBarFill} style={{width: `${percentDone}%`}}/>
          </div>
        </div>
        <div className={s.arrowIconOuter}>
          <Icon src={survey_forward_arrow} className={s.arrowIcon}/>
        </div>
      </div>
    )
  }, [stats]);

  const onClick = useCallback(() => {
    history.push(`${ROUTE_SURVEY}/${section.id}`);
  }, [history, section]);

  const outerStyle = useMemo(() => {
    const style = {};
    style.backgroundColor = i % 2 === 0 ? '#EFEFEF' : '#FFFFFF';
    return style;
  }, [i]);

  return (
    <div className={s.outer} onClick={onClick} style={outerStyle}>
      <div className={s.inner}>
        {titleElement}
        {progressElement}
      </div>
    </div>
  );
}

export default withRouter(SectionItem);
