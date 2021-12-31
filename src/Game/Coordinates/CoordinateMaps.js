/**
 * Maps Chess Coordinate Notation to proper indices.
 */

export const COLUMN_MAP = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7,
}

export const ROW_MAP = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
}

export const COLUMN_MAP_INVERSE = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
}

export const ROW_MAP_INVERSE = {
  0: '1',
  1: '2',
  2: '3',
  3: '4',
  4: '5',
  5: '6',
  6: '7',
  7: '8',
}

export const toArrayCoordinates = (rank, file) => {
  return [COLUMN_MAP[rank], ROW_MAP[file]];
}

export const toChessCoordinates = (col, row) => {
  return `${COLUMN_MAP_INVERSE[col]}${ROW_MAP_INVERSE[row]}`
}
