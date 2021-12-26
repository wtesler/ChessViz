import s from './WorkersScreen.module.css';
import React, {useEffect} from "react";
import {withModule} from "react-hoc-di";
import WorkersNavBar from "./NavBar/WorkersNavBar";
import WorkersModule from "./Module/WorkersModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import Content from "./Content/WorkersScreenContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";

const WorkersScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.main}>
      <ThemedBackground/>
      <WorkersNavBar/>
      <SubMenuFrame title={'Workers'}>
        <Content/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(WorkersScreen, WorkersModule);
