import s from './SurveyQuestionChoice.module.css';
import React, {useCallback, useMemo} from "react";
import {BasicInput} from "react-forms-input";
import FollowUpTypes from "../../../../../../../Choice/FollowUpTypes";
import SpreadsheetFollowUp from "./Spreadsheet/FollowUp/SpreadsheetFollowUp";
import FileExists from "./File/Exists/FileExists";
import spreadsheetImage from "../../../../../../../Images/spreadsheet.svg";
import pdfImage from "../../../../../../../Images/pdf.svg";
import PdfFollowUp from "./Pdf/FollowUp/PdfFollowUp";
import MultipleSelectFollowUp from "./Multiple/MultipleSelectFollowUp";

const SurveyQuestionChoice = props => {
  const {choice, questionProgress, letter, selected, onClick,
    onBriefResponseChange, onLongResponseChange, onFileChange, onMultipleSelectChange} = props;

  const bubbleSelected = selected ? s.bubbleSelected : '';

  const createTextResponseElement = useCallback((field, onChange, maxChars, minHeight) => {
    let initialValue = '';
    if (questionProgress && questionProgress[field]) {
      initialValue = questionProgress[field];
    }
    return (
      <div className={s.followUpInputOuter}>
        <BasicInput
          className={s.followUpInput}
          textClass={s.followUpInputText}
          titleClass={''}
          initialValue={initialValue}
          onChange={onChange}
          maxChars={maxChars}
          isMultiline={true}
          minHeight={minHeight}
        />
      </div>
    );
  }, [questionProgress]);

  const briefResponseElement = useMemo(() => {
    return createTextResponseElement('briefResponse', onBriefResponseChange, 1024, 40);
  }, [createTextResponseElement, onBriefResponseChange]);

  const longResponseElement = useMemo(() => {
    return createTextResponseElement('longResponse', onLongResponseChange, 8192, 150);
  }, [createTextResponseElement, onLongResponseChange]);

  const spreadsheetElement = useMemo(() => {
    if (questionProgress && questionProgress.hasFile) {
      return <FileExists choice={choice} onFileChange={onFileChange} suffix={'xlsx'} image={spreadsheetImage}/>;
    } else {
      return <SpreadsheetFollowUp choice={choice} onFileChange={onFileChange}/>;
    }
  }, [choice, questionProgress, onFileChange]);

  const pdfElement = useMemo(() => {
    if (questionProgress && questionProgress.hasFile) {
      return <FileExists choice={choice} onFileChange={onFileChange} suffix={'pdf'} image={pdfImage}/>;
    } else {
      return <PdfFollowUp choice={choice} onFileChange={onFileChange}/>;
    }
  }, [choice, questionProgress, onFileChange]);

  const multipleSelectElement = useMemo(() => {
    return <MultipleSelectFollowUp choice={choice} questionProgress={questionProgress} onMultipleSelectChange={onMultipleSelectChange}/>;
  }, [choice, questionProgress, onMultipleSelectChange]);

  const followUpElement = useMemo(() => {
    if (!selected) {
      return null;
    }

    const followUpPrompt = choice.followUpPrompt;
    let inputElement;

    const followUpType = choice.followUpType;
    switch (followUpType) {
      case FollowUpTypes.NONE:
        return null;
      case FollowUpTypes.BRIEF_RESPONSE:
        inputElement = briefResponseElement;
        break;
      case FollowUpTypes.LONG_RESPONSE:
        inputElement = longResponseElement;
        break;
      case FollowUpTypes.UPLOAD_PDF:
        inputElement = pdfElement;
        break;
      case FollowUpTypes.UPLOAD_SPREADSHEET:
        inputElement = spreadsheetElement;
        break;
      case FollowUpTypes.MULTIPLE_CHOICE:
        inputElement = multipleSelectElement;
        break;
      default:
        return null;
    }

    return (
      <div className={s.followUpOuter}>
        <div className={s.followUpPrompt}>
          {followUpPrompt}
        </div>
        {inputElement}
      </div>
    )

  }, [selected, choice, briefResponseElement, longResponseElement, spreadsheetElement,  pdfElement, multipleSelectElement]);

  return (
    <div className={s.outer}>
      <span className={s.inner} onClick={() => onClick(choice)}>
        <span className={`${s.bubble} ${bubbleSelected}`}/>
        <span className={s.text}>
          {`${letter} - ${choice.text}`}
        </span>
      </span>
      {followUpElement}
    </div>
  )
}

export default SurveyQuestionChoice;
