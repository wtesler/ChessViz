import s from './QuestionItem.module.css';
import React, {useCallback, useMemo} from 'react';
import {BasicInput} from "react-forms-input";
import QuestionChoices from "./Choices/QuestionChoices";
import SurveyItemActions from "../../SurveyItemActions/SurveyItemActions";

const QuestionItem = ({question, i, onReorder, onDelete, style}) => {
  const {prompt} = question;

  // const titleElement = useMemo(() => {
  //   return (
  //     <div className={s.titleOuter}>
  //       {id}
  //     </div>
  //   )
  // }, [id]);

  const numberElement = useMemo(() => {
    return (
      <div className={s.number}>
        {`Question ${i + 1}`}
      </div>
    )
  }, [i]);

  const onPromptChange = useCallback(value => {
    question.prompt = value;
  }, [question]);

  return (
    <div className={s.outer} style={style ? style: {}}>
      <div className={s.inner}>
        <div className={s.topBar}>
          {numberElement}
          <SurveyItemActions item={question} onReorder={onReorder} onDelete={onDelete} />
        </div>
        <div className={s.contentOuter}>
          <BasicInput
            title={'Question'}
            titleClass={s.inputTitle}
            textClass={s.inputText}
            initialValue={prompt ? prompt: ''}
            onChange={onPromptChange}
            maxChars={8192}
            isMultiline={true}
            minHeight={80}
            placeholder={'Write in the question here'}
          />
          <QuestionChoices question={question}/>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
