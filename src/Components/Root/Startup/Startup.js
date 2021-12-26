import StartupModule from "./Module/StartupModule";
import {withModule} from "react-hoc-di";

/**
 * Injects the startup module.
 */
const Startup = props => {
  return (
    <>
      {props.children}
    </>
  );
}

export default withModule(Startup, StartupModule);
