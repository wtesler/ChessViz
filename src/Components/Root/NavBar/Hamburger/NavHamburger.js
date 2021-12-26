import s from './NavHamburger.module.css';
import {useCallback, useMemo} from "react";
import {withModule} from "react-hoc-di";
import hamburgerImage from "../../../../Images/hamburger.svg";
import {Icon} from "react-basic-icon";

const NavHamburger = props => {
  const {module} = props;
  const {hamburgerMenuSubject, user} = module;

  const onClick = useCallback(() => {
    hamburgerMenuSubject.next(true);
  }, [hamburgerMenuSubject]);

  const content = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <div className={s.main} onClick={onClick}>
        <Icon className={s.icon} src={hamburgerImage}/>
      </div>
    );
  }, [user, onClick])

  return content;
}

export default withModule(NavHamburger);
