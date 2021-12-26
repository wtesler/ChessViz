import s from './ThemedButton.module.css';

const ThemedButton = props => {
  return (
    <div
      id={props.id ? props.id : ''}
      className={`${s.main} ${props.className ? props.className : ''}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default ThemedButton;
