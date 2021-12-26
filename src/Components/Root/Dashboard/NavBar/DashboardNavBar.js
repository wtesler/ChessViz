// import s from './DashboardNavBar.module.css';
import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";
import NavLogout from "../../NavBar/Logout/NavLogout";

const DashboardNavBar = () => {
  return (
    <NavFrame>
      <NavHamburger/>
      <NavTitle dark/>
      <NavLogout/>
    </NavFrame>
  );
}

export default DashboardNavBar;
