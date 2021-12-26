import s from './DashboardProfileCard.module.css';
import DashboardCard from "../DashboardCard";
import {SignedIcon} from "react-basic-icon";
import {withModule} from "react-hoc-di"
import {useCallback, useEffect, useMemo, useState} from "react";
import {withRouter} from "react-router-dom";
import {ROUTE_PROFILE} from "../../../../../Constants/routes";

const DashboardProfileCard = ({module, history}) => {
  const {user, profileManager} = module;

  const [profile, setProfile] = useState();

  const onProfile = useCallback(async (profile) => {
    setProfile(profile);
  }, []);

  useEffect(() => {
    profileManager.addListener(onProfile);
    return () => {
      profileManager.removeListener(onProfile);
    }
    // eslint-disable-next-line
  }, [profileManager]);

  const onClick = useCallback(() => {
    history.push(ROUTE_PROFILE);
  }, [history]);

  const date = useMemo(() => {
    const creationTimeString = user.metadata.creationTime;
    const date = new Date(creationTimeString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  }, [user]);

  const contactName = useMemo(() => {
    if (!profile) {
      return 'Friend';
    }
    let contactName = profile.data.contactName;
    if (!contactName) {
      contactName = profile.data.contactEmail;
    }
    return contactName ? contactName : '';
  }, [profile]);

  const orgName = useMemo(() => {
    if (!profile) {
      return '';
    }
    const orgName = profile.data.orgName;
    return orgName ? orgName : '';
  }, [profile]);

  const imageElement = useMemo(() => {
    if (!profile) {
      return null;
    }
    return (
      <SignedIcon className={s.icon} signedUrl={profile.imageSignedUrl} />
    );
  }, [profile]);

  return (
    <DashboardCard>
      <div className={s.outer} onClick={onClick}>
        <div className={s.textOuter}>
          <div className={s.name}>
            {contactName}
          </div>
          <div className={s.org}>
            {orgName}
          </div>
          <div className={s.joined}>
            {`Joined ${date}`}
          </div>
        </div>
        <div className={s.iconOuter}>
          {imageElement}
        </div>
      </div>
    </DashboardCard>
  );
}

export default withRouter(withModule(DashboardProfileCard));
