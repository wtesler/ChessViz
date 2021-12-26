import s from './QuestionChoices.module.css';
import React, {useCallback, useMemo, useState} from 'react';
import {ADD_ANSWER, ANSWERS} from "../../../../../Constants/i18n";
import {Icon} from "react-basic-icon";
import plusImage from "../../../../../Images/plus.svg";
import Choice from "./Choice/Choice";
import createChoiceModel from "../../../../../Choice/createChoiceModel";

const QuestionChoices = ({question}) => {
  const [updateFlag, setUpdateFlag] = useState(Number.MIN_SAFE_INTEGER);

  const onAddChoiceClick = useCallback(() => {
    const newChoices = [...question.choices];

    const newChoice = createChoiceModel();

    newChoices.push(newChoice);

    question.choices = newChoices;

    setUpdateFlag(updateFlag + 1);
  }, [question, updateFlag]);

  const onReorderClick = useCallback(async (evt, isUp, chosenChoice) => {
    evt.stopPropagation();

    let ourIndex;
    let otherIndex;
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      if (choice.id === chosenChoice.id) {
        ourIndex = i;
      }
      otherIndex = isUp ? ourIndex - 1 : ourIndex + 1;
      if (otherIndex < 0) {
        return;
      } else if (otherIndex > question.choices.length - 1) {
        return;
      }
    }

    let newChoices = [...question.choices];

    // Swap
    const hold = newChoices[otherIndex];
    newChoices[otherIndex] = newChoices[ourIndex];
    newChoices[ourIndex] = hold;

    question.choices = newChoices;

    setUpdateFlag(updateFlag + 1);
  }, [question, updateFlag]);

  const onDeleteClick = useCallback(async (evt, choice) => {
    evt.stopPropagation();

    const shouldDelete = window.confirm(`ARE YOU SURE YOU WANT TO REMOVE THE CHOICE?`);
    if (!shouldDelete) {
      return;
    }

    let newChoices = [...question.choices];
    newChoices = newChoices.filter(c => c.id !== choice.id);

    question.choices = newChoices;

    setUpdateFlag(updateFlag + 1);
  }, [question, updateFlag]);

  const choiceElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      elements.push(
        <Choice choice={choice} key={choice.id} i={i} onReorder={onReorderClick} onDelete={onDeleteClick}/>
      );
    }
    return elements;
  }, [question, onReorderClick, onDeleteClick]);

  const addItemElement = useMemo(() => {
    return (
      <div className={s.addChoiceOuter} onClick={onAddChoiceClick} key={'AddChoice'}>
        <div className={s.addChoiceInner}>
          <div className={s.addChoiceTitle}>
            {ADD_ANSWER}
          </div>
          <Icon className={s.addChoiceIcon} src={plusImage}/>
        </div>
      </div>
    );
  }, [onAddChoiceClick]);

  return (
    <div className={s.outer}>
      <div className={s.title}>
        {ANSWERS}
      </div>
      {choiceElements}
      {addItemElement}
    </div>
  );
}

export default QuestionChoices;
