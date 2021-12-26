import {useCallback, useEffect, useMemo, useState} from "react";
import React from 'react';
import {withModule} from 'react-hoc-di';

/**
 * Hides the component if the user does not satisfy the given role.
 */
export default function withRole(WrappedComponent, roles=[]) {
  return withModule(props => {
    const {module} = props;
    const {loginManager} = module;

    if (!roles) {
      roles = [];
    }

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    const [shouldShow, setShouldShow] = useState(roles.length === 0);

    const determineViewState = useCallback(async() => {
      await loginManager.awaitUser();
      let shouldShow = roles.length === 0;
      for (const role of roles) {
        if (loginManager.claims[role]) {
          shouldShow = true;
          break;
        }
      }
      setShouldShow(shouldShow);
    }, [loginManager]);

    useEffect(() => {
      determineViewState();
    }, [determineViewState])

    return useMemo(() => {
      if (!shouldShow) {
        return null;
      }
      return <WrappedComponent {...props}/>;
    }, [props, shouldShow]);
  });
}
