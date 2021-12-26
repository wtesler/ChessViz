import s from './OrgItem.module.css';
import React, {useMemo} from 'react';
import {SignedIcon} from "react-basic-icon";
import {Link} from "react-router-dom";
import {ROUTE_ORG} from "../../../../Constants/routes";

const OrgItem = ({profile}) => {

  const iconElement = useMemo(() => {
    if (!profile || !profile.imageSignedUrl) {
      return;
    }
    return (<SignedIcon className={s.image} signedUrl={profile.imageSignedUrl}/>);
  }, [profile]);

  const infoElement = useMemo(() => {
    let title = 'Untitled';
    let industry = '';
    if (profile) {
      const data = profile.data;
      if (data.orgName) {
        title = data.orgName;
      }
      if (data.industry) {
        industry = data.industry;
      }
    }
    return (
      <div className={s.infoOuter}>
        <div className={s.name}>
          {title}
        </div>
        <div className={s.industry}>
          {industry}
        </div>
      </div>
    )
  }, [profile]);

  return (
    <div className={s.outer}>
      <Link to={`${ROUTE_ORG}/${profile.uid}`} className={s.inner}>
        {iconElement}
        {infoElement}
      </Link>
    </div>
  );
}

export default OrgItem;
