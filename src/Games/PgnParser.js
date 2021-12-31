import {BLACK, WHITE} from "../Constants/players";

export default class PgnParser {

  /**
   * Parses the pgn string inside each game and sets it back onto the game object as a parsed pgn field.
   *
   * @param games A list of game objects. They should each have a pgn field with string pgn.
   */
  static parseGames(games) {
    const parsedPgns = [];
    for (const game of games) {
      const pgn = game.pgn;
      const splitPgn = pgn.split('\n');

      const parsedPgn = {
        meta: {},
        moves: []
      };

      // Metadata loop
      for (let line of splitPgn) {
        if (!line || line.length === 0 || line[0] !== '[') {
          break;
        }
        line = line.replace('[', '').replace(']', '');
        const splitLine = line.split(' ');
        const key = splitLine[0];
        const value = splitLine.slice(1, splitLine.length).join(' ').replaceAll('"', '');
        parsedPgn.meta[key] = value;
      }

      let movesLine;
      for (let i = splitPgn.length - 1; i >= 0; i--) {
        const line = splitPgn[i];
        if (line !== '' && line !== '\n' && line !== '\r') {
          movesLine = line;
          break;
        }
      }

      let timeStamps = movesLine.match(/{(.*?)}/g);
      timeStamps = timeStamps.map(s => s.replaceAll('{[%clk ', ''));
      timeStamps = timeStamps.map(s => s.replaceAll(']}', ''));

      movesLine = movesLine.replaceAll(/{(.*?)}/g, '');
      movesLine = movesLine.replaceAll('.', '');
      let movesList = movesLine.split(' ');
      movesList.pop(); //the last value is result not a move.
      movesList = movesList.filter(m => m); //removes empty strings right side of arrow is bool check. removes all false on list.
      for (let i = 0; i < movesList.length; i += 2) { // Note i increments by 2.
        const number = Number(movesList[i]);
        const notation = movesList[i + 1];

        // Strip out certain characters from the notation to make the task simpler later.
        let strippedNotation = notation.replaceAll('x', ''); // Don't care about captures. (Maybe...)
        strippedNotation = strippedNotation.replaceAll('+', ''); // Don't care about checks. (Maybe...)
        strippedNotation = strippedNotation.replaceAll('#', ''); // Don't care about checkmate. (Maybe...)

        const move = {
          number: number,
          notation: notation,
          strippedNotation: strippedNotation,
          player: parsedPgn.moves.length % 2 === 0 ? WHITE : BLACK,
          timeStamp: timeStamps[i / 2]
        };
        parsedPgn.moves.push(move);
      }
      parsedPgns.push(parsedPgn);
    }
    return parsedPgns;
  }
}