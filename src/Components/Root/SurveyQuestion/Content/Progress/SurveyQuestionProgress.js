import s from './SurveyQuestionProgress.module.css';
import React, {useMemo} from "react";

const SurveyQuestionProgress = ({stats}) => {
  return useMemo(() => {
    if (!stats) {
      return null;
    }

    const percentDone = stats.completedRatio * 100;

    const completionText = `${stats.numCompletedQuestions}/${stats.numQuestions}`;

    return (
      <div className={s.progressOuter}>
        <div className={s.progressStatusCompletion}>
          {completionText}
        </div>
        <div className={s.progressStatus}>
          {`Questions complete`}
        </div>
        <div className={s.progressBarOuter}>
          <div className={s.progressBar}>
            <div className={s.progressBarFill} style={{width: `${percentDone}%`}}/>
          </div>
        </div>
      </div>
    )
  }, [stats]);
}

export default SurveyQuestionProgress;
