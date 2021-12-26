import s from './MultipleSelectFollowUp.module.css';
import React, {useCallback, useMemo, useState} from 'react';
import {BasicInput} from "react-forms-input";

const OTHER_SELECTION = '__other__';

/**
 * Has multiple selections as well as an 'other' section which takes text input.
 */
const MultipleSelectFollowUp = ({choice, questionProgress, onMultipleSelectChange}) => {
  const selectionsProgress = questionProgress.selections ? questionProgress.selections.selections : [];
  const otherProgress = questionProgress.selections ? questionProgress.selections.other : '';

  const [selections, setSelections] = useState(selectionsProgress);
  const [selectionOther, setSelectionOther] = useState(otherProgress);

  const onToggleSelect = useCallback((selection) => {
    let newSelections = [...selections];
    if (newSelections.includes(selection)) {
      newSelections = newSelections.filter(x => x !== selection);
    } else {
      newSelections.push(selection);
    }
    setSelections(newSelections);
    onMultipleSelectChange(newSelections, selectionOther);
  }, [onMultipleSelectChange, selections, selectionOther]);

  const onOtherChange = useCallback(async (value) => {
    setSelectionOther(value);
    onMultipleSelectChange(selections, value);
    if (value && !selections.includes(OTHER_SELECTION)) {
      onToggleSelect(OTHER_SELECTION);
    }
  }, [onMultipleSelectChange, selections, onToggleSelect]);

  const selectionElements = useMemo(() => {
    const choiceSelections = choice.selections;
    const elements = [];
    for (const selection of choiceSelections) {
      const selectedClass = selections.includes(selection) ? s.bubbleSelected : '';
      elements.push(
        <div className={s.selectionOuter} key={selection} onClick={() => onToggleSelect(selection)}>
          <div className={`${s.bubble} ${selectedClass}`}/>
          {selection}
        </div>
      );
    }

    // Other Selection requires text input.
    const selectedClass = selections.includes(OTHER_SELECTION) ? s.bubbleSelected : '';
    elements.push(
      <div className={s.selectionOuter} key={OTHER_SELECTION}>
        <div className={`${s.bubble} ${selectedClass}`} onClick={() => onToggleSelect(OTHER_SELECTION)}/>
        <div className={s.otherInputOuter}>
          <BasicInput
            className={s.otherInput}
            textClass={s.otherInputText}
            titleClass={''}
            initialValue={selectionOther}
            onChange={onOtherChange}
            maxChars={1024}
            isMultiline={false}
            minHeight={30}
            placeholder={'Other (Describe)'}
          />
        </div>
      </div>
    );
    return elements;
  }, [choice, onOtherChange, selections, selectionOther, onToggleSelect]);

  return (
    <div className={s.outer}>
      {selectionElements}
    </div>
  );
}

export default MultipleSelectFollowUp;
