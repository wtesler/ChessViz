import s from './ChessBoard.module.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

/**
 * Constructs a square of squares.
 */
const ChessBoard = () => {
  /**
   * How long is one side of the chessboard (in pixels).
   */
  const [length, setLength] = useState(-1);

  /**
   * Reference to this components outer-most element.
   */
  const outerRef = useRef();

  /**
   * Length is the min of the parent's supplied dimensions (Thus creating a square).
   */
  const onResize = useCallback(() => {
    const outerEl = outerRef.current;
    const width = outerEl.offsetWidth;
    const height = outerEl.offsetHeight;
    const length = Math.min(width, height);
    setLength(length);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, [onResize]);

  const squaresElement = useMemo(() => {
    const squares = [];

    for (let i = 0; i < 8; i++) {
      const columns = [];

      for (let j = 0; j < 8; j++) {
        const isEvenRow = i % 2 === 0;
        const isEvenCol = j % 2 === 0;
        let colorClass = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)
            ? s.square_white
            : s.square_black;

        const square = (
          <div className={`${s.square} ${colorClass}`} key={`${i},${j}`}/>
        );

        columns.push(square);
      }
      squares.push(columns);
    }
    return (
      <div className={s.squares} style={{width: length, height: length}}>
        {squares}
      </div>
    )
  }, [length]);

  return (
    <div className={s.outer} ref={outerRef}>
      {squaresElement}
    </div>
  );
}

export default ChessBoard;
