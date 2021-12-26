// import s from './RegisterNavBar.module.css';
import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavLogout from "../../NavBar/Logout/NavLogout";

const RegisterNavBar = () => {
  return (
    <NavFrame>
      <NavTitle dark/>
      <NavLogout/>
    </NavFrame>
  );
}

export default RegisterNavBar;
