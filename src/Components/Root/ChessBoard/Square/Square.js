import s from './Square.module.css';
import { useMemo} from "react";

const Square = props => {
  const {col, row} = props;

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
    return style;
  }, [color]);

  return <div className={s.outer} style={style}/> ;
}

export default Square;
