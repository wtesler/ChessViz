import s from './RegisterContent.module.css';
import {Link} from "react-router-dom";
import {ROUTE_PROFILE} from "../../../../Constants/routes";

const RegisterContent = () => {
  return (
    <div className={s.outer}>
      <div className={s.inner}>
        <div className={s.text}>
          {"Thank you for registering with Mivie"}
        </div>
        <div className={s.text2}>
          {"Add your name to your profile to complete registration"}
        </div>
        <Link to={ROUTE_PROFILE} className={s.button} >
          {"Profile"}
        </Link>
      </div>
    </div>
  );
}

export default RegisterContent;
