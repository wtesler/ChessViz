import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";

const OrgsNavBar = () => {
  return (
    <NavFrame>
      <NavHamburger/>
      <NavTitle dark/>
    </NavFrame>
  );
}

export default OrgsNavBar;
