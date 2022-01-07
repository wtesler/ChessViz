import s from './AttentionBar.module.css';
import {useCallback, useEffect, useState} from "react";
import {withModule} from "react-hoc-di";
import {BLACK, WHITE} from "../../../Constants/players";

const AttentionBar = props => {
    const {module} = props;
    const {gameManager} = module;

    const [whitePercentage, setWhitePercentage] = useState(); //allows you to now use this else within component

    const onBoardUpdate = useCallback(board => {
      let whiteAttention = 0;
      let blackAttention = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          whiteAttention += board[i][j].attention[WHITE];
          blackAttention += board[i][j].attention[BLACK];
        }
      }
      let totalAttention = blackAttention + whiteAttention;
      setWhitePercentage((whiteAttention/totalAttention)*100);
    }, []);

    /**
     * Listen for any changes in the board.
     */
    useEffect(() => {
      gameManager.addListener(onBoardUpdate);
      return () => {
        gameManager.removeListener(onBoardUpdate);
      };
    }, [gameManager, onBoardUpdate]);

  return (
      <div className={s.outer}>
        <div className={s.white_attn} style={{width:`${whitePercentage}%`}}/>
        <div className={s.black_attn} style={{width:`${100 - whitePercentage}%`}}/>
      </div>
    );
  }

  export default withModule(AttentionBar);

