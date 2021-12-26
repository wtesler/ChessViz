import s from './Choice.module.css';
import React, {useCallback, useMemo, useState} from 'react';
import {BasicInput, InputDropdown} from "react-forms-input";
import FollowUpTypes from "../../../../../../Choice/FollowUpTypes";
import SurveyItemActions from "../../../../SurveyItemActions/SurveyItemActions";

const Choice = ({choice, i, onReorder, onDelete}) => {
  const {text, followUpType, followUpPrompt, filename, columns, selections, points} = choice;

  const [followUpTypeState, setFollowUpTypeState] = useState(followUpType);

  const followUps = useMemo(() => {
    return FollowUpTypes.getAllTypes();
  }, []);

  const columnsString = useMemo(() => {
    return columns.join(',');
  }, [columns]);

  const multipleSelectString = useMemo(() => {
    return selections.join(',');
  }, [selections]);

  const onTextChange = useCallback(value => {
    value = value.trim();
    choice.text = value;
  }, [choice]);

  const onPointsChange = useCallback(value => {
    choice.points = Number.parseInt(value);
  }, [choice]);

  const onFollowUpTypeChange = useCallback(value => {
    choice.followUpType = value;
    setFollowUpTypeState(value);
  }, [choice]);

  const onFollowUpPromptChange = useCallback(value => {
    value = value.trim();
    choice.followUpPrompt = value;
  }, [choice]);

  const onFilenameChange = useCallback(value => {
    value = value.trim();
    choice.filename = value;
  }, [choice]);

  const onColumnsChange = useCallback(value => {
    value = value.trim();
    const split = value.split(',');
    const columns = split.map(x => x.trim()).filter(x => Boolean(x));
    choice.columns = columns;
  }, [choice]);

  const  onMultipleSelectChange = useCallback(value => {
    value = value.trim();
    const split = value.split(',');
    const selections = split.map(x => x.trim()).filter(x => Boolean(x));
    choice.selections = selections;
  }, [choice]);

  const followUpPromptElement = useMemo(() => {
    if (followUpTypeState === FollowUpTypes.NONE) {
      return null;
    }

    return (
      <BasicInput
        title={'Follow Up Prompt'}
        className={s.inputOuter}
        titleClass={s.inputTitle}
        textClass={s.inputText}
        initialValue={followUpPrompt ? followUpPrompt: ''}
        onChange={onFollowUpPromptChange}
        maxChars={2048}
        isMultiline={true}
        minHeight={40}
        placeholder={'Write a prompt here with instructions on how to follow-up'}
      />
    );
  }, [followUpPrompt, followUpTypeState, onFollowUpPromptChange]);

  const fileNameElement = useMemo(() => {
    if (followUpTypeState !== FollowUpTypes.UPLOAD_SPREADSHEET
      && followUpTypeState !== FollowUpTypes.UPLOAD_PDF) {
      return null;
    }

    return (
      <BasicInput
        title={'Filename'}
        className={s.inputOuter}
        titleClass={s.inputTitle}
        textClass={s.inputText}
        initialValue={filename ? filename: ''}
        onChange={onFilenameChange}
        maxChars={128}
        isMultiline={false}
        placeholder={'Write the name of the uploaded file. Do not include suffix (.xlsx, .pdf, etc...)'}
      />
    );
  }, [filename, followUpTypeState, onFilenameChange]);

  const spreadsheetColumnsElement = useMemo(() => {
    if (followUpTypeState !== FollowUpTypes.UPLOAD_SPREADSHEET) {
      return null;
    }

    return (
      <BasicInput
        title={'Spreadsheet Columns'}
        className={s.inputOuter}
        titleClass={s.inputTitle}
        textClass={s.inputText}
        initialValue={columnsString ? columnsString: ''}
        onChange={onColumnsChange}
        maxChars={512}
        isMultiline={false}
        placeholder={'Write a comma-separated list of spreadsheet columns such as "name*, title, salary"'}
      />
    );
  }, [columnsString, followUpTypeState, onColumnsChange]);

  const multipleSelectElement = useMemo(() => {
    if (followUpTypeState !== FollowUpTypes.MULTIPLE_CHOICE) {
      return null;
    }

    return (
      <BasicInput
        title={'Multiple Choices'}
        className={s.inputOuter}
        titleClass={s.inputTitle}
        textClass={s.inputText}
        initialValue={multipleSelectString ? multipleSelectString: ''}
        onChange={onMultipleSelectChange}
        maxChars={2048}
        isMultiline={false}
        placeholder={'Write a comma-separated list of multiple choices'}
      />
    );
  }, [multipleSelectString, followUpTypeState, onMultipleSelectChange]);


  return (
    <div className={s.outer}>
      <div className={s.header}>
        <div className={s.headerText}>
          {`Answer ${i + 1}`}
        </div>
        <SurveyItemActions item={choice} onReorder={onReorder} onDelete={onDelete} />
      </div>
      <BasicInput
        className={s.inputOuter}
        titleClass={`${s.inputTitle} ${s.inputMainTitle}`}
        textClass={s.inputText}
        initialValue={text ? text: ''}
        onChange={onTextChange}
        maxChars={2048}
        isMultiline={true}
        minHeight={40}
        placeholder={'Write in an answer here'}
      />
      <BasicInput
        title={'Points'}
        className={s.inputOuter}
        titleClass={`${s.inputTitle}`}
        textClass={s.inputText}
        initialValue={points !== null && points !== undefined ? points: 1}
        onChange={onPointsChange}
        maxChars={16}
        minHeight={40}
        type={'number'}
      />
      <InputDropdown
        title={'Follow Up Type'}
        className={s.inputDropdownOuter}
        contentClass={s.inputDropdownContent}
        optionsClass={s.inputDropdownOptions}
        optionClass={s.inputDropdownOption}
        titleClass={s.inputTitle}
        initialValue={followUpType ? followUpType : followUps[0]}
        onChange={onFollowUpTypeChange}
        maxChars={64}
        options={followUps}
      />
      {followUpPromptElement}
      {fileNameElement}
      {spreadsheetColumnsElement}
      {multipleSelectElement}
      <div className={s.divider} />
    </div>
  );
}

export default Choice;
