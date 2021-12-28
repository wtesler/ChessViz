import s from './ChessBoard.module.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Square from "./Square/Square";

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

  /**
   * Create a 2D List of Squares.
   */
  const squaresElement = useMemo(() => {
    const squares = [];
    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        const key = `${c},${r}`;
        const square = <Square col={c} row={r} key={key} />
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
