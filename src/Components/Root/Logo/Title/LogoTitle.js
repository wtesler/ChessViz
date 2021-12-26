import s from './LogoTitle.module.css';
import {Icon} from "react-basic-icon";
import {withCms} from "react-cms-firestore";

const LogoTitle = props => {
  const {logoPrimaryLightUrl, logoPrimaryDarkUrl} = props.cms.logo;

  return (
    <div className={`${s.outer} ${props.className}`}>
      <Icon className={`${s.image} ${props.imageClassName}`}
            src={props.dark ? logoPrimaryLightUrl : logoPrimaryDarkUrl}/>
    </div>
  );
}

export default withCms(LogoTitle, 'logo');
