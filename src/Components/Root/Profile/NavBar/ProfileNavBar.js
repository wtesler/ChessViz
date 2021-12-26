// import s from './ProfileNavBar.module.css';
import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";
// import NavSave from "../../NavBar/Save/NavSave";
import NavLogout from "../../NavBar/Logout/NavLogout";

const ProfileNavBar = () => {
  return (
    <NavFrame fixed>
      <NavHamburger/>
      <NavTitle dark/>
      <NavLogout/>
    </NavFrame>
  );
}

export default ProfileNavBar;
