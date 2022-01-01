import AbstractPieceMover from "./AbstractPieceMover";
import {toArrayCoordinates, toChessCoordinates} from "../Coordinates/CoordinateMaps";
import {BISHOP} from "../../Constants/pieces";

export default class BishopMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const secondChar = notation[1];
    const thirdChar = notation[2];
    const fourthChar = notation[3];

    // Can either be a rank or file specifier.
    const hasExtraSpecifier = notation.length === 4;

    let targetCol, targetRow;
    if (hasExtraSpecifier) {
      [targetCol, targetRow] = toArrayCoordinates(thirdChar, fourthChar);
    } else {
      [targetCol, targetRow] = toArrayCoordinates(secondChar, thirdChar);
    }

    const targetSquare = board[targetCol][targetRow];

    const bishopSquareInfos = this.discoverBishopsAlongDiagonal(board, targetCol, targetRow);

    if (bishopSquareInfos.length === 0) {
      throw new Error("Did not discover a bishop. Is the PGN correct?");
    }

    let currentSquare;
    if (hasExtraSpecifier) {
      const specifier = secondChar;
      for (const squareInfo of bishopSquareInfos) { // Choose the bishop which satisfys the specifier.
        const square = squareInfo[0];
        const col = squareInfo[1];
        const row = squareInfo[2];
        if (col === specifier || row === specifier) {
          currentSquare = square;
          break;
        }
      }
      if (!currentSquare) {
        throw new Error("Notation had extra specifier but no bishop found which satisfies it.");
      }
    } else {
      currentSquare = bishopSquareInfos[0][0];
    }

    super.movePiece(currentSquare, targetSquare);
  }

  /**
   * Explore along the diagonals starting at the target square.
   * May return multiple bishops in which case the extra specifier will be used to choose one.
   * The return values are lists like [square, col, row].
   */
  discoverBishopsAlongDiagonal(board, targetCol, targetRow) {
    const bishopInfos = [];
    this.discoverBishopsAlongDiagonalHelper(board, targetCol, targetRow, 1, 1, bishopInfos);
    this.discoverBishopsAlongDiagonalHelper(board, targetCol, targetRow, 1, -1, bishopInfos);
    this.discoverBishopsAlongDiagonalHelper(board, targetCol, targetRow, -1, 1, bishopInfos);
    this.discoverBishopsAlongDiagonalHelper(board, targetCol, targetRow, -1, -1, bishopInfos);
    return bishopInfos;
  }

  /**
   * Moves diagonally and then checks for a bishop. If found, adds the bishop square as well as col, row.
   */
  discoverBishopsAlongDiagonalHelper(board, curCol, curRow, directionCol, directionRow, bishopSquares) {
    const newCol = curCol + directionCol;
    const newRow = curRow + directionRow;
    if (newCol < 0 || newCol >= 8) {
      return;
    }
    if (newRow < 0 || newRow >= 8) {
      return;
    }

    const chessCoords = toChessCoordinates(newCol, newRow);

    super.log(`Checking for bishop on ${chessCoords}.`);

    const square = board[newCol][newRow];
    const piece = square.getPiece();
    if (piece) {
      if (piece.getType() === BISHOP) {
        super.log(`Found bishop on ${chessCoords}.`);
        bishopSquares.push([square, newCol, newRow]);
      } else {
        return;
      }
    }

    this.discoverBishopsAlongDiagonalHelper(board, newCol, newRow, directionCol, directionRow, bishopSquares);
  }
}
