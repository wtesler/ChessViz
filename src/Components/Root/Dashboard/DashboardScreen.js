import s from './DashboardScreen.module.css';
import {withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import DashboardNavBar from "./NavBar/DashboardNavBar";
import {useCallback, useEffect, useMemo, useState} from "react";
import DashboardModule from "./Module/DashboardModule";
import {ROUTE_DASHBOARD, ROUTE_PROFILE} from "../../../Constants/routes";
import {DASHBOARD} from "../../../Constants/i18n";
import BasicLoading from "../Loading/BasicLoading";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import DashboardPlanCard from "./Cards/Plan/DashboardPlanCard";
import DashboardProfileCard from "./Cards/Profile/DashboardProfileCard";
import DashboardSurveyProgressCard from "./Cards/SurveyProgress/DashboardSurveyProgressCard";
import DashboardAwardCard from "./Cards/Award/DashboardAwardCard";

const DashboardScreen = props => {
  const {module, history} = props;
  const {profileManager} = module;
  const [profile, setProfile] = useState(null);

  const onProfile = useCallback(async (profile) => {
    if (!profile || Object.keys(profile.data).length === 0) {
      // Need to do initial profile setup.
      history.push(ROUTE_PROFILE);
    } else {
      setProfile(profile);
      history.push(ROUTE_DASHBOARD);
    }
  }, [history]);

  useEffect(() => {
    profileManager.addListener(onProfile);
    return () => {
      profileManager.removeListener(onProfile);
    }
    // eslint-disable-next-line
  }, [profileManager]);

  const mainContent = useMemo(() => {
    if (!profile) {
      return <BasicLoading/>;
    }
    return (
      <div className={s.body}>
        <div className={s.cards}>
          <DashboardAwardCard />
          <DashboardPlanCard />
          <DashboardProfileCard />
          <DashboardSurveyProgressCard />
        </div>
      </div>
    );
  }, [profile]);

  return (
    <div className={s.outer}>
      <ThemedBackground/>
      <DashboardNavBar/>
      <SubMenuFrame title={DASHBOARD} titleClass={s.titleClass}>
        {mainContent}
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withRouter(withModule(DashboardScreen, DashboardModule));
