export async function parseData(
  path: string,
  findFunc: (x: number[], y: number[][][]) => number,
) {
  const text = await Deno.readTextFile(path);

  const [input, ...boards] = text.split("\n");
  const numbers = input.split(",").map(parseFloat);
  const parsed = parseBoards(boards);
  return findFunc(numbers, parsed);
}

export function parseBoards(boards: string[]): number[][][] {
  const parsed: number[][][] = [];
  let board: number[][] = [];

  for (let i = 0; i < boards.length; i++) {
    if (boards[i] === "") {
      if (board.length) {
        parsed.push(board);
      }
      board = [];
    } else if (i === boards.length - 1) {
      const row = boards[i].split(" ").map(parseFloat).filter((b) => !isNaN(b));
      board.push(row);
      parsed.push(board);
    } else {
      const row = boards[i].split(" ").map(parseFloat).filter((b) => !isNaN(b));
      if (row.length) {
        board.push(row);
      }
    }
  }

  return parsed;
}

function sumArray(arr: number[]): number {
  return arr.reduce((pv, cv) => {
    return pv + cv;
  }, 0);
}

export function winner(winners: number[], rows: number[][]): number {
  const summed = rows.reduce((sum, row) => {
    const filtered = row.filter((num) => {
      return winners.indexOf(num) === -1;
    });
    return sum + sumArray(filtered);
  }, 0);
  const last = winners[winners.length - 1];

  return summed * last;
}

export function isColWinner(board: number[][], winners: number[]): boolean {
  if (board.length === 0) return false;
  for (let col = 0; col < board[0].length; col++) {
    let isWin = true;
    for (let row = 0; row < board.length; row++) {
      if (winners.indexOf(board[row][col]) === -1) {
        isWin = false;
      }
    }
    if (isWin) return true;
  }
  return false;
}

export function isRowWinner(board: number[][], winners: number[]): boolean {
  let isWinner = false;
  for (const row of board) {
    if (!isWinner) {
      isWinner = row.every(
        (num) => {
          return winners.indexOf(num) !== -1;
        },
      );
    }
  }
  return isWinner;
}

export const findWinningBoard = (
  numbers: number[],
  boards: number[][][],
): number => {
  for (let idx = 0; idx < numbers.length; idx++) {
    const winners = numbers.slice(0, idx + 1);
    for (let b = 0; b < boards.length; b++) {
      if (isRowWinner(boards[b], winners) || isColWinner(boards[b], winners)) {
        return winner(winners, boards[b]);
      }
    }
  }
  throw new Error("no winners");
};

export const findLastWinningBoardIndex = (
  numbers: number[],
  boards: number[][][],
): number => {
  let highestIndex: number | undefined = undefined;
  let winningNumbers: number[] | undefined = undefined;
  let wonBoards = new Map();
  for (let idx = 0; idx < numbers.length; idx++) {
    const winners = numbers.slice(0, idx + 1);
    for (let b = 0; b < boards.length; b++) {
      if (isRowWinner(boards[b], winners) || isColWinner(boards[b], winners)) {
        if (!wonBoards.has(b)) {
          wonBoards.set(b, true);
          highestIndex = b;
          winningNumbers = [...winners];
        }
      }
    }
  }
  if (highestIndex === undefined || winningNumbers === undefined) {
    throw new Error("no winners");
  }
  return winner(winningNumbers, boards[highestIndex]);
};

console.log("=== part 1 ===");
console.log(await parseData("./input.txt", findWinningBoard));
console.log("===");

console.log("=== part 2 ===");
console.log(await parseData("./input.txt", findLastWinningBoardIndex));
console.log("===");
