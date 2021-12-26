import s from './SetSectionModal.module.css';
import {BasicInput} from "react-forms-input";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {withModule} from "react-hoc-di";

const SetSectionModal = props => {
  const {onSubmit, headerText, initialValue, module} = props;
  const {dialogRelay} = module;

  const [errorMessage, setErrorMessage] = useState(null);

  const nameRef = useRef('');

  const onTitleChange = useCallback(newValue => {
    nameRef.current = newValue;
    setErrorMessage(null);
  }, []);

  const onCancelClick = useCallback(() => {
    dialogRelay.show(null);
  }, [dialogRelay]);

  const onOkClick = useCallback(() => {
    const name = nameRef.current;
    if (!name) {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    dialogRelay.show(null);
    onSubmit(name);
  }, [dialogRelay, onSubmit]);

  const inputMapFunc = useCallback((value) => {
    return value;
  }, []);

  const errorElement = useMemo(() => {
    if (!errorMessage) {
      return null;
    }
    return (
      <div className={s.errorMessage}>
        {errorMessage}
      </div>
    )
  }, [errorMessage]);

  return (
    <div className={s.outer}>
      <div className='ThemeHeader'>
        {headerText}
      </div>
      <div className={s.inputOuter}>
        <BasicInput
          title={'name'}
          titleClass={s.inputTitle}
          initialValue={initialValue ? initialValue : ''}
          onChange={onTitleChange}
          mapFunc={inputMapFunc}
          maxChars={64}
        />
      </div>
      <div className={s.buttonRow}>
        <div className={`${s.button} ${s.buttonCancel}`} onClick={onCancelClick}>
          {`Cancel`}
        </div>
        <div className={`${s.button} ${s.buttonOk}`} onClick={onOkClick}>
          {`OK`}
        </div>
      </div>
      {errorElement}
    </div>
  );
}

export default withModule(SetSectionModal);
