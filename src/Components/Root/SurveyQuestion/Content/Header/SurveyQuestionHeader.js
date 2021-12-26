import s from './SurveyQuestionHeader.module.css';
import React, {useMemo} from "react";
import {SECTION} from "../../../../../Constants/i18n";
import SurveyQuestionProgress from "../Progress/SurveyQuestionProgress";

const SurveyQuestionHeader = ({stats, survey, section}) => {
  const sectionNumber = useMemo(() => {
    if (!survey || !section) {
      return '';
    }
    const sectionId = section.id;
    for (let i = 0; i < survey.length; i++) {
      if (survey[i].id === sectionId) {
        return i + 1;
      }
    }
    return '?';
  }, [survey, section]);

  return useMemo(() => {
    if (!stats) {
      return null;
    }

    return (
      <div className={`${s.headerOuter}`}>
        <div className={`${s.headerFirst}`}>
          {`${SECTION} ${sectionNumber} - ${section.title}`}
        </div>
        <div className={`${s.headerSecond}`}>
          <SurveyQuestionProgress stats={stats} />
        </div>
      </div>
    )
  }, [stats, sectionNumber, section]);
}

export default SurveyQuestionHeader;
