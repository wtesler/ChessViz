import s from './SquareView.module.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import {withModule} from "react-hoc-di";
import PieceView from "../Piece/PieceView";

const SquareView = props => {
  const {col, row, module} = props;
  const {gameManager} = module;

  const [piece, setPiece] = useState();

  /**
   * Sets the piece for this square. May be null.
   */
  const onBoardUpdate = useCallback(board => {
    const square = board[col][row];
    setPiece(square.piece);
  }, [col, row]);

  /**
   * Listen for any changes in the board.
   */
  useEffect(() => {
    gameManager.addListener(onBoardUpdate);
    return () => {
      gameManager.removeListener(onBoardUpdate);
    };
  }, [gameManager, onBoardUpdate]);

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
    if (!piece) {
      return null;
    }
    return <PieceView piece={piece}/>
  }, [piece]);

  return (
    <div className={s.outer} style={style}>
      {pieceElement}
    </div>
  );
}

export default withModule(SquareView);
