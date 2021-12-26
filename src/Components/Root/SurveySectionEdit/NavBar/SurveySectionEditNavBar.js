import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";
import s from "./SurveySectionEditNavBar.module.css";

const SurveySectionEditNavBar = () => {
  return (
    <NavFrame fixed className={s.frame}>
      <NavHamburger/>
      <NavTitle dark/>
    </NavFrame>
  );
}

export default SurveySectionEditNavBar;
