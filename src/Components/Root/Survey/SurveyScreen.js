import s from './SurveyScreen.module.css';
import React, {useEffect} from "react";
import {withModule} from "react-hoc-di";
import SurveyNavBar from "./NavBar/SurveyNavBar";
import SurveyModule from "./Module/SurveyModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import Content from "./Content/SurveyScreenContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";

const SurveyScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.main}>
      <ThemedBackground/>
      <SurveyNavBar/>
      <SubMenuFrame title={'Survey'}>
        <Content/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(SurveyScreen, SurveyModule);
