import s from './HonestyModal.module.css';
import React, {useCallback} from "react";
import {withModule} from "react-hoc-di";
import {withCms} from "react-cms-firestore";

const HonestyModal = props => {
  const {module, cms, onContinue} = props;
  const {dialogRelay} = module;
  const {honesty} = cms;
  const {text} = honesty;

  const onContinueClick = useCallback(() => {
    dialogRelay.show(null);
    onContinue();
  }, [dialogRelay, onContinue]);

  return (
    <div className={s.outer}>
      <div className={s.textOuter}>
        {text}
      </div>
      <div className={s.buttonRow}>
        <div className={`${s.button} ${s.buttonOk}`} onClick={onContinueClick}>
          {`Continue`}
        </div>
      </div>
    </div>
  );
}

export default withCms(withModule(HonestyModal), 'honesty');
