import s from './SurveyEditScreen.module.css';
import React from "react";
import {withModule} from "react-hoc-di";
import SurveyEditNavBar from "./NavBar/SurveyEditNavBar";
import SurveyEditModule from "./Module/SurveyEditModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import SurveyEditContent from "./Content/SurveyEditContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";

const SurveyEditScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <SurveyEditNavBar/>
      <SubMenuFrame title={'Edit Survey'}>
        <SurveyEditContent/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(SurveyEditScreen, SurveyEditModule);
