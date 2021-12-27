import React from "react";
import { Requests } from "./Requests";
import { Subscription } from "rxjs";

/**
 * Supplies an rx `subscription` which is unsubscribed when the component is unmounted.
 *
 * Supplies a `requests` object which aborts superagent requests when unmounted.
 *
 * Useful for managing the lifecycle between mount/unmount events.
 *
 * It is passed as `props.subscription` and `props.requests`.
 * It is used like `props.subscription.add(<observable>)` or `props.requests.add(request)`.
 */
export default function withSubscription(WrappedComponent) {
  return class extends React.Component {
    state = {};

    constructor(props) {
      super(props);
      const subscription = new Subscription();
      const requests = new Requests();
      this.state.subscription = subscription;
      this.state.requests = requests;
    }

    componentWillUnmount() {
      this.state.subscription.unsubscribe();
      this.state.requests.abort();
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
