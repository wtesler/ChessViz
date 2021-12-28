import s from './Piece.module.css';
import { useMemo} from "react";
import {withModule} from "react-hoc-di";

const Piece = props => {
  const {col, row, module} = props;
  const {gameManager} = module;

  const content = useMemo(() => {
    const squareState = gameManager.getSquareState(col, row);
    if (squareState.piece === 'pawn') {
      return <div className={s.pawn}/>
    } else {
      return null;
    }
  }, [col, row, gameManager]);

  return content;
}

export default withModule(Piece);
