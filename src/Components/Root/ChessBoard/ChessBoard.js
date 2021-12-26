import s from './ChessBoard.module.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const ChessBoard = () => {
    const [length, setLength] = useState(-1);

    const outerRef = useRef();

    const onResize = useCallback(() => {
        const outerEl = outerRef.current;
        const width = outerEl.offsetWidth;
        const height = window.innerHeight;
        const length = Math.min(width, height);
        setLength(length);
    }, []);

    const inner = useMemo(() => {
        const columns = [];
        for (let i = 0; i < 8; i++) {
            const rows = [];
            for (let j = 0; j < 8; j++) {
                let colorClass =
                    (i % 2 === 1 && j % 2 === 0)
                    || (i % 2 === 0 && j % 2 === 1)
                        ? s.square_black
                        : s.square_white;

                // if (i % 2 === 0) {
                //     if (j % 2 === 0) {
                //         colorClass = s.square_white;
                //     } else {
                //         colorClass = s.square_black;
                //     }
                // }else {
                //     if (j % 2 === 1) {
                //         colorClass = s.square_white;
                //     } else {
                //         colorClass = s.square_black;
                //     }
                // }
                const square = (
                    <div className={`${s.square} ${colorClass}`}/>
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

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [onResize]);

    useEffect(() => {
        onResize();
    }, [outerRef, onResize]);

    return (
        <div className={s.outer} ref={outerRef}>
            {inner}
        </div>
    );
}

export default ChessBoard;
