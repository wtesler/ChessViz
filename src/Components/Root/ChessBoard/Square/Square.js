import s from './Square.module.css';
import {useMemo} from "react";
import {withModule} from "react-hoc-di";
import Piece from "../Piece/Piece";

const Square = props => {
  const {col, row, module} = props;
  const {gameManager} = module;

  const defaultColor = useMemo(() => {
    const evenX = col % 2 === 0;
    const evenY = row % 2 === 0;
    let colorString = (evenX && evenY) || (!evenX && !evenY)
      ? "#000000"
      : "#FFFFFF";

    return colorString;
  }, [col, row]);

  const color = useMemo(() => {
    return defaultColor;
  }, [defaultColor]);

  const style = useMemo(() => {
    const s = {};
    s.backgroundColor = color;
    return s;
  }, [color]);

  const pieceElement = useMemo(() => {
    const squareState = gameManager.getSquareState(col, row);
    const piece = squareState.piece;
    if (!piece) {
      return null;
    }
    return <Piece piece={piece}/>
  }, [col, row, gameManager]);

  return (
    <div className={s.outer} style={style}>
      {pieceElement}
    </div>
  );
}

export default withModule(Square);
