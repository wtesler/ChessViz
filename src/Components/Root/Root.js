// noinspection JSCheckFunctionSignatures

import React, {lazy, Suspense} from 'react';
import s from './Root.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {
  ROUTE_INDEX,
  ROUTE_LANDING,
  ROUTE_NOT_FOUND,
  ROUTE_DASHBOARD,
  ROUTE_DOCUMENTS,
  ROUTE_PROFILE,
  ROUTE_CMS,
  ROUTE_ROLES,
  ROUTE_SPREADSHEET,
  ROUTE_ORGS,
  ROUTE_ORG,
  ROUTE_REGISTER,
  ROUTE_SURVEY_EDIT,
  ROUTE_SURVEY_EDIT_SECTION,
  ROUTE_SURVEY,
  ROUTE_WORKERS,
  ROUTE_NEWSLETTER_SUCCESS
} from '../../Constants/routes';
import RootWindow from "./Window/RootWindow";
import FirebaseStartup from "./Firebase/FirebaseStartup";
import Startup from "./Startup/Startup";
import LoginPortal from "./Login/LoginPortal";
import BasicLoading from "./Loading/BasicLoading";
import {RootOverlays} from "react-root-overlays";
import CloudConfig from "../../Server/Config/CloudConfig";

const DashboardScreen = lazy(() => import('./Dashboard/DashboardScreen'));
const DocumentsScreen = lazy(() => import('./Documents/DocumentsScreen'));
const ProfileScreen = lazy(() => import('./Profile/ProfileScreen'));
const SurveyScreen = lazy(() => import('./Survey/SurveyScreen'));
const SurveyQuestionScreen = lazy(() => import('./SurveyQuestion/SurveyQuestionScreen'));
const SpreadsheetScreen = lazy(() => import('./Spreadsheet/SpreadsheetScreen'));
const OrgsScreen = lazy(() => import('./Orgs/OrgsScreen'));
const OrgScreen = lazy(() => import('./Org/OrgScreen'));
const RegisterScreen = lazy(() => import('./Register/RegisterScreen'));
const SurveyEditScreen = lazy(() => import('./SurveyEdit/SurveyEditScreen'));
const SurveySectionEditScreen = lazy(() => import('./SurveySectionEdit/SurveySectionEditScreen'));
const NewsletterSuccessScreen = lazy(() => import('./NewsletterSuccess/NewsletterSuccessScreen'));
const WorkersScreen = lazy(() => import('./Workers/WorkersScreen'));
const CmsScreen = lazy(() => import('react-cms-firestore-editor'));
const RolesScreen = lazy(() => import('react-firebase-roles-editor'));
const NotFound = lazy(() => import('./NotFound/NotFound'));

/**
 * Top-Level Component for the App.
 */
const Root = () => {
  const landing = <DashboardScreen/>;

  const withLogin = (component, isLoginRequired=true) => {
    return () => (
      <LoginPortal isLoginRequired={isLoginRequired}>
        {component}
      </LoginPortal>
    )
  }

  return (
    <div className={s.root}>
      <RootWindow/>
      <FirebaseStartup/>
      <Startup>
        <RootOverlays>
          <BrowserRouter>
            <Suspense fallback={<BasicLoading/>}>
              <Switch>
                <Route exact path={ROUTE_LANDING} render={withLogin(landing)}/>
                <Route path={ROUTE_INDEX} render={withLogin(landing)}/>
                <Route path={ROUTE_DASHBOARD} render={withLogin(<DashboardScreen/>)}/>
                <Route path={ROUTE_DOCUMENTS} render={withLogin(<DocumentsScreen/>)}/>
                <Route path={ROUTE_PROFILE} render={withLogin(<ProfileScreen/>)}/>
                <Route exact path={ROUTE_SURVEY} render={withLogin(<SurveyScreen/>)}/>
                <Route path={ROUTE_SURVEY} render={withLogin(<SurveyQuestionScreen/>)}/>
                <Route path={ROUTE_SPREADSHEET} render={withLogin(<SpreadsheetScreen/>)}/>
                <Route path={ROUTE_ORGS} render={withLogin(<OrgsScreen/>, false)}/>
                <Route path={ROUTE_ORG} render={withLogin(<OrgScreen/>, false)}/>
                <Route path={ROUTE_REGISTER} render={withLogin(<RegisterScreen/>)}/>
                <Route path={ROUTE_SURVEY_EDIT} render={withLogin(<SurveyEditScreen/>)}/>
                <Route path={ROUTE_SURVEY_EDIT_SECTION} render={withLogin(<SurveySectionEditScreen/>)}/>
                <Route path={ROUTE_WORKERS} render={withLogin(<WorkersScreen/>)}/>
                <Route path={ROUTE_NEWSLETTER_SUCCESS}><NewsletterSuccessScreen/></Route>
                <Route path={ROUTE_CMS}><CmsScreen/></Route>
                <Route path={ROUTE_ROLES}><RolesScreen host={CloudConfig.main}/></Route>
                <Route path={ROUTE_NOT_FOUND} component={NotFound}/>
                <Route component={NotFound}/>
              </Switch>
            </Suspense>
          </BrowserRouter>
        </RootOverlays>
      </Startup>
    </div>
  );
}

export default Root;
