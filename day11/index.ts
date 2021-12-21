type Position = {
  col: number;
  row: number;
};

type BoardInfo = {
  flashed: Position[];
  board: number[][];
};

const getInfo = ({ row, col }: Position, table: number[][]) => {
  const isTop = row === 0;
  const isBottom = row === table.length - 1;
  const isLeft = col === 0;
  const isRight = col === table[0].length - 1;

  return {
    isTop,
    isBottom,
    isRight,
    isLeft,
  };
};
export const getPoints = (point: Position, table: number[][]): Position[] => {
  const {
    isTop,
    isBottom,
    isRight,
    isLeft,
  } = getInfo(point, table);
  const topLeft: Position = {
    col: isLeft ? point.col : point.col - 1,
    row: isTop ? point.row : point.row - 1,
  };
  const bottomLeft: Position = {
    col: isLeft ? point.col : point.col - 1,
    row: isBottom ? point.row : point.row + 1,
  };
  const topRight: Position = {
    col: isRight ? point.col : point.col + 1,
    row: isTop ? point.row : point.row - 1,
  };

  const points: Position[] = [];
  for (let r = topLeft.row; r <= bottomLeft.row; r++) {
    for (let c = topLeft.col; c <= topRight.col; c++) {
      points.push({
        col: c,
        row: r,
      });
    }
  }
  return points;
};

const stepIncrease = (board: number[][]) => {
  return board.map((row) =>
    row.map((v) => {
      return v + 1;
    })
  );
};

export const hasFlashed = (position: Position, flashed: Position[]) => {
  return flashed.some((val) => {
    return val.col === position.col && val.row === position.row;
  });
};

const findNextFlash = (
  board: number[][],
  flashed: Position[],
): Position | null => {
  let next: Position | null = null;
  board.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      if (next !== null) return;
      const candidate: Position = {
        row: rIdx,
        col: cIdx,
      };

      if (col === 9 && !hasFlashed(candidate, flashed)) {
        next = candidate;
      }
    });
  });
  return next;
};

export const runFlash = (point: Position, board: number[][]): number[][] => {
  const points = getPoints(point, board);
  points.forEach(({
    row,
    col,
  }) => {
    board[row][col] = board[row][col] + 1;
  });
  board[point.row][point.col] = 0;
  return board;
};

export const step = (
  board: number[][] = [],
  flashed: Position[] = [],
): BoardInfo => {
  let nextBoard = stepIncrease(board);
  const flashes = []
  while (findNextFlash(nextBoard, flashed) !== null) {
    // find next flash
    const next = findNextFlash(nextBoard, flashed);

    // run flash
    nextBoard = runFlash(next!, nextBoard);

    // add flashed
    flashed.push(next!);
  }
  return {
    board: nextBoard,
    flashed,
  };
};

const steps = (startBoard: number[][] = [], steps: number) => {
  let nextBoard = startBoard;
  let count = 0;
  for (let i = 0; i <= steps; i++) {
    const {
      board,
      flashed,
    } = step(nextBoard);
    count = count + flashed.length;
    nextBoard = board;
  }
  return count;
};

// const testData = [
//   [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
//   [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
//   [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
//   [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
//   [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
//   [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
//   [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
//   [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
//   [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
//   [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
// ];
// console.log(steps(testData, 100));

// const simpleData = [
//   [1, 1, 1, 1, 1],
//   [1, 9, 9, 9, 1],
//   [1, 9, 1, 9, 1],
//   [1, 9, 9, 9, 1],
//   [1, 1, 1, 1, 1],
// ];
// console.log(step(simpleData));
