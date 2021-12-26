import s from './ProfileScreen.module.css';
import {withRouter} from "react-router-dom";
import ProfileNavBar from "./NavBar/ProfileNavBar";
import withSubscription from "../../../Subscriptions/shared/withSubscription";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ProfileModule from "./Module/ProfileModule";
import {
  FAILED_SAVE_PROFILE,
  PROFILE,
  SAVING
} from "../../../Constants/i18n";
import {BasicInput, InputDropdown} from "react-forms-input";
import {ROUTE_DASHBOARD} from "../../../Constants/routes";
import ProfileInputImage from "./Form/Image/ProfileInputImage";
import BasicLoading from "../Loading/BasicLoading";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import SubMenuFrame from "../SubMenu/Frame/SubMenuFrame";
import {withModule} from "react-hoc-di";
import SaveButton from "../Save/SaveButton";
import sectors from "../../../Constants/sectors";
import industries from "../../../Constants/industries";
import companySizes from "../../../Constants/companySizes";

const ProfileScreen = props => {
  const {module, requests, subscription, history} = props;
  const {toastRelay, saveClickSubject, serverClient, loginManager, profileManager} = module;

  const CONTACT_NAME_FIELD = 'contactName';
  const ORGANIZATION_NAME_FIELD = 'orgName';
  const CONTACT_EMAIL_FIELD = 'contactEmail';
  const CONTACT_PHONE_FIELD = 'contactPhone';
  const CONTACT_JOB_TITLE_FIELD = 'contactJobTitle';
  const ORGANIZATION_SECTOR = 'orgSector';
  const INDUSTRY = 'industry';
  const ORGANIZATION_SIZE = 'orgSize';
  const ADDRESS = 'address';
  const WEBSITE_LINK = 'websiteLink';

  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const wipProfileData = useRef({});

  const onProfile = useCallback(async (profile) => {
    if (!profile) {
      profile = {data: {}};
    }
    wipProfileData.current = Object.assign({}, profile.data);

    setProfile(profile);
  }, []);

  useEffect(() => {
    profileManager.addListener(onProfile);
    return () => {
      profileManager.removeListener(onProfile);
    }
    // eslint-disable-next-line
  }, [profileManager]);

  const readUser = useCallback(async () => {
    const user = await loginManager.awaitUser();
    setUserEmail(user.email);
  }, [loginManager]);

  useEffect(() => {
    readUser();
  }, [readUser]);

  const onProfileChange = useCallback((field, value) => {
    wipProfileData.current[field] = value;
  }, []);

  const onSaveClick = useCallback(async () => {
    const newProfile = wipProfileData.current;
    try {
      toastRelay.show(SAVING, true);
      await serverClient.updateProfile(newProfile, requests);
      await profileManager.read();
      toastRelay.show(null);
      history.push(ROUTE_DASHBOARD);
    } catch (e) {
      console.error(e);
      if (e.code === 409) {
        toastRelay.show(e.message, false, 5000);
      } else {
        toastRelay.show(FAILED_SAVE_PROFILE, false, 5000);
      }
    }
  }, [toastRelay, requests, history, serverClient, profileManager]);

  useEffect(() => {
    subscription.add(saveClickSubject.subscribe(onSaveClick));
  }, [subscription, onSaveClick, saveClickSubject]);

  const mainContent = useMemo(() => {
    if (!profile) {
      return <BasicLoading/>;
    }

    let email = profile.data[CONTACT_EMAIL_FIELD];
    if (!email && userEmail) {
      email = userEmail;
    }

    return (
      <div className={s.bodyOuter}>
        <div className={s.body}>
          <div className={s.bodyInner}>
            <div className={s.bodySection}>
              <div className={s.bodySectionInputs}>
                <BasicInput
                  title={'Contact Name *'}
                  titleClass={s.inputTitle}
                  initialValue={profile.data[CONTACT_NAME_FIELD]}
                  onChange={value => onProfileChange(CONTACT_NAME_FIELD, value)}
                  maxChars={128}
                />
                <BasicInput
                  title={'Organization Name *'}
                  titleClass={s.inputTitle}
                  initialValue={profile.data[ORGANIZATION_NAME_FIELD]}
                  onChange={value => onProfileChange(ORGANIZATION_NAME_FIELD, value)}
                  maxChars={64}
                />
                <BasicInput
                  title={'Contact Email *'}
                  titleClass={s.inputTitle}
                  type={'email'}
                  initialValue={email}
                  onChange={value => onProfileChange(CONTACT_EMAIL_FIELD, value)}
                  maxChars={128}
                />
                <BasicInput
                  title={'Contact Phone'}
                  titleClass={s.inputTitle}
                  type={'tel'}
                  initialValue={profile.data[CONTACT_PHONE_FIELD]}
                  onChange={value => onProfileChange(CONTACT_PHONE_FIELD, value)}
                  maxChars={32}
                />
                <BasicInput
                  title={'Contact Job Title'}
                  titleClass={s.inputTitle}
                  initialValue={profile.data[CONTACT_JOB_TITLE_FIELD]}
                  onChange={value => onProfileChange(CONTACT_JOB_TITLE_FIELD, value)}
                  maxChars={64}
                />
                <InputDropdown
                  title={'Organization Size *'}
                  titleClass={s.inputDropdownTitle}
                  initialValue={profile.data[ORGANIZATION_SIZE]}
                  onChange={value => onProfileChange(ORGANIZATION_SIZE, value)}
                  maxChars={64}
                  options={companySizes}
                />
                <InputDropdown
                  title={'Industry (NAICS) *'}
                  titleClass={s.inputDropdownTitle}
                  initialValue={profile.data[INDUSTRY]}
                  onChange={value => onProfileChange(INDUSTRY, value)}
                  maxChars={128}
                  options={industries}
                />
                <InputDropdown
                  title={'Organization Sector *'}
                  titleClass={s.inputDropdownTitle}
                  initialValue={profile.data[ORGANIZATION_SECTOR]}
                  onChange={value => onProfileChange(ORGANIZATION_SECTOR, value)}
                  maxChars={64}
                  options={sectors}
                />
                <BasicInput
                  title={'Website Link'}
                  titleClass={s.inputTitle}
                  type={'url'}
                  initialValue={profile.data[WEBSITE_LINK]}
                  onChange={value => onProfileChange(WEBSITE_LINK, value)}
                  maxChars={128}
                />
                <BasicInput
                  title={'Address'}
                  titleClass={s.inputTitle}
                  initialValue={profile.data[ADDRESS]}
                  onChange={value => onProfileChange(ADDRESS, value)}
                  maxChars={256}
                  isMultiline={true}
                  minHeight={120}
                />
                <div className={s.saveButtonContainer1}>
                  <SaveButton onSaveClick={onSaveClick}/>
                </div>
              </div>
              <div className={s.bodySectionImage}>
                <ProfileInputImage profile={profile}/>
              </div>
            </div>
            <div className={s.saveButtonContainer2}>
              <SaveButton onSaveClick={onSaveClick}/>
            </div>
          </div>
        </div>
      </div>
    )
  }, [profile, onProfileChange, onSaveClick, userEmail]);

  return (
    <div className={s.main}>
      <ThemedBackground/>
      <ProfileNavBar/>
      <SubMenuFrame title={PROFILE} titleClass={s.titleClass}>
        {mainContent}
      </SubMenuFrame>
      <Footer/>
    </div>
  );
}

export default withRouter(withSubscription(withModule(ProfileScreen, ProfileModule)));
