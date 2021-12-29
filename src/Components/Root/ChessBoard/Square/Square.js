import s from './Square.module.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import {withModule} from "react-hoc-di";
import Piece from "../Piece/Piece";

const Square = props => {
  const {col, row, module} = props;
  const {gameManager} = module;

  const [squareState, setSquareState] = useState();

  const onBoardStateUpdate = useCallback(boardState => {
    setSquareState(boardState[col][row]);
  }, [col, row]);

  useEffect(() => {
    gameManager.addListener(onBoardStateUpdate);
    return () => {
      gameManager.removeListener(onBoardStateUpdate);
    };
  }, [gameManager, onBoardStateUpdate])

  const defaultColor = useMemo(() => {
    const evenX = col % 2 === 0;
    const evenY = row % 2 === 0;
    let colorString = (evenX && evenY) || (!evenX && !evenY)
      ? "#bdbdbd"
      : "#f1f1f1";

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
    if (!squareState) {
      return;
    }

    const piece = squareState.piece;
    if (!piece) {
      return null;
    }
    return <Piece piece={piece}/>
  }, [squareState]);

  return (
    <div className={s.outer} style={style}>
      {pieceElement}
    </div>
  );
}

export default withModule(Square);
