import s from './OrgsScreen.module.css';
import React, {useEffect} from "react";
import {withModule} from "react-hoc-di";
import OrgsNavBar from "./NavBar/OrgsNavBar";
import OrgsModule from "./Module/OrgsModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import OrgsContent from "./Content/OrgsContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";

const OrgsScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.main}>
      <ThemedBackground/>
      <OrgsNavBar/>
      <SubMenuFrame title={'Organizations'} titleClass={s.titleClass}>
        <OrgsContent/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(OrgsScreen, OrgsModule);
