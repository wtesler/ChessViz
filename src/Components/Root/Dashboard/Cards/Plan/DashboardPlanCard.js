import s from './DashboardPlanCard.module.css';
import DashboardCard from "../DashboardCard";
import {Icon} from "react-basic-icon";
import {withCms} from "react-cms-firestore"
import {withModule} from "react-hoc-di"
import {useCallback} from "react";

const DashboardPlanCard = ({cms, module}) => {
  const {logo} = cms;
  const {logoSecondaryCircleLightUrl} = logo;
  const {toastRelay} = module;

  const onClick = useCallback(() => {
    toastRelay.show('Not Implemented', false, 2000);
  }, [toastRelay]);

  return (
    <DashboardCard>
      <div className={s.outer} onClick={onClick}>
        <Icon className={s.logo} src={logoSecondaryCircleLightUrl} />
        <div className={s.text}>
          <span>Select a</span><span className={s.boldText}> Plan </span><span>to get access to more</span>
        </div>
      </div>
    </DashboardCard>
  );
}

export default withModule(withCms(DashboardPlanCard, ['logo']));
