import s from './LoginScreen.module.css';
import {withRouter} from "react-router-dom";
import LoginNavBar from "./NavBar/LoginNavBar";
import {withModule} from "react-hoc-di";
import LoginScreenBody from "./Body/LoginScreenBody";
import ThemedBackground from "../../Theme/Background/ThemedBackground";
import Footer from "../../Footer/Footer";

const LoginScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <LoginNavBar/>
      <div className={s.bodyContainer}>
        <LoginScreenBody/>
      </div>
      <Footer/>
    </div>
  );
}

export default withRouter(withModule(LoginScreen));
