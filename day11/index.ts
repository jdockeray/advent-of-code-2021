type Position = {
  x: number;
  y: number;
};

export async function parseData(path = "input.txt"): Promise<number[][]> {
    return await (await Deno.readTextFile(path)).split("\n").map((s) =>
      s.split("").map(
        parseFloat,
      )
    ).filter((r) => r.length);
  }

export const inRange = (left: Position, right: Position) =>
  Math.abs(left.x - right.x) <= 1 && Math.abs(left.y - right.y) <= 1;

const octoFlash = (flashes: Position[] = [], board: number[][]): number[][] => {
  if (flashes.length === 0) return board;

  const flash = flashes.shift()!; // unqueue
  if (board[flash.y][flash.x] === 0) { // you have already flashed this one
    return octoFlash(flashes, board);
  }
  board.forEach((row, ridx) => {
    row.forEach((col, cidx) => {
      const point = {
        x: cidx,
        y: ridx,
      };
      if (inRange(flash, point) && col !== 0) {
          const next = board[ridx][cidx] + 1;
        if (next === 10) {
          flashes.push({
            x: cidx,
            y: ridx,
          });
        }
        board[ridx][cidx] = next
      }
    });
  });
  board[flash.y][flash.x] = 0; // 0 means that its flashed for this step

  return octoFlash(flashes, board);
};
export const step = (board: number[][]) => {
  const b = board.map((r) => r.map((c) => c + 1)); // increment

  return octoFlash(findFlashes(b), b);
};

const findFlashes = (board: number[][]): Position[] => {
  const flashes: Position[] = [];
  board.forEach(
    (r, ridx) => {
      r.forEach(
        (c, cidx) => {
          if (c > 9) {
            flashes.push(
              {
                x: cidx,
                y: ridx,
              },
            );
          }
        },
      );
    },
  );
  return flashes;
};

const countFlash = (board: number[][]): number => {
  let count = 0;
  board.forEach((r) => {
    r.forEach((c) => {
      if (c === 0) {
        count = count + 1;
      }
    });
  });
  return count;
};

export const steps = (board: number[][], numberOfSteps: number) => {
  let count = 0;
  let sum = 0;
  while (count < numberOfSteps) {
    board = step(board);
    sum = sum + countFlash(board);
    count++;
  }
  return sum;
};

const findSync = (board: number[][]):number => {
    let flashes = 0
    let count = 0;

    const boardSize = board[0].length * board.length
    while (boardSize !== flashes) {
        board = step(board);
        flashes = countFlash(board);
        count++;
    }
    return count
}

// part 1
console.log(steps(await parseData(), 100));

// part 2
console.log(findSync(await parseData()));
