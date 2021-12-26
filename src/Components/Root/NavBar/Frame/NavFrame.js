import s from './NavFrame.module.css';
import {useMemo} from "react";

const NavFrame = ({fixed, className, children}) => {

  const fixedClass = useMemo(() => {
    return fixed ? s.fixed : '';
  }, [fixed]);

  return (
    <div className={`${s.outer} ${className ? className : ''}`}>
      <div className={`${s.main} ${fixedClass}`}>
        {children}
      </div>
    </div>
  );
}

export default NavFrame;
