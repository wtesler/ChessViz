import s from './SurveyQuestionBody.module.css';
import React, {useMemo} from "react";
import SurveyQuestionChoices from "./Choices/SurveyQuestionChoices";
import SurveyQuestionEvaluator from "./Evaluator/SurveyQuestionEvaluator";
import {withModule} from "react-hoc-di";

const SurveyQuestionBody = ({section, question, questionNumber, questionProgress, module}) => {
  const {userSurveyManager} = module;

  const evaluatorElement = useMemo(() => {
    if (!userSurveyManager.isEvaluation()) {
      return null;
    }
    return (
      <SurveyQuestionEvaluator
        questionProgress={questionProgress}
        sectionId={section.id}
        questionId={question.id}
      />
    );
  }, [userSurveyManager, questionProgress, section, question]);

  return (
    <div className={s.outer}>
      <div className={s.promptOuter}>
        <div className={s.promptTitle}>
          {`Question ${questionNumber + 1}`}
        </div>
        <div className={s.promptDivider}/>
        <div className={s.promptText}>
          {question.prompt}
        </div>
      </div>
      <div className={s.choicesContainer}>
        <SurveyQuestionChoices
          question={question}
          questionProgress={questionProgress}
          sectionId={section.id}
          questionId={question.id}
        />
      </div>
      {evaluatorElement}
    </div>
  )
}

export default withModule(SurveyQuestionBody);
