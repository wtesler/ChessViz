import s from './HamburgerMenu.module.css';
import {useCallback, useEffect, useMemo, useRef} from "react";
import {DASHBOARD, DIRECTORY, PROFILE, SURVEY} from "../../../../Constants/i18n";
import {
  ROUTE_CMS,
  ROUTE_DASHBOARD,
  ROUTE_ORGS,
  ROUTE_PROFILE,
  ROUTE_ROLES,
  ROUTE_SURVEY,
  ROUTE_SURVEY_EDIT,
  ROUTE_WORKERS,
} from "../../../../Constants/routes";
import {Link, withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";
import {Icon} from "react-basic-icon";
import closeImage from "../../../../Images/close.svg";
import NavTitle from "../../NavBar/Title/NavTitle";
import HamburgerMenuModule from "./Module/HamburgerMenuModule";

const HamburgerMenu = props => {
  const {module, subscription, location} = props;
  const {hamburgerMenuSubject, loginManager} = module;

  const outerRef = useRef();

  // This value is used in CSS as well as in NavHamburger. So change everywhere.
  const COLLAPSE_WIDTH_PX = useMemo(() => {
    return 1000;
  }, []);

  const items = useMemo(() => {
    const list = [
      [DASHBOARD, ROUTE_DASHBOARD],
      [PROFILE, ROUTE_PROFILE],
      [SURVEY, ROUTE_SURVEY],
      [DIRECTORY, ROUTE_ORGS],
    ];

    const claims = loginManager ? loginManager.claims : null;

    const isAdmin = claims ? claims['admin'] : false;
    const isSurveyEditor = claims ? claims['surveyEditor'] : false;
    const isCmsEditor = claims ? claims['editor'] : false;
    // const isLiason = claims ? claims['liason'] : false;

    if (isAdmin || isSurveyEditor) {
      list.push(['Edit Survey', ROUTE_SURVEY_EDIT]);
    }

    if (isAdmin || isCmsEditor) {
      list.push(['CMS', ROUTE_CMS]);
    }

    if (isAdmin) {
      list.push(['Roles', ROUTE_ROLES]);
    }

    if (isAdmin) {
      list.push(['Workers', ROUTE_WORKERS]);
    }

    return list;
  }, [loginManager]);

  const isCollapsed = useCallback(() => {
    return window.matchMedia(`(max-width: ${COLLAPSE_WIDTH_PX}px)`).matches;
  }, [COLLAPSE_WIDTH_PX]);

  const toggleMenu = useCallback((shouldClose = null) => {
    const outerEl = outerRef.current;
    const outerStyle = outerEl.style;
    const width = outerEl.offsetWidth;

    const openTransform = `translateX(0px)`;
    const closedTransform = `translateX(-${width + 5}px)`;

    if (shouldClose === null) {
      shouldClose = outerStyle.transform === openTransform;
    }

    if (shouldClose) {
      outerStyle.transform = closedTransform;
    } else {
      outerStyle.transform = openTransform;
      outerEl.focus({
        preventScroll: true
      });
    }
  }, []);

  useEffect(() => {
    subscription.add(hamburgerMenuSubject.subscribe(() => {
      toggleMenu();
    }));
  }, [hamburgerMenuSubject, subscription, toggleMenu]);

  const onResize = useCallback(() => {
    toggleMenu(isCollapsed());
  }, [isCollapsed, toggleMenu]);

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", onResize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", onResize);
      }
    }
  });

  const onItemClick = useCallback(evt => {
    evt.stopPropagation();
    window.scrollTo(0, 0);
  }, []);

  const itemElements = useMemo(() => {
    const elements = [];
    for (const item of items) {
      const title = item[0];
      const route = item[1];
      const selectedClass = location.pathname === route ? s.selected : '';
      const element = (
        <div className={`${s.itemOuter} ${selectedClass} ThemeHeader`} key={`${title}-${route}`}>
          <Link to={route} onClick={onItemClick}>{title}</Link>
        </div>
      );
      elements.push(element);
    }
    return elements;
  }, [items, location, onItemClick]);

  const onBlur = useCallback(evt => {
    const didClickItem = outerRef.current.contains(evt.relatedTarget); // Convoluted way to intercept clicks.
    if (didClickItem) {
      return;
    }

    if (isCollapsed()) {
      toggleMenu(true);
    }
  }, [toggleMenu, isCollapsed]);

  const onCloseClick = useCallback(() => {
    toggleMenu(true);
  }, [toggleMenu]);

  const headerElement = useMemo(() => {
    return (
      <div className={s.headerOuter}>
        <Icon className={s.headerImage} src={closeImage} onClick={onCloseClick}/>
        <NavTitle dark/>
      </div>
    );
  }, [onCloseClick]);

  return (
    <div className={s.outer}
         ref={outerRef}
         onBlur={onBlur}
         tabIndex={'1'}
    >
      {headerElement}
      {itemElements}
    </div>
  )
}

export default withRouter(withSubscription(withModule(HamburgerMenu, HamburgerMenuModule)));
