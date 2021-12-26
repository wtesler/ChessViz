import s from './ChessBoard.module.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const ChessBoard = () => {
  const [length, setLength] = useState(-1);

  const outerRef = useRef();

  const onResize = useCallback(() => {
    const outerEl = outerRef.current;
    const width = outerEl.offsetWidth;
    const height = outerEl.offsetHeight;
    const length = Math.min(width, height);
    setLength(length);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, [onResize]);

  useEffect(() => {
    onResize();
  }, [outerRef, onResize]);

  const inner = useMemo(() => {
    const columns = [];
    for (let i = 0; i < 8; i++) {
      const rows = [];
      for (let j = 0; j < 8; j++) {
        const isEvenRow = i % 2 === 0;
        const isEvenCol = j % 2 === 0;
        let colorClass =
          (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)
            ? s.square_white
            : s.square_black;

        const square = (
          <div className={`${s.square} ${colorClass}`} key={`${i},${j}`}/>
        );
        rows.push(square);
      }
      columns.push(rows);
    }
    return (
      <div className={s.inner} style={{width: length, height: length}}>
        {columns}
      </div>
    )
  }, [length]);

  return (
    <div className={s.outer} ref={outerRef}>
      {inner}
    </div>
  );
}

export default ChessBoard;
