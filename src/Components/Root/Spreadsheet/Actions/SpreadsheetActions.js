import s from './SpreadsheetActions.module.css';
import React, {useCallback, useRef, useState} from 'react';
import {withModule} from "react-hoc-di";
import SpreadsheetActionPrompt from "./Prompt/SpreadsheetActionPrompt";
import {UPLOAD_SPREADSHEET} from "../../../../Constants/i18n";
import SpreadsheetParser from "./Parser/SpreadsheetParser";
// import {Icon} from "react-basic-icon";

const SpreadsheetActions = ({config, module, onNewItems}) => {
  const {dialogRelay} = module;

  const [resetInputFlag, setResetInputFlag] = useState(Number.MIN_SAFE_INTEGER);

  const inputRef = useRef();
  const parserRef = useRef(new SpreadsheetParser());

  const onInputChange = useCallback(async(event) => {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];

    const items = await parserRef.current.parse(file);

    onNewItems(items);

    setResetInputFlag(resetInputFlag + 1);
  }, [resetInputFlag, onNewItems]);

  const onAddClick = useCallback(() => {

  }, []);

  const onUploadClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const onUploadPrompt = useCallback(() => {
    dialogRelay.show(
      <SpreadsheetActionPrompt config={config} onUploadClick={onUploadClick}/>,
      true,
      null
    );
  }, [dialogRelay, config, onUploadClick]);

  return (
    <div className={s.outer}>
      <div className={s.inner}>
        <div className={s.addContainer}>
          <div
            className={`${s.button} ${s.addButton}`}
            onClick={onAddClick}
          >{"Add a Row"}</div>
        </div>
        <div className={s.uploadContainer}>
          <div
            className={`${s.button} ${s.uploadButton}`}
            onClick={onUploadPrompt}
          >{UPLOAD_SPREADSHEET}</div>
        </div>
      </div>
      <input
        ref={inputRef}
        style={{display: 'none'}}
        type='file'
        multiple={false}
        accept='.xlsx'
        onChange={onInputChange}
        key={resetInputFlag}
      />
    </div>
  );
}

export default withModule(SpreadsheetActions);
