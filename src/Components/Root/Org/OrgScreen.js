import s from './OrgScreen.module.css';
import React, {useEffect, useMemo, useState} from "react";
import {withModule} from "react-hoc-di";
import OrgNavBar from "./NavBar/OrgNavBar";
import OrgModule from "./Module/OrgModule";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import OrgContent from "./Content/OrgContent";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import {withRouter} from "react-router-dom";
import {URLHelper} from "../../../URL/URLHelper";
import {ROUTE_ORGS} from "../../../Constants/routes";

const OrgScreen = ({module, location, history}) => {
  const {orgProfileManager, orgPlanManager} = module;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!URLHelper.hasId(location)) {
      history.replace(ROUTE_ORGS);
    } else {
      const uid = URLHelper.getPathEnd(location);
      orgProfileManager.setUidOverride(uid);
      orgPlanManager.setUidOverride(uid);
      setReady(true);
    }

    // eslint-disable-next-line
  }, [orgProfileManager, orgPlanManager]);

  const content = useMemo(() => {
    if (!ready) {
      return null;
    }

    return (
      <div className={s.main}>
        <ThemedBackground/>
        <OrgNavBar/>
        <SubMenuFrame>
          <OrgContent/>
        </SubMenuFrame>
        <Footer/>
      </div>
    );
  }, [ready]);

  return content;
}

export default withRouter(withModule(OrgScreen, OrgModule));
