import s from './SpreadsheetFollowUp.module.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {UPLOAD_SPREADSHEET} from "../../../../../../../../../Constants/i18n";
import SpreadsheetParser from "../../../../../../../Spreadsheet/Actions/Parser/SpreadsheetParser";
import {withModule} from "react-hoc-di";

const SpreadsheetFollowUp = ({choice, onFileChange, module}) => {
  const {toastRelay, serverClient} = module;

  const [resetInputFlag, setResetInputFlag] = useState(Number.MIN_SAFE_INTEGER);

  const inputRef = useRef();
  const parserRef = useRef(new SpreadsheetParser());

  useEffect(() => {
    return () => {
      toastRelay.show(null);
    }
  }, [toastRelay]);

  const onInputChange = useCallback(async(event) => {
    setResetInputFlag(resetInputFlag + 1);

    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];

    if (file.size > 20000000) { // 20 MB
      toastRelay.show('File too large!', false, 5000);
      return;
    }

    const items = await parserRef.current.parse(file);
    const firstItem = items[0];
    const keys = Object.keys(firstItem).map(k => k.toUpperCase().trim());

    const columns = choice.columns;
    const normalizedColumns = columns.map(c => c.toUpperCase().replace('*', '').trim());

    let isProperFormat = true;
    if (keys.length !== normalizedColumns.length) {
      isProperFormat = false;
    } else {
      for (let i = 0; i < normalizedColumns.length; i++) {
        const column = normalizedColumns[i];
        const key = keys[i];
        if (column !== key) {
          isProperFormat = false;
          break;
        }
      }
    }

    if (isProperFormat) {
      try {
        toastRelay.show('Uploading...', true);
        await serverClient.updateFile('files', file, choice.filename, 'xlsx');
        toastRelay.show(null);
        onFileChange(true);
      } catch (e) {
        console.error(e);
        toastRelay.show(null);
        toastRelay.show('Failed to upload spreadsheet. Please try again.', false, 5000);
      }
    } else {
      toastRelay.show(
        `Spreadsheet has improper first row. Expected first row to look like: ${columns}`,
        false,
        7000);
    }
  }, [resetInputFlag, toastRelay, serverClient, choice, onFileChange]);

  const configRow = useMemo(() => {
    const columns = choice.columns;
    const elements = [];
    for (let i = 0; i < columns.length; i++) {
      const part = columns[i];
      elements.push(
        <div className={s.part} key={i}>
          {part}
        </div>
      )
    }
    return (
      <div className={s.configRow}>
        {elements}
      </div>
    )
  }, [choice]);

  const onUploadClick = useCallback(() => {
    inputRef.current.click();
  }, [inputRef]);

  return (
    <div className={s.outer}>
      <div className={s.title}>
        {`Upload Spreadsheet`}
      </div>
      <div className={s.prompt}>
        <div>
          {`Upload a spreadsheet (.xlsx) where the first row has the values:`}
        </div>
        {configRow}
        <div>
          {`and each column corresponds to those values.`}
        </div>
      </div>
      <div className={s.button} onClick={onUploadClick}>
        {`${UPLOAD_SPREADSHEET}`}
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

export default withModule(SpreadsheetFollowUp);
