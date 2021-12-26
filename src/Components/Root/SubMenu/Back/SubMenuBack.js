import s from './SubMenuBack.module.css';
import {useCallback} from "react";
import back_arrow from "../../../../Images/back_arrow.svg";
import {Icon} from "react-basic-icon";
import {withRouter} from "react-router-dom";

const SubMenuBack = ({history, backRoute}) => {

  const onClick = useCallback(() => {
    history.push(backRoute);
  }, [history, backRoute]);

  return (
    <div className={s.main} onClick={onClick}>
      <Icon className={s.icon} src={back_arrow}/>
    </div>
  );
}

export default withRouter(SubMenuBack);
