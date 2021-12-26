import s from './OrgPlan.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useMemo, useState} from "react";
import {InputDropdown} from "react-forms-input";

const OrgPlan = ({profile, plan, module}) => {
  const {orgPlanManager} = module;

  const [liasonId, setLiasonId] = useState(plan.liasonId ? plan.liasonId : '');

  const onPlanChange = useCallback(async(value) => {
    await orgPlanManager.updatePlan(profile.uid, {
      plan: value
    });
  }, [orgPlanManager, profile]);

  const onAwardChange = useCallback(async(value) => {
    await orgPlanManager.updatePlan(profile.uid, {
      award: value
    });
  }, [orgPlanManager, profile]);

  const onLiasonChange = useCallback(event => {
    const value = event.target.value;
    setLiasonId(value);
  }, []);

  const onLiasonSave = useCallback(async() => {
    await orgPlanManager.assignLiason(profile.uid, liasonId);
  }, [liasonId, orgPlanManager, profile]);

  const onLiasonRemove = useCallback(async() => {
    const shouldRemove = window.confirm(`ARE YOU SURE YOU WANT TO UNASSIGN THE LIAISON?`);
    if (!shouldRemove) {
      return;
    }
    await orgPlanManager.removeLiason(profile.uid);
    setLiasonId('');
  }, [orgPlanManager, profile]);

  const content = useMemo(() => {
    if (!plan) {
      return null;
    }

    const plans = orgPlanManager.getPlans();
    const awards = orgPlanManager.getAwards();

    return (
      <div className={s.outer}>
        <InputDropdown
          title={'Plan'}
          className={s.dropdownOuter}
          initialValue={plan.plan ? plan.plan : plans[0]}
          onChange={onPlanChange}
          options={plans}
        />
        <InputDropdown
          title={'Award'}
          className={s.dropdownOuter}
          initialValue={plan.award ? plan.award : awards[0]}
          onChange={onAwardChange}
          options={awards}
        />
        <div className={s.inputOuter}>
          <div className={s.inputTitle}>{`Liaison UID`}</div>
          <div className={s.inputInner}>
            <input
              className={s.input}
              onChange={onLiasonChange}
              value={liasonId}
            />
            <div className={s.inputButtonsOuter}>
              <div className={`${s.inputButton} ${s.saveLiasonButton}`} onClick={onLiasonSave}>
                {'Assign'}
              </div>
              <div className={`${s.inputButton} ${s.removeLiasonButton}`} onClick={onLiasonRemove}>
                {'Unassign'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [plan, orgPlanManager, onPlanChange, onAwardChange, onLiasonChange, onLiasonSave, onLiasonRemove, liasonId]);

  return content;
}

export default withModule(OrgPlan);
