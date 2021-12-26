import s from './PdfFollowUp.module.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {UPLOAD_PDF} from "../../../../../../../../../Constants/i18n";
import {withModule} from "react-hoc-di";

const PdfFollowUp = ({choice, onFileChange, module}) => {
  const {toastRelay, serverClient} = module;

  const [resetInputFlag, setResetInputFlag] = useState(Number.MIN_SAFE_INTEGER);

  const inputRef = useRef();

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

    try {
      toastRelay.show('Uploading...', true);
      await serverClient.updateFile('files', file, choice.filename, 'pdf');
      toastRelay.show(null);
      onFileChange(true);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to upload pdf. Please try again.', false, 5000);
    }
  }, [resetInputFlag, toastRelay, serverClient, choice, onFileChange]);

  const onUploadClick = useCallback(() => {
    inputRef.current.click();
  }, [inputRef]);

  return (
    <div className={s.outer}>
      <div className={s.button} onClick={onUploadClick}>
        {`${UPLOAD_PDF}`}
      </div>
      <input
        ref={inputRef}
        style={{display: 'none'}}
        type='file'
        multiple={false}
        accept='.pdf'
        onChange={onInputChange}
        key={resetInputFlag}
      />
    </div>
  );
}

export default withModule(PdfFollowUp);
