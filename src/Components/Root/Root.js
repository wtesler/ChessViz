// noinspection JSCheckFunctionSignatures

import React, {lazy, Suspense} from 'react';
import s from './Root.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {
  ROUTE_INDEX,
  ROUTE_LANDING,
  ROUTE_NOT_FOUND,
  ROUTE_MAIN
} from '../../Constants/routes';
import RootWindow from "./Window/RootWindow";
import FirebaseStartup from "./Firebase/FirebaseStartup";
import Startup from "./Startup/Startup";
import BasicLoading from "./Loading/BasicLoading";
import {RootOverlays} from "react-root-overlays";

const MainScreen = lazy(() => import('./Main/MainScreen'));
const NotFound = lazy(() => import('./NotFound/NotFound'));

/**
 * Top-Level Component for the App.
 */
const Root = () => {
  const landing = <MainScreen/>;

  return (
    <div className={s.root}>
      <RootWindow/>
      <FirebaseStartup/>
      <Startup>
        <RootOverlays>
          <BrowserRouter>
            <Suspense fallback={<BasicLoading/>}>
              <Switch>
                <Route exact path={ROUTE_LANDING}>{landing}</Route>
                <Route exact path={ROUTE_INDEX}>{landing}</Route>
                <Route path={ROUTE_MAIN}><MainScreen/></Route>
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
