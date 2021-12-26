import s from './SpreadsheetScreen.module.css';
import React from "react";
import {withModule} from "react-hoc-di";
import SpreadsheetNavBar from "./NavBar/SpreadsheetNavBar";
import SpreadsheetModule from "./Module/SpreadsheetModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import SpreadsheetContent from "./Content/SpreadsheetContent";

const SpreadsheetScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <SpreadsheetNavBar/>
      <SubMenuFrame>
        <SpreadsheetContent/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(SpreadsheetScreen, SpreadsheetModule);
