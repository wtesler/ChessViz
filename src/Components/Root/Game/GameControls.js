import s from './GameControls.module.css';
import {useCallback} from "react";
import {withModule} from "react-hoc-di";

const GameControls = props => {
  const {module} = props;
  const {gameManager} = module;

  const onClick = useCallback(() => {
    gameManager.step();
  }, [gameManager]);

  return <button className={s.outer} onClick={onClick}>STEP</button>
}

export default withModule(GameControls)
