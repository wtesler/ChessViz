import s from './SpreadsheetActionPrompt.module.css';
import React, {useMemo} from 'react';
import {UPLOAD_SPREADSHEET} from "../../../../../Constants/i18n";

const SpreadsheetActionPrompt = ({config, onUploadClick}) => {

  const configRow = useMemo(() => {
    const elements = [];
    for (let i = 0; i < config.length; i++) {
      const part = config[i];
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
  }, [config]);

  return (
    <div className={s.outer}>
      <div className={s.title}>
        {`Upload Spreadsheet`}
      </div>
      <div className={s.prompt}>
        <div>
          {`Upload a spreadsheet where the first row has the values:`}
        </div>
        {configRow}
        <div>
          {`and each column corresponds to those values.`}
        </div>
      </div>
      <div className={s.button} onClick={onUploadClick}>
        {UPLOAD_SPREADSHEET}
      </div>
    </div>
  );
}

export default SpreadsheetActionPrompt;
