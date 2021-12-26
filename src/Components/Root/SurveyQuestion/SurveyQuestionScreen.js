import s from './SurveyQuestionScreen.module.css';
import React, {useEffect} from "react";
import {withModule} from "react-hoc-di";
import SurveyQuestionNavBar from "./NavBar/SurveyQuestionNavBar";
import SurveyQuestionModule from "./Module/SurveyQuestionModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import Content from "./Content/SurveyQuestionScreenContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";

const SurveyQuestionScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.main}>
      <ThemedBackground/>
      <SurveyQuestionNavBar/>
      <SubMenuFrame title={'Survey'}>
        <Content/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(SurveyQuestionScreen, SurveyQuestionModule);
