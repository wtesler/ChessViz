import s from './SurveySectionEditContent.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import {
  ADD_QUESTION,
  FAILED_UPDATE_SURVEY_SECTION,
  UPDATING_SURVEY_SECTION
} from "../../../../Constants/i18n";
import QuestionItem from "../Item/QuestionItem";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";
import {withRouter} from "react-router-dom";
import {URLHelper} from "../../../../URL/URLHelper";
import {ROUTE_SURVEY_EDIT} from "../../../../Constants/routes";
import {Icon} from "react-basic-icon";
import plusImage from "../../../../Images/plus.svg";
import SaveButton from "../../Save/SaveButton";

const SurveySectionEditContent = props => {
  const {module, requests, location, history} = props;
  const {toastRelay, serverClient, surveyManager} = module;
  const [section, setSection] = useState(null);
  const [questions, setQuestions] = useState([]);

  let id;
  if (!URLHelper.hasId(location)) {
    history.push(ROUTE_SURVEY_EDIT);
  } else {
    id = URLHelper.getPathEnd(location);
  }

  const getSectionFromSurvey = useCallback((id, survey) => {
    for (const section of survey) {
      if (section.id === id) {
        return section;
      }
    }
    throw new Error(`Failed to find section with id: ${id}`);
  }, []);

  const onSurveyUpdate = useCallback((survey) => {
    if (!id) {
      return;
    }
    const section = getSectionFromSurvey(id, survey);
    setSection(section);
    setQuestions(section.questions);
  }, [id, getSectionFromSurvey]);

  useEffect(() => {
    surveyManager.addListener(onSurveyUpdate);

    return () => {
      surveyManager.removeListener(onSurveyUpdate);
    }
  }, [surveyManager, onSurveyUpdate]);

  const updateSection = useCallback(async () => {
    try {
      toastRelay.show(UPDATING_SURVEY_SECTION, true);
      await serverClient.setSurveySection(section, requests);
      await surveyManager.readSurvey();
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(FAILED_UPDATE_SURVEY_SECTION, false, 5000);
    }
  }, [toastRelay, requests, serverClient, surveyManager, section]);

  const generateId = useCallback(() => {
    const {customAlphabet} = require('nanoid');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = customAlphabet(alphabet, 20);
    return nanoid();
  }, []);

  const setNewQuestions = useCallback((questions) => {
    section.questions = questions;
    setQuestions(questions);
    setSection(section);
  }, [section]);

  const onAddQuestionClick = useCallback(async () => {
    const newQuestions = [...questions];

    const newQuestion = {
      id: generateId(),
      prompt: '',
      choices: []
    };

    newQuestions.push(newQuestion);

    setNewQuestions(newQuestions);
  }, [questions, setNewQuestions, generateId]);

  const onReorderClick = useCallback(async (evt, isUp, chosenQuestion) => {
    evt.stopPropagation();

    let ourIndex;
    let otherIndex;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.id === chosenQuestion.id) {
        ourIndex = i;
      }
      otherIndex = isUp ? ourIndex - 1 : ourIndex + 1;
      if (otherIndex < 0) {
        return;
      } else if (otherIndex > questions.length - 1) {
        return;
      }
    }

    let newQuestions = [...questions];

    // Swap
    const hold = newQuestions[otherIndex];
    newQuestions[otherIndex] = newQuestions[ourIndex];
    newQuestions[ourIndex] = hold;

    setNewQuestions(newQuestions);
  }, [questions, setNewQuestions]);

  const onDeleteClick = useCallback(async (evt, question) => {
    evt.stopPropagation();

    const shouldDelete = window.confirm(`ARE YOU SURE YOU WANT TO REMOVE THE QUESTION?`);
    if (!shouldDelete) {
      return;
    }

    let newQuestions = [...questions];
    newQuestions = newQuestions.filter(q => q.id !== question.id);

    setNewQuestions(newQuestions);
  }, [questions, setNewQuestions]);

  const onSaveClick = useCallback(async () => {
    await updateSection();
  }, [updateSection]);

  const addItemElement = useMemo(() => {
    return (
      <div className={s.addItemOuter} onClick={onAddQuestionClick} key={'AddItem'}>
        <div className={s.addItemInner}>
          <div className={s.addItemTitle}>
            {ADD_QUESTION}
          </div>
          <Icon className={s.addItemIcon} src={plusImage}/>
        </div>
      </div>
    );
  }, [onAddQuestionClick]);

  const mainContent = useMemo(() => {
    if (!section) {
      return <BasicLoading/>;
    }

    const itemElements = [];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      itemElements.push(
        <QuestionItem
          question={question}
          i={i}
          onReorder={onReorderClick}
          onDelete={onDeleteClick}
          key={question.id}
          style={{zIndex: questions.length - i}}
        />
      );
    }

    itemElements.push(addItemElement);

    return (
      <div className={s.bodyOuter}>
        <div className={s.body}>
          <div className={`${s.header} ThemeHeader`}>
            {`${section.title}`}
          </div>
          <div className={s.itemsContainer}>
            {itemElements}
          </div>
        </div>
      </div>
    );
  }, [section, questions, addItemElement, onDeleteClick, onReorderClick]);

  return (
    <>
      {mainContent}
      <div className={s.saveButtonContainer}>
        <SaveButton onSaveClick={onSaveClick}/>
      </div>
    </>
  );
}

export default withRouter(withSubscription(withModule(SurveySectionEditContent)));
