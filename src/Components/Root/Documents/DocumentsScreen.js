import s from './DocumentsScreen.module.css';
import React from "react";
import {withModule} from "react-hoc-di";
import DocumentsNavBar from "./NavBar/DocumentsNavBar";
import DocumentsModule from "./Module/DocumentsModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import DocumentsContent from "./Content/DocumentsContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import {DOCUMENTS} from "../../../Constants/i18n";

const DocumentsScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <DocumentsNavBar/>
      <SubMenuFrame title={DOCUMENTS}>
        <DocumentsContent/>
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withModule(DocumentsScreen, DocumentsModule);
