import s from './NavSave.module.css';
import {useCallback} from "react";
import {withModule} from "react-hoc-di";
import {withCms} from "react-cms-firestore";
import {SAVE} from "../../../../Constants/i18n";

const NavSave = props => {
  const {module, cms} = props;
  const {saveClickSubject} = module;
  const {themedButton} = cms;
  const {backgroundColor} = themedButton;

  const onClick = useCallback(() => {
    saveClickSubject.next(true);
  }, [saveClickSubject]);

  return (
    <div className={s.main} onClick={onClick} style={{backgroundColor}}>
      {SAVE}
    </div>
  );
}

export default withCms(withModule(NavSave), ['themedButton']);
