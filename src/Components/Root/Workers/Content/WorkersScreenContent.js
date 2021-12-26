import s from './WorkersScreenContent.module.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";
import {withModule} from "react-hoc-di";
import {Icon} from "react-basic-icon";
import plusImage from "../../../../Images/plus.svg";
import removeImage from "../../../../Images/remove.svg";
import AddModal from "./AddModal/AddModal";

const WorkersScreenContent = props => {
  const {module, requests} = props;
  const {serverClient, toastRelay, dialogRelay} = module;

  const [evaluators, setEvaluators] = useState(null);
  const [liasons, setLiasons] = useState(null);

  const readEvaluators = useCallback(async () => {
    try {
      const evaluators = await serverClient.readEvaluators(requests);
      setEvaluators(evaluators);
    } catch (e) {
      console.error(e);
      toastRelay.show('Failed to load evaluators. Please reload page.', false, 5000);
    }
  }, [serverClient, toastRelay, requests]);

  const readLiasons = useCallback(async () => {
    try {
      const liasons = await serverClient.readLiasons(requests);
      setLiasons(liasons);
    } catch (e) {
      console.error(e);
      toastRelay.show('Failed to load liasons. Please reload page.', false, 5000);
    }
  }, [serverClient, toastRelay, requests]);

  useEffect(() => {
    readEvaluators();
    readLiasons();
    // eslint-disable-next-line
  }, []);

  const onAddSubmit = useCallback(async (email, job) => {
    try {
      toastRelay.show(`Adding ${job}`, true);
      if (job === 'evaluator') {
        await serverClient.addEvaluator(email, requests);
        await readEvaluators();
      } else {
        await serverClient.addLiason(email, requests);
        await readLiasons();
      }
      toastRelay.show(null);
    } catch (e) {
      let msg = `Failed to add ${job}. Please try again.`;
      if (e.code === 409) {
        msg = `Email not found. Have they registered yet?`;
      }
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(msg, false, 7000);
    }
  }, [serverClient, toastRelay, requests, readEvaluators, readLiasons]);

  const onAddClick = useCallback((job) => {
    dialogRelay.show(
      <AddModal onSubmit={(email) => onAddSubmit(email, job)}/>,
      true,
      null
    );
  }, [dialogRelay, onAddSubmit]);

  const createHeader = useCallback((title, job) => {
    return (
      <div className={`${s.headerOuter}`}>
        <div className={`${s.headerTitle}`}>
          {title}
        </div>
        <Icon className={`${s.headerActionImage}`} src={plusImage} onClick={() => onAddClick(job)}/>
      </div>
    );
  }, [onAddClick]);

  const onDeleteClick = useCallback(async(uid, job) => {
    const shouldDelete = window.confirm(`ARE YOU SURE YOU WANT TO REMOVE THE ${job.toUpperCase()}? THIS CANNOT BE UNDONE.`);
    if (!shouldDelete) {
      return;
    }

    try {
      toastRelay.show(`Removing ${job}`, true);
      if (job === 'evaluator') {
        await serverClient.deleteEvaluator(uid, requests);
        await readEvaluators();
      } else {
        await serverClient.deleteLiason(uid, requests);
        await readLiasons();
      }
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(`Failed to remove ${job}. Please try again.`, false, 5000);
    }
  }, [serverClient, toastRelay, requests, readEvaluators, readLiasons]);

  const createItem = useCallback((worker, job) => {
    return (
      <div className={s.itemOuter} key={worker.uid}>
        <div className={s.itemInner}>
          <div>{worker.email}</div>
          <div className={s.itemUid}>{`UID: ${worker.uid}`}</div>
        </div>
        <Icon className={`${s.itemImage}`} src={removeImage} onClick={() => onDeleteClick(worker.uid, job)}/>
      </div>
    );
  }, [onDeleteClick]);

  const mainContent = useMemo(() => {
    if (!evaluators || !liasons) {
      return <BasicLoading/>;
    }

    const evaluatorElements = [];
    for (const evaluator of evaluators) {
      evaluatorElements.push(createItem(evaluator, 'evaluator'));
    }
    const evaluatorsElement = (
      <div className={s.itemsOuter}>
        {evaluatorElements}
      </div>
    );

    const liasonElements = [];
    for (const liason of liasons) {
      liasonElements.push(createItem(liason, 'liason'));
    }

    const liasonsElement = (
      <div className={s.itemsOuter}>
        {liasonElements}
      </div>
    );

    return (
      <div className={s.outer}>
        <div className={s.inner}>
          {createHeader('Evaluators', 'evaluator')}
          {evaluatorsElement}
          {createHeader('Liaisons', 'liason')}
          {liasonsElement}
        </div>
      </div>
    );
  }, [evaluators, liasons, createItem, createHeader]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withSubscription(withModule(WorkersScreenContent));
