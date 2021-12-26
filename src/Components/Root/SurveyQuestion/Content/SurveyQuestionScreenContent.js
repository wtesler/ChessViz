import s from './SurveyQuestionScreenContent.module.css';
import {withModule} from "react-hoc-di";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import {withRouter} from "react-router-dom";
import {URLHelper} from "../../../../URL/URLHelper";
import SurveyQuestionHeader from "./Header/SurveyQuestionHeader";
import SurveyQuestionBody from "./Body/SurveyQuestionBody";
import SurveyQuestionNav from "./Nav/SurveyQuestionNav";
import {ROUTE_SURVEY} from "../../../../Constants/routes";
import {Subscription} from "rxjs";
import * as queryString from 'query-string';

const SurveyQuestionScreenContent = props => {
  const {module, location, history} = props;
  const {userSurveyManager, pageRelay, user} = module;
  const [survey, setSurvey] = useState(null);
  const [overallStats, setOverallStats] = useState(null);
  const [stats, setStats] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [section, setSection] = useState(null);
  // const [sectionProgress, setSectionProgress] = useState(null);
  const [questionProgress, setQuestionProgress] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(null);

  const subRef = useRef(null);

  userSurveyManager.initWithLocation(user, location);

  const onUserSurvey = useCallback((survey, progress, stats) => {
    setSurvey(survey);
    setUserProgress(progress);
    setOverallStats(stats);
  }, []);

  useEffect(() => {
    userSurveyManager.addListener(onUserSurvey);

    return () => {
      userSurveyManager.removeListener(onUserSurvey);
    }
  }, [userSurveyManager, onUserSurvey]);

  const changeQuestionNumber = useCallback((num, shouldReplace) => {
    URLHelper.addQueryParam('q', num, location, history, shouldReplace);
    setQuestionNumber(num);
  }, [location, history]);

  const onPage = useCallback(increment => {
    const newQuestionNumber = questionNumber + increment;
    const isSectionFinished = newQuestionNumber > section.questions.length - 1;
    if (increment === 0 || isSectionFinished) {
      // Going back to survey sections screen.
      const searchObj = URLHelper.getSearchObject(location);
      delete searchObj['q'];
      const searchString = queryString.stringify(searchObj);
      history.push({
        pathname: ROUTE_SURVEY,
        search: searchString
      });
    } else {
      changeQuestionNumber(newQuestionNumber, false);
      window.scrollTo(0, 0);
    }
  }, [section, questionNumber, location, history, changeQuestionNumber]);

  useEffect(() => {
    if (subRef.current) {
      subRef.current.unsubscribe();
    }
    const subscription = new Subscription();
    subscription.add(pageRelay.subscribe(onPage));
    subRef.current = subscription;

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [subRef, pageRelay, onPage]);

  const getSection = useCallback((survey, sectionId) => {
    for (const section of survey) {
      if (section.id === sectionId) {
        return section;
      }
    }
  }, []);

  const onLocationChange = useCallback((location) =>  {
    const params = URLHelper.getSearchObject(location);
    let newNumber = params.q;
    if (newNumber === null || newNumber === undefined) {
      newNumber = 0;
    } else {
      newNumber = Number.parseInt(newNumber);
    }
    if (newNumber !== questionNumber) {
      changeQuestionNumber(newNumber, true);
    }
    return newNumber;
  }, [questionNumber, changeQuestionNumber]);

  useEffect(() => {
    onLocationChange(location);
  }, [location, onLocationChange]);

  useEffect(() => {
    if (!survey || !overallStats || !userProgress) {
      return;
    }

    const sectionId = URLHelper.getPathEnd(location);
    const section = getSection(survey, sectionId);
    let sectionProgress = userProgress[sectionId];
    if (!sectionProgress) {
      sectionProgress = {};
    }
    setSection(section);
    setStats(overallStats.sections[sectionId]);
    // setSectionProgress(sectionProgress);

    let localNumber = questionNumber;
    if (localNumber === null || localNumber === undefined) {
      localNumber = onLocationChange(location);
    }

    const question = section.questions[localNumber];
    const questionId = question.id;
    const questionProgress = sectionProgress[questionId];

    setQuestion(question);
    setQuestionProgress(questionProgress);

  }, [location, survey, overallStats, onLocationChange, getSection, userProgress, questionNumber]);

  const mainContent = useMemo(() => {
    if (!survey || !stats || !userProgress || !section || !question) {
      return <BasicLoading/>;
    }

    return (
      <div className={s.outer}>
        <div className={s.inner}>
          <div className={s.innerBody}>
            <SurveyQuestionHeader stats={stats} section={section} survey={survey}/>
            <div className={s.bodyContainer}>
              <SurveyQuestionBody
                section={section}
                question={question}
                questionProgress={questionProgress}
                questionNumber={questionNumber}/>
            </div>
          </div>
          <div className={s.navContainer}>
            <SurveyQuestionNav section={section} questionNumber={questionNumber}/>
          </div>
        </div>
      </div>
    );
  }, [survey, section, userProgress, stats, question, questionNumber, questionProgress]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withRouter(withModule(SurveyQuestionScreenContent));
