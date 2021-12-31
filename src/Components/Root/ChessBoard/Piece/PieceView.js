import s from './PieceView.module.css';
import {useMemo} from "react";
import {withModule} from "react-hoc-di";
import {Icon} from "react-basic-icon";
import pawn_white from "../../../../Images/pawn_white.svg";
import pawn_black from "../../../../Images/pawn_black.svg";
import rook_white from "../../../../Images/rook_white.svg";
import rook_black from "../../../../Images/rook_black.svg";
import knight_white from "../../../../Images/knight_white.svg";
import knight_black from "../../../../Images/knight_black.svg";
import bishop_white from "../../../../Images/bishop_white.svg";
import bishop_black from "../../../../Images/bishop_black.svg";
import queen_white from "../../../../Images/queen_white.svg";
import queen_black from "../../../../Images/queen_black.svg";
import king_white from "../../../../Images/king_white.svg";
import king_black from "../../../../Images/king_black.svg";

const PieceView = props => {
  const {piece} = props;

  const image = useMemo(() => {
    const imageMap = {
      pawn: {
        white: pawn_white,
        black: pawn_black,
      },
      rook: {
        white: rook_white,
        black: rook_black,
      },
      knight: {
        white: knight_white,
        black: knight_black,
      },
      bishop: {
        white: bishop_white,
        black: bishop_black,
      },
      queen: {
        white: queen_white,
        black: queen_black,
      },
      king: {
        white: king_white,
        black: king_black,
      }
    }

    return imageMap[piece.type][piece.player];
  }, [piece]);

  const content = useMemo(() => {
    return (
      <div className={s.outer}>
        <Icon className={s.image} src={image}/>
      </div>
    )
  }, [image]);

  return content;
}

export default withModule(PieceView);
