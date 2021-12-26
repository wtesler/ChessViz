import s from './NavBack.module.css';
import {useCallback} from "react";
import back_arrow from "../../../../Images/back_arrow.svg";
import {Icon} from "react-basic-icon";
import {withRouter} from "react-router-dom";

const NavBack = props => {
  const {history} = props;

  const onClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className={s.main} onClick={onClick}>
      <Icon className={s.icon} src={back_arrow}/>
    </div>
  );
}

export default withRouter(NavBack);
