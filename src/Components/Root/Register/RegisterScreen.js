import s from './RegisterScreen.module.css';
import React from "react";
import RegisterNavBar from "./NavBar/RegisterNavBar";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import RegisterContent from "./Content/RegisterContent";

const RegisterScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <RegisterNavBar/>
      <RegisterContent/>
      <Footer/>
    </div>
  );
}

export default RegisterScreen;
