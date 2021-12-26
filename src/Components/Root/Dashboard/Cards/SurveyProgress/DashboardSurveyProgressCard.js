import s from './DashboardSurveyProgressCard.module.css';
import DashboardCard from "../DashboardCard";
import {withModule} from "react-hoc-di"
import {useCallback, useEffect, useMemo, useState} from "react";
import {withRouter} from "react-router-dom";
import {ROUTE_SURVEY} from "../../../../../Constants/routes";

const DashboardSurveyProgressCard = ({module, history}) => {
  const {userSurveyManager} = module;

  const [userProgress, setUserProgress] = useState();
  const [stats, setStats] = useState();

  const onUserSurvey = useCallback((survey, progress, stats) => {
    setStats(stats);
    setUserProgress(progress);
  }, []);

  const numSections = useMemo(() => {
    if (!stats) {
      return 0;
    }
    return Object.values(stats.sections).length;
  }, [stats]);

  const percentComplete = useMemo(() => {
    if (!stats) {
      return 0;
    }
    let totalCompleteQuestions = 0;
    let totalQuestions = 0;
    for (const section of Object.values(stats.sections)) {
      totalCompleteQuestions += section.numCompletedQuestions;
      totalQuestions += section.numQuestions;
    }
    const ratio = totalCompleteQuestions / totalQuestions;
    return ratio * 100;
  }, [stats]);

  const numCompletedSections = useMemo(() => {
    if (!stats) {
      return 0;
    }
    let count = 0;
    for (const section of Object.values(stats.sections)) {
      if (section.numCompletedQuestions === section.numQuestions) {
        count++;
      }
    }
    return count;
  }, [stats]);

  const isReviewing = useMemo(() => {
    return userProgress && userProgress.meta && userProgress.meta.isReviewing;
  }, [userProgress]);

  const promptText = useMemo(() => {
    if (isReviewing) {
      return 'Under Review';
    }
    return percentComplete === 0 ? 'Get Started' : 'Continue';
  }, [percentComplete, isReviewing]);

  useEffect(() => {
    userSurveyManager.addListener(onUserSurvey);
    return () => {
      userSurveyManager.removeListener(onUserSurvey);
    }
    // eslint-disable-next-line
  }, [userSurveyManager]);

  const onClick = useCallback(() => {
    history.push(ROUTE_SURVEY);
  }, [history]);

  return (
    <DashboardCard>
      <div className={s.outer} onClick={onClick}>
        <div className={s.percent}>
          {`${percentComplete.toFixed(0)}%`}
        </div>
        <div className={s.column}>
          <div className={s.progress}>
            {`Survey Progress:`}
          </div>
          <div className={s.completed}>
            {`${numCompletedSections} of ${numSections} Sections Completed`}
          </div>
          <div className={s.prompt}>
            {promptText}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

export default withRouter(withModule(DashboardSurveyProgressCard));
