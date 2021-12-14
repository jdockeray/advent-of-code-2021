type Point = {
  x: number;
  y: number;
};

const getInfo = (x: number, y: number, table: number[][]) => {
  const isTop = y === 0;
  const isBottom = y === table.length - 1;
  const isLeft = x === 0;
  const isRight = x === table[0].length - 1;
  const left = !isLeft ? table[y][x - 1] : 9;
  const right = !isRight ? table[y][x + 1] : 9;
  const top = !isTop ? table[y - 1][x] : 9;
  const bottom = !isBottom ? table[y + 1][x] : 9;
  const point = table[y][x];
  return {
    isTop,
    isBottom,
    isRight,
    isLeft,
    left,
    right,
    top,
    bottom,
    point,
    x,
    y,
  };
};
const findLowPoint = (table: number[][]): Point[] => {
  const lowPoints: Point[] = [];
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[0].length; x++) {
      const { top, bottom, left, right, point } = getInfo(x, y, table);
      if (top > point && bottom > point && left > point && right > point) {
        lowPoints.push({
          x,
          y,
        });
      }
    }
  }
  return lowPoints;
};

const makeGrid = (table: number[][]): Map<number, Map<number, 1 | 0>> => {
  const grid: Map<number, Map<number, 1 | 0>> = new Map();

  for (let y = 0; y < table.length; y++) {
    grid.set(y, new Map());
    for (let x = 0; x < table[0].length; x++) {
      grid.get(y)?.set(x, 0);
    }
  }
  return grid;
};

const findBasin = (
  point: Point,
  table: number[][],
): Map<number, Map<number, 1 | 0>> => {
  const grid = makeGrid(table);

  const stack: number[][] = [];
  stack.push([point.y, point.x]);
  while (stack.length) {
    const [y, x] = stack.pop()!;
    const { top, bottom, left, right } = getInfo(x, y, table);

    // visit
    grid.get(y)?.set(x, 1);

    // check other nodes
    if (top !== 9 && !grid.get(y - 1)?.get(x)) {
      stack.push([y - 1, x]);
    }
    if (bottom !== 9 && !grid.get(y + 1)?.get(x)) {
      stack.push([y + 1, x]);
    }
    if (left !== 9 && !grid.get(y)?.get(x - 1)) {
      stack.push([y, x - 1]);
    }
    if (right !== 9 && !grid.get(y)?.get(x + 1)) {
      stack.push([y, x + 1]);
    }
  }
  return grid;
};

const calcBasinSize = (basin: Map<number, Map<number, 1 | 0>>) => {
  let sum = 0;
  for (const [_, row] of basin.entries()) {
    for (const [_, cell] of row.entries()) {
      sum = sum + cell;
    }
  }
  return sum;
};

export async function parseData(path = "input.txt"): Promise<number[][]> {
  return await (await Deno.readTextFile(path)).split("\n").map((s) =>
    s.split("").map(
      parseFloat,
    )
  ).filter((r) => r.length);
}

const part2 = async () => {
  const table = await parseData();
  console.log(table);
  const lowPoints = findLowPoint(table);
  console.log(lowPoints);
  const [a, b, c] = lowPoints.map(
    (p) => calcBasinSize(findBasin(p, table)),
  ).sort((a, b) => a - b).reverse();
  return a * b * c;
};

console.log(await part2());
