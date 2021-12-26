import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";

const SurveyQuestionNavBar = () => {
  return (
    <NavFrame fixed>
      <NavHamburger/>
      <NavTitle dark/>
    </NavFrame>
  );
}

export default SurveyQuestionNavBar;
