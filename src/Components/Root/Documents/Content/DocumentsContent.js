import s from './DocumentsContent.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import DocumentItem from "../Item/DocumentItem";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";

const DocumentsContent = props => {
  const {module, requests} = props;
  const {toastRelay, serverClient} = module;
  const [fileNames, setFileNames] = useState(null);

  const readFileNames = useCallback(async () => {
    try {
      const names = await serverClient.readFiles(null, requests);
      setFileNames(names);
    } catch (e) {
      console.error(e);
      toastRelay.show('Failed to load files. Try reloading page.', false, 5000);
    }
  }, [serverClient, toastRelay, requests]);

  useEffect(() => {
    readFileNames();
    // eslint-disable-next-line
  }, []);

  const mainContent = useMemo(() => {
    if (!fileNames) {
      return <BasicLoading/>;
    }

    const itemElements = [];
    for (let i = 0; i < fileNames.length; i++) {
      const name = fileNames[i];
      itemElements.push(<DocumentItem name={name} key={`${name} ${i}`}/>);
    }

    return (
      <div className={s.bodyOuter}>
        <div className={s.body}>
          <div className={s.itemsContainer}>
            {itemElements}
          </div>
        </div>
      </div>
    );
  }, [fileNames]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withSubscription(withModule(DocumentsContent));
