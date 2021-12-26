import s from './SpreadsheetContent.module.css';
import {withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import {withCms} from "react-cms-firestore";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import SpreadsheetActions from "../Actions/SpreadsheetActions";
import {URLHelper} from "../../../../URL/URLHelper";
import {ROUTE_NOT_FOUND} from "../../../../Constants/routes";
import {FAILED_LOAD_SPREADSHEET, LOADING} from "../../../../Constants/i18n";
import SpreadsheetItem from "../Item/SpreadsheetItem";

const SpreadsheetContent = props => {
  const {module, location, history, cms} = props;
  const {toastRelay, databaseClient, dialogRelay} = module;
  const {spreadsheets: spreadsheetsCms} = cms;
  const [items, setItems] = useState(null);
  const [config, setConfig] = useState(null);

  const toUppercaseKeys = useCallback((obj) => {
    const newObj = {};
    for (const key of Object.keys(obj)) {
      newObj[key.toUpperCase()] = obj[key];
    }
    return newObj;
  }, []);

  const readUserSpreadsheet = useCallback(async (name) => {
    try {
      toastRelay.show(LOADING, true);
      let [ids, items] = await databaseClient.readUserSpreadsheet(name);
      items = items.map(toUppercaseKeys);
      setItems({
        ids: ids,
        values: items
      })
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(FAILED_LOAD_SPREADSHEET, false, 5000);
    }
  }, [databaseClient, toastRelay, toUppercaseKeys]);

  useEffect(() => {
    if (!URLHelper.hasId(location)) {
      console.warn("Need to suffix spreadsheet screen with an id.");
      history.push(ROUTE_NOT_FOUND);
      return;
    }
    const name = URLHelper.getPathEnd(location);

    let config = spreadsheetsCms[name];
    if (!config) {
      toastRelay.show(`CMS not set for spreadsheet with name ${name}`, true);
      return;
    }
    config = config.split(',').filter(x => x).map(x => x.toUpperCase());
    setConfig(config);

    readUserSpreadsheet(name, config);
    // eslint-disable-next-line
  }, [spreadsheetsCms, toastRelay]);

  useEffect(() => {
    return () => {
      toastRelay.show(null);
    }
  }, [toastRelay]);

  const toItemArr = useCallback((item) => {
    const newItem = [];
    for (const part of config) {
      let point = item[part];
      if (point === null || point === undefined) {
        point = '';
      }
      newItem.push(point);
    }
    return newItem;
  }, [config]);

  const onNewItems = useCallback((newItems) => {
    newItems = newItems.map(toUppercaseKeys);

    for (const item of newItems) {
      for (const key of Object.keys(item)) {
        if (!config.includes(key)) {
          delete item[key];
        }
      }
    }

    const newIds = [];
    for (let i = 0; i < newItems.length; i++) {
      // Making unique keys for the items.
      const item = newItems[i];
      const shortVals = Object.values(item).map(val => val.substring(0, 4));
      newIds.push(shortVals.join() + i);
    }
    setItems({
      ids: newIds,
      values: newItems
    });

    dialogRelay.show(null);
  }, [toUppercaseKeys, config, dialogRelay]);

  const mainContent = useMemo(() => {
    if (!items) {
      return <BasicLoading/>;
    }

    const itemArrs = items.values.map(toItemArr);

    const headerElements = [];
    for (let i = 0; i < config.length; i++) {
      const part = config[i];
      headerElements.push(
        <div className={s.itemsHeaderPart} key={i}>
          {part}
        </div>
      )
    }
    const header = (
      <div className={s.itemsHeader}>
        {headerElements}
      </div>
    );

    const itemElements = [];
    for (let i = 0; i < items.ids.length; i++) {
      const id = items.ids[i];
      const item = itemArrs[i];
      itemElements.push(<SpreadsheetItem item={item} key={id}/>);
    }

    return (
      <div className={s.bodyOuter}>
        <div className={s.body}>
          <SpreadsheetActions config={config} onNewItems={onNewItems}/>
          {header}
          <div className={s.itemsContainer}>
            {itemElements}
          </div>
        </div>
      </div>
    );
  }, [items, config, toItemArr, onNewItems]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withRouter(withModule(withCms(SpreadsheetContent, 'spreadsheets')));
