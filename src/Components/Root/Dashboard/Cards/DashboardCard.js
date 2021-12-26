import s from './DashboardCard.module.css';

const DashboardCard = props => {
  const {children} = props;

  return (
    <div className={s.outer}>
      {children}
    </div>
  );
}

export default DashboardCard;
