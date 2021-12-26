import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";

const SurveyEditNavBar = () => {
  return (
    <NavFrame>
      <NavHamburger/>
      <NavTitle dark/>
    </NavFrame>
  );
}

export default SurveyEditNavBar;
