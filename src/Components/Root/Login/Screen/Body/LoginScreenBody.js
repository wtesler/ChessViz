import s from './LoginScreenBody.module.css';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {withModule} from "react-hoc-di";
import {withCms} from "react-cms-firestore";
import {LoginContent} from "react-firebase-login";

const LoginScreenBody = props => {
  const {cms} = props;
  const {logo, legal, login} = cms;
  const {logoPrimaryDarkUrl} = logo;
  const {privacyLink, termsLink} = legal;
  const {explainerTitle, explainer} = login;

  return (
    <div className={s.outer}>
      <LoginContent logoSrc={logoPrimaryDarkUrl} explainerTitle={explainerTitle} explainer={explainer} termsLink={termsLink} privacyLink={privacyLink}/>
    </div>
  )
}

export default withCms(withRouter(withModule(LoginScreenBody)), ['logo', 'legal', 'login']);
