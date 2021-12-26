import s from './NavTitle.module.css';
import LogoTitle from "../../Logo/Title/LogoTitle";
// import {useCallback} from "react";

const NavTitle = props => {
  // const onClick = useCallback(() => {
  //   window.location.href = 'https://www.mivie.com';
  // }, []);

  return (
    <div className={s.main}>
      <a href={'https://www.mivie.com'}>
      <LogoTitle dark={props.dark}/>
      </a>
    </div>
  );
}

export default NavTitle;
