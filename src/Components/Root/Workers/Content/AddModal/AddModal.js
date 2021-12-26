import s from './AddModal.module.css';
import {BasicInput} from "react-forms-input";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {withModule} from "react-hoc-di";

const AddModal = props => {
  const {onSubmit, module} = props;
  const {dialogRelay} = module;

  const [errorMessage, setErrorMessage] = useState(null);

  const emailRef = useRef('');

  const onTitleChange = useCallback(newValue => {
    emailRef.current = newValue;
    setErrorMessage(null);
  }, []);

  const onCancelClick = useCallback(() => {
    dialogRelay.show(null);
  }, [dialogRelay]);

  const onOkClick = useCallback(() => {
    const email = emailRef.current;
    if (!email) {
      setErrorMessage('Email cannot be empty.');
      return;
    }

    dialogRelay.show(null);
    onSubmit(email);
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
      <div className={s.inputOuter}>
        <BasicInput
          title={'email'}
          titleClass={s.inputTitle}
          initialValue={''}
          onChange={onTitleChange}
          mapFunc={inputMapFunc}
          maxChars={128}
          placeholder={'Enter email address'}
        />
      </div>
      <div className={s.buttonRow}>
        <div className={`${s.button} ${s.buttonCancel}`} onClick={onCancelClick}>
          {`Cancel`}
        </div>
        <div className={`${s.button} ${s.buttonOk}`} onClick={onOkClick}>
          {`Submit`}
        </div>
      </div>
      {errorElement}
    </div>
  );
}

export default withModule(AddModal);
