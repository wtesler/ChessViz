import s from './SquareView.module.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import {withModule} from "react-hoc-di";
import PieceView from "../Piece/PieceView";
import {COLUMN_MAP_INVERSE, ROW_MAP_INVERSE} from "../../../../Game/Coordinates/CoordinateMaps";
import {BLACK, WHITE} from "../../../../Constants/players";

const SquareView = props => {
  const {col, row, module} = props;
  const {gameManager} = module;

  const [piece, setPiece] = useState();
  const [whiteAttention, setWhiteAttention] = useState();
  const [blackAttention, setBlackAttention] = useState();
  const [isHighlightedSquare, setIsHighlightedSquare] = useState();

  /**
   * Sets the piece for this square. May be null.
   */
  const onBoardUpdate = useCallback(board => {
    const square = board[col][row];
    setPiece(square.piece);
    setWhiteAttention(square.attention[WHITE]);
    setBlackAttention(square.attention[BLACK]);
    setIsHighlightedSquare(square.getIsHighlightedSquare());
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
    // if(isHighlightedSquare){
    //   return '#ffe73d';
    // }

    const lerp = (a, b, t) => {
      return a * (1 - t) + b * t;
    }

    if (whiteAttention === 0 && blackAttention === 0) {
      return defaultColor;
    }

    let r = 255;
    let g = 255;
    let b = 255;

    const whiteVal = lerp(0, 255, whiteAttention);
    const blackVal = lerp(0, 255, blackAttention);

    g -= whiteVal;
    b -= whiteVal;

    r -= blackVal;
    g -= blackVal;

    return `rgb(${r}, ${g}, ${b})`;

  }, [defaultColor, whiteAttention, blackAttention]);

  const border = useMemo(() => {
    const l = 0;
    const b = 11;
    const s = 1;
    const c = '#f4ff41';
    const boxShadow = `inset ${l}px ${l}px ${b}px ${s}px ${c}, inset ${-l}px ${-l}px ${b}px ${s}px ${c}`;
    return isHighlightedSquare ? boxShadow : null;
  }, [isHighlightedSquare]);

  const style = useMemo(() => {
    const s = {};
    s.backgroundColor = color;
    if (border) {
      s.boxShadow = border;
    }
    return s;
  }, [color, border]);

  const pieceElement = useMemo(() => {
    if (!piece) {
      return null;
    }
    return <PieceView piece={piece}/>
  }, [piece]);

  const rankElement = useMemo(() => {
    if (col > 0) {
      return;
    }
    const rank = ROW_MAP_INVERSE[row];
    return (
      <div className={`${s.rank} ${s.index}`}>
        {rank}
      </div>
    )
  }, [row, col]);

  const fileElement = useMemo(() => {
    if (row > 0) {
      return;
    }
    const file = COLUMN_MAP_INVERSE[col];
    return (
      <div className={`${s.file} ${s.index}`}>
        {file}
      </div>
    )
  }, [row, col]);

  return (
    <div className={s.outer} style={style}>
      {pieceElement}
      {rankElement}
      {fileElement}
    </div>
  );
}

export default withModule(SquareView);
