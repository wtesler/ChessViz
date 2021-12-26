// import s from './SpreadsheetNavBar.module.css';
import NavTitle from "../../NavBar/Title/NavTitle";
import NavFrame from "../../NavBar/Frame/NavFrame";
import NavHamburger from "../../NavBar/Hamburger/NavHamburger";
import NavSave from "../../NavBar/Save/NavSave";

const SpreadsheetNavBar = () => {
  return (
    <NavFrame>
      <NavHamburger/>
      <NavTitle dark/>
      <NavSave/>
    </NavFrame>
  );
}

export default SpreadsheetNavBar;
