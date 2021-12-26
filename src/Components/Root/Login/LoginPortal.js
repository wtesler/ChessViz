import {useCallback, useEffect, useMemo, useState} from "react";
import {withRouter} from "react-router-dom";
import {withModule} from "react-hoc-di";
import LoginScreen from "./Screen/LoginScreen";
import LoginModule from "./Module/LoginModule";

const LoginPortal = props => {
  const {children, isLoginRequired, module} = props;
  const {loginManager} = module;

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const onUser = useCallback(user => {
    module.user = user;
    setIsLoggedIn(Boolean(user));
  }, [module]);

  useEffect(() => {
    loginManager.addListener(onUser);
    return () => {
      loginManager.removeListener(onUser);
      module.user = undefined;
    }
  }, [loginManager, onUser, module]);

  const content = useMemo(() => {
    if (isLoggedIn === undefined) {
      // Special condition to handle state before login manager has emit.
      return null;
    }
    return isLoggedIn || !isLoginRequired ? children : <LoginScreen/>;
  }, [isLoggedIn, isLoginRequired, children]);

  return (
    <>
      {content}
    </>
  );
}

export default withRouter(withModule(LoginPortal, LoginModule));
