import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavLogout from "../../NavBar/Logout/NavLogout";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";

const WorkersNavBar = () => {
  return (
    <NavFrame fixed>
      <NavHamburger/>
      <NavTitle dark/>
      <NavLogout/>
    </NavFrame>
  );
}

export default WorkersNavBar;
