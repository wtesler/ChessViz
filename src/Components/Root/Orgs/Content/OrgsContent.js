import s from './OrgsContent.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import {FAILED_LOAD_USERS, NO_RESULTS} from "../../../../Constants/i18n";
import OrgItem from "../Item/OrgItem";
import OrgsSearch from "../Search/OrgsSearch";
import OrgsPagination from "../Pagination/OrgsPagination";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";

const OrgsContent = props => {
  const {module, requests} = props;
  const {toastRelay, serverClient} = module;
  const [profiles, setProfiles] = useState(null);
  const [filter, setFilter] = useState(null);
  const [type, setType] = useState(null);
  const [hasCleared, setHasCleared] = useState(false);

  const readProfiles = useCallback(async (filter, type, pageToken=null, pageForwards=null) => {
    setHasCleared(false);
    try {
      const profiles = await serverClient.readProfiles(filter, type, pageToken, pageForwards, 10, requests);
      setProfiles(profiles);
    } catch (e) {
      console.error(e);
      toastRelay.show(FAILED_LOAD_USERS, false, 5000);
    }
  }, [serverClient, toastRelay, requests]);

  useEffect(() => {
    readProfiles();
    // eslint-disable-next-line
  }, []);

  const onSearch = useCallback(async (filter, type) => {
    setFilter(filter);
    setType(type);
    setProfiles(null);
    await readProfiles(filter, type);
  }, [readProfiles]);

  const onClear = useCallback(() => {
    setProfiles([]);
    setHasCleared(true);
  }, []);

  const onPaginate = useCallback(async(token, isForward) => {
    setProfiles(null);
    await readProfiles(filter, type, token, isForward);
  }, [filter, type, readProfiles]);

  const bodyElement = useMemo(() => {
    if (!profiles) {
      return <BasicLoading delayMs={0}/>;
    }

    let innerBody;

    if (profiles.length === 0 && !hasCleared) {
      innerBody = (
        <div className={s.noResultsContainer}>
          {NO_RESULTS}
        </div>
      );
    } else {
      const itemElements = [];
      for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        itemElements.push(<OrgItem profile={profile} key={profile.uid}/>);
      }

      // Invisible items used to space the items properly (because space-between is used in css).
      for (let i = 0; i < 6; i++) {
        itemElements.push(<div className={s.invisibleItem} key={i}/>);
      }

      innerBody = (
        <div className={s.itemsContainer}>
          {itemElements}
        </div>
      );
    }

    return (
      <div className={s.body}>
        {innerBody}
      </div>
    );
  }, [profiles, hasCleared]);

  const mainContent = useMemo(() => {
    return (
      <div className={s.bodyOuter}>
        <OrgsSearch onSearch={onSearch} onClear={onClear}/>
        {bodyElement}
        <OrgsPagination profiles={profiles} onPaginate={onPaginate} hasCleared={hasCleared}/>
      </div>
    );
  }, [bodyElement, onSearch, onClear, profiles, onPaginate, hasCleared]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withSubscription(withModule(OrgsContent));
