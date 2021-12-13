import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";
import {
  addPointMeta,
  Basin,
  findLowPoints,
  linkBasins,
  parseData,
} from "./index.ts";

Deno.test("parseData", async () => {
  const result = await parseData("input.test.txt");
  assertEquals(result[0][0], 2);
  assertEquals(result[1][0], 3);

  assertEquals(result.length, 5);
});

Deno.test("findLowPoints - works", () => {
  const result = findLowPoints(
    [
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ],
  );
  assertEquals(result[0], {
    isBottom: false,
    col: 1,
    isLeftEdge: false,
    isRightEdge: false,
    row: 0,
    isTop: true,
    val: 1,
  });
});

Deno.test("findLowPoints - doesnt break on empty", () => {
  const result = findLowPoints(
    [],
  );

  assertArrayIncludes(result, []);
  assertEquals(result.length, 0);
});

const table = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];
Deno.test("linkBasins - adds right", () => {
  const b = new Basin();
  b.point = addPointMeta(table, 0, 0);

  const basins = linkBasins(b, table);
  assertEquals(basins.right?.point, {
    isBottom: false,
    col: 1,
    isLeftEdge: false,
    isRightEdge: false,
    row: 0,
    isTop: true,
    val: 1,
  });
});

Deno.test("linkBasins - does not add left", () => {
  const b = new Basin();
  b.point = addPointMeta(table, 0, 0);

  const basins = linkBasins(b, table);
  assertEquals(basins.left, null);
});

Deno.test("linkBasins - adds bottoms", () => {
  const b = new Basin();
  b.point = addPointMeta(table, 0, 0);

  const basins = linkBasins(b, table);
  assertEquals(basins.bottom?.point, {
    isBottom: false,
    col: 0,
    isLeftEdge: true,
    isRightEdge: false,
    row: 1,
    isTop: false,
    val: 3,
  });
});

Deno.test("linkBasins - gets value", () => {
  const b = new Basin();
  b.point = addPointMeta(table, 0, 0);

  const basins = linkBasins(b, table);
  assertEquals(basins.value(), 3);
});
