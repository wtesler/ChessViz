import s from './SurveySectionEditScreen.module.css';
import React from "react";
import {withModule} from "react-hoc-di";
import SurveySectionEditNavBar from "./NavBar/SurveySectionEditNavBar";
import SurveySectionEditModule from "./Module/SurveySectionEditModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import SurveySectionEditContent from "./Content/SurveySectionEditContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import {ROUTE_SURVEY_EDIT} from "../../../Constants/routes";

const SurveySectionEditScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <SurveySectionEditNavBar/>
      <SubMenuFrame title={'Edit Section'} backRoute={ROUTE_SURVEY_EDIT}>
        <SurveySectionEditContent/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(SurveySectionEditScreen, SurveySectionEditModule);
