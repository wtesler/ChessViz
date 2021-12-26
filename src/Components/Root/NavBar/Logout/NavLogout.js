import s from './NavLogout.module.css';
import {useCallback} from 'react';
import {withModule} from 'react-hoc-di';
import {withCms} from 'react-cms-firestore';
import {LOGOUT} from "../../../../Constants/i18n";

const NavLogout = props => {
  const {module, cms} = props;
  const {loginManager} = module;
  const {themedButton} = cms;
  const {backgroundColor, borderRadius} = themedButton;

  const onClick = useCallback(() => {
    loginManager.logout();
  }, [loginManager]);

  return (
    <div className={s.main} onClick={onClick} style={{
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
    }}>
      {LOGOUT}
    </div>
  );
}

export default withCms(withModule(NavLogout), ['themedButton']);
