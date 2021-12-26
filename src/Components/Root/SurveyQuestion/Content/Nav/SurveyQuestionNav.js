import s from './SurveyQuestionNav.module.css';
import React, {useCallback, useMemo} from "react";
import {withModule} from "react-hoc-di";
import survey_backward_arrow from "../../../../../Images/survey_backward_arrow.svg";
import survey_down_arrow from "../../../../../Images/survey_down_arrow.svg";
import survey_forward_arrow from "../../../../../Images/survey_forward_arrow.svg";
import {Icon} from "react-basic-icon";

const SurveyQuestionNav = ({section, questionNumber, module}) => {
  const {saveRelay} = module;

  const onClick = useCallback((increment) => {
    saveRelay.next(increment);
  }, [saveRelay]);

  const createPart = useCallback((text, image, increment, hideNumber=-1) => {
    const isHidden = questionNumber === hideNumber;

    let innerContent = null;
    if (!isHidden) {
      innerContent = (
        <>
          <div className={s.partImageOuter}>
            <Icon className={s.partImage} src={image} />
          </div>
          <div className={s.partImageText}>
            {text}
          </div>
        </>
      )
    }

    const click = isHidden ? null : () => onClick(increment);

    return (
      <div className={s.part} onClick={click}>
        {innerContent}
      </div>
    )
  }, [onClick, questionNumber]);

  const nextText = useMemo(() => {
    const isLastQuestion = questionNumber === section.questions.length - 1;
    return isLastQuestion ? 'Finish Section' : 'Next Question';
  }, [section, questionNumber]);

  return (
    <div className={s.outer}>
      {createPart('Previous Question', survey_backward_arrow, -1, 0)}
      {createPart('Save and Exit', survey_down_arrow, 0)}
      {createPart(nextText, survey_forward_arrow, 1)}
    </div>
  )
}

export default withModule(SurveyQuestionNav);
