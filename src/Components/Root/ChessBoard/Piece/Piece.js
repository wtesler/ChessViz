import s from './Piece.module.css';
import {useMemo} from "react";
import {withModule} from "react-hoc-di";

const Piece = props => {
  const {piece} = props;

  const content = useMemo(() => {
    let className = '';
    switch (piece) {
      case 'pawn':
        className = s.pawn;
        break;
      default:
        break;
    }
    return <div className={className}/>
  }, [piece]);

  return content;
}

export default withModule(Piece);
