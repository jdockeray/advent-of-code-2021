class LowPoint {
  constructor() {
    this.col = 0;
    this.row = 0;
    this.isBottom = false;
    this.isTop = false;
    this.isLeftEdge = false;
    this.isRightEdge = false;
    this.val = 0;
  }
  compare(p: LowPoint): boolean {
    return this.col === p.col && this.row === p.row;
  }
  row: number;
  col: number;
  isBottom: boolean;
  isTop: boolean;
  isLeftEdge: boolean;
  isRightEdge: boolean;
  val: number;
}

export type Direction = {
  down: boolean;
  up: boolean;
};

export class Basin {
  constructor() {
    this.point = new LowPoint();
    this.right = null;
    this.left = null;
    this.top = null;
    this.bottom = null;

  }
  compare(b: Basin | null): boolean {
    if (b === null) return false;
    return this.point.compare(b.point);
  }

  point: LowPoint;
  right: Basin | null;
  left: Basin | null;
  top: Basin | null;
  bottom: Basin | null;



}

export function linkBasins(basin: Basin, table: number[][]): Basin {
  function _linkBasins(b: Basin): Basin {
    const { row, col, isTop, isBottom, isLeftEdge, isRightEdge } = b.point;

    if (!isTop && !b.top) {
      const next = table[row - 1][col];
      if (next !== 9 && !b.top) {
        const nextBasin = new Basin();
        nextBasin.point = addPointMeta(table, row - 1, col);
        nextBasin.bottom = b;
        b.top = _linkBasins(nextBasin);
      }
    }
    if (!isBottom && !b.bottom) {
      const next = table[row + 1][col];
      if (next !== 9) {
        const nextBasin = new Basin();
        nextBasin.point = addPointMeta(table, row + 1, col);
        nextBasin.top = b;
        b.bottom = _linkBasins(nextBasin);
      }
    }
    if (!isLeftEdge && !b.left) {
      const next = table[row][col - 1];
      if (next !== 9) {
        const nextBasin = new Basin();
        nextBasin.point = addPointMeta(table, row, col - 1);
        nextBasin.right = b;
        b.left = _linkBasins(nextBasin);
      }
    }
    if (!isRightEdge && !b.right) {
      const next = table[row][col + 1];
      if (next !== 9) {
        const nextBasin = new Basin();

        nextBasin.point = addPointMeta(table, row, col + 1);
        nextBasin.left = b;
        b.right = nextBasin;
      }
    }

    return b;
  }

  return _linkBasins(basin);
}

export async function parseData(path = "input.txt") {
  return await (await Deno.readTextFile(path)).split("\n").map((s) =>
    s.split("").map(
      parseFloat,
    )
  );
}

export function addPointMeta(
  table: number[][],
  row: number,
  col: number,
): LowPoint {
  const top = 0;
  const bottom = table.length - 1;
  const left = 0;
  const right = table[0]?.length - 1;
  const point = new LowPoint();
  point.isTop = row === top;
  point.isBottom = row === bottom;
  point.isLeftEdge = col === left;
  point.isRightEdge = col === right;
  point.val = table[row][col];
  point.row = row;
  point.col = col;
  return point;
}

export function findLowPoints(table: number[][]): LowPoint[] {
  const lowPoints: LowPoint[] = [];

  table.forEach((row, ridx) => {
    row.forEach((cell, cidx) => {
      const point = addPointMeta(table, ridx, cidx);

      let isLowPoint = true; // now we will try and prove it

      if (!point.isTop) { // is not top row, then compare top
        if (cell >= table[ridx - 1][cidx]) {
          isLowPoint = false;
        }
      }
      if (!point.isBottom) {
        if (cell >= table[ridx + 1][cidx]) {
          isLowPoint = false;
        }
      }
      if (!point.isLeftEdge) {
        if (cell >= table[ridx][cidx - 1]) {
          isLowPoint = false;
        }
      }
      if (!point.isRightEdge) {
        if (cell >= table[ridx][cidx + 1]) {
          isLowPoint = false;
        }
      }

      // did we make it?
      if (isLowPoint) {
        lowPoints.push(point);
      }
    });
  });
  return lowPoints;
}

const getRisk = (lowPoints: number[]) => {
  let sum = 0;
  for (const point of lowPoints) {
    sum = sum + (point + 1);
  }
  return sum;
};

export const part1 = async () => {
  return getRisk(
    findLowPoints(await parseData()).map(({ val }) => {
      return val;
    }),
  );
};



const findLeftMost = (basin: Basin | null):Basin => {
    if(basin?.left !== null){
        return findLeftMost(basin)
    }
    return basin
}
const table = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

const lowPoints = findLowPoints(table);

const lowPointBasins = lowPoints.map(
  (lp) => {
    const b = new Basin();
    b.point = lp;

    return linkBasins(b, table);
  },
);
 

const asd = lowPointBasins
console.log(asd);
