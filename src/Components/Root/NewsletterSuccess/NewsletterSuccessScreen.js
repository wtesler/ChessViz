import s from './NewsletterSuccessScreen.module.css';
import React from "react";
import ThemedBackground from "../Theme/Background/ThemedBackground";
import Footer from "../Footer/Footer";
import NewsletterSuccessContent from "./Content/NewsletterSuccessContent";
import NewsletterSuccessNavBar from "./NavBar/NewsletterSuccessNavBar";

const NewsletterSuccessScreen = () => {
  return (
    <div className={s.main}>
      <ThemedBackground/>
      <NewsletterSuccessNavBar/>
      <NewsletterSuccessContent/>
      <Footer/>
    </div>
  );
}

export default NewsletterSuccessScreen;
