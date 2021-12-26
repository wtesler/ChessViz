import s from './OrgContent.module.css';
import {withModule} from "react-hoc-di";
import BasicLoading from "../../Loading/BasicLoading";
import {SignedIcon} from "react-basic-icon";
import {useCallback, useEffect, useMemo, useState} from "react";
import OrgPlan from "../Plan/OrgPlan";
import ResetSurveyButton from "../ResetSurvey/ResetSurveyButton";

const OrgContent = ({module}) => {
  const {orgProfileManager, orgPlanManager} = module;

  const [profile, setProfile] = useState();
  const [plan, setPlan] = useState();

  const onProfile = useCallback(async (profile) => {
    setProfile(profile);
  }, []);

  const onPlan = useCallback(async (plan) => {
    setPlan(plan);
  }, []);

  useEffect(() => {
    orgProfileManager.addListener(onProfile);
    orgPlanManager.addListener(onPlan);
    return () => {
      orgProfileManager.removeListener(onProfile);
      orgPlanManager.removeListener(onPlan);
    }
    // eslint-disable-next-line
  }, [orgProfileManager, orgPlanManager]);

  const content = useMemo(() => {
    if (!profile || !plan) {
      return <BasicLoading/>;
    }

    const profileData = profile.data;

    return (
      <div className={s.outer}>
        <div className={s.headerOuter}>
          <SignedIcon className={s.profileImage} signedUrl={profile.imageSignedUrl}/>
          <div className={`${s.headerTitleOuter}`}>
            <div className={`${s.headerTitlePart}`}>
              {`${profileData.orgName}`}
            </div>
            <div className={`${s.headerTitlePart}`}>
              {`Contact: ${profileData.contactName}`}
            </div>
            <div className={`${s.headerTitlePart}`}>
              {profileData.contactEmail ? profileData.contactEmail : 'No Email'}
            </div>
            <div className={`${s.headerTitlePart}`}>
              {profileData.contactPhone ? profileData.contactPhone : 'No Phone'}
            </div>
            <div className={`${s.headerTitlePart}`}>
              {`UID: ${profile.uid}`}
            </div>
            <div className={`${s.headerTitlePart}`}>
              {`Address: ${profileData.address}`}
            </div>
          </div>
        </div>
        <OrgPlan profile={profile} plan={plan}/>
        <ResetSurveyButton className={s.resetSurveyOuter} profile={profile}/>
      </div>
    );
  }, [profile, plan]);

  return content;
}

export default withModule(OrgContent);
