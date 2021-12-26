import s from './DashboardAwardCard.module.css';
import DashboardCard from "../DashboardCard";
import {Icon} from "react-basic-icon";
import {withCms} from "react-cms-firestore"
import {withModule} from "react-hoc-di"
import {useCallback, useEffect, useMemo, useState} from "react";

const DashboardAwardCard = ({cms, module}) => {
  const {planManager} = module;
  const {awards} = cms;
  const {tiers, card_title, card_text} = awards;
  // const {toastRelay} = module;

  const [plan, setPlan] = useState();

  const onPlan = useCallback(plan => {
    setPlan(plan);
  }, []);

  useEffect(() => {
    planManager.addListener(onPlan);
    return () => {
      planManager.removeListener(onPlan);
    }
  // eslint-disable-next-line
  }, [planManager]);

  const onClick = useCallback(() => {
    // toastRelay.show('Not Implemented', false, 2000);
  }, []);

  const content = useMemo(() => {
    if (!plan || !plan.award || plan.award === 'NONE') {
      return null;
    }

    let imageUrl;

    for (const tier of tiers) {
      if (tier.name === plan.award) {
        imageUrl = tier.image;
        break;
      }
    }

    return (
      <DashboardCard>
        <div className={s.outer} onClick={onClick}>
          <Icon className={s.logo} src={imageUrl} />
          <div className={s.text}>
            <span className={s.boldText}> {card_title} </span><span> {card_text}</span>
          </div>
        </div>
      </DashboardCard>
    );
  }, [plan, tiers, card_title, card_text, onClick]);

  return content;
}

export default withModule(withCms(DashboardAwardCard, ['awards']));
