import s from './Piece.module.css';
import {useMemo} from "react";
import {withModule} from "react-hoc-di";

const Piece = props => {
  const {piece} = props;

  const content = useMemo(() => {
    if (piece === 'pawn') {
      return <div className={s.pawn}/>
    } else {
      return null;
    }
  }, [piece]);

  return content;
}

export default withModule(Piece);
