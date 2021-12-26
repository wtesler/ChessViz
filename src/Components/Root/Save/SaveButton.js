import s from './SaveButton.module.css';
import {useCallback} from "react";
import {withCms} from "react-cms-firestore";
import {SAVE} from "../../../Constants/i18n";

const SaveButton = props => {
  const {cms, onSaveClick} = props;
  const {themedButton} = cms;
  const {backgroundColor, borderRadius} = themedButton;

  const onClick = useCallback(() => {
    onSaveClick();
  }, [onSaveClick]);

  return (
    <div className={s.main} onClick={onClick} style={{
      backgroundColor: backgroundColor,
      borderRadius: borderRadius
    }}>
      {SAVE}
    </div>
  );
}

export default withCms(SaveButton, ['themedButton']);
