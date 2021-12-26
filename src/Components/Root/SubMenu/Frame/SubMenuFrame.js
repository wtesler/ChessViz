import s from './SubMenuFrame.module.css';
import HamburgerMenu from "../Hamburger/HamburgerMenu";
import {useEffect, useMemo, useState} from "react";
import SubMenuBack from "../Back/SubMenuBack";
import {withModule} from "react-hoc-di";

const SubMenuFrame = ({children, title, backRoute, titleClass=null, module}) => {

  const {user} = module;

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    setIsLoggedIn(Boolean(user));
  }, [user]);

  const titleElement = useMemo(() => {
    if (!title) {
      return null;
    }
    return (
      <div className={`${s.title}`}>
        {title}
      </div>
    )
  }, [title]);

  const backElement = useMemo(() => {
    if (!backRoute) {
      return null;
    }
    return (
      <SubMenuBack backRoute={backRoute}/>
    )
  }, [backRoute]);

  const titleOuterElement = useMemo(() => {
    if (!titleElement && ! backElement) {
      return null;
    }
    return (
      <div className={`${s.titleOuter} ${titleClass ? titleClass : ''}`}>
        {backElement}
        {titleElement}
      </div>
    )
  }, [titleElement, backElement, titleClass]);

  const content = useMemo(() => {
    if (isLoggedIn === undefined) {
      return null;
    }

    if (isLoggedIn) {
      return (
        <>
          <HamburgerMenu/>
          <div className={s.inner}>
            {titleOuterElement}
            {children}
          </div>
        </>
      );
    } else {
      return children;
    }
  }, [isLoggedIn, titleOuterElement, children])

  return (
    <div className={s.outer}>
      {content}
    </div>
  )
}

export default withModule(SubMenuFrame);
