import { assertEquals, assertArrayIncludes } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { step, runFlash, getPoints, hasFlashed } from "./index.ts";

const simpleData = [
  [1, 1, 1, 1, 1],
  [1, 9, 9, 9, 1],
  [1, 9, 1, 9, 1],
  [1, 9, 9, 9, 1],
  [1, 1, 1, 1, 1],
];

Deno.test("step() -> correctly moves 1 step", () => {
  const {
    board,
  } = step(simpleData);

  assertEquals(board[0], [3, 4, 5, 4, 3]);
  assertEquals(board[1], [4, 0, 0, 0, 4]);
  assertEquals(board[2], [5, 0, 0, 0, 5]);
  assertEquals(board[3], [4, 0, 0, 0, 4]);
  assertEquals(board[4], [3, 4, 5, 4, 3]);
});

Deno.test("runFlash() -> increments top left point", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const flashed = runFlash({ col: 0, row: 0 }, b);

  assertEquals(flashed[0], [0,1,0]);
  assertEquals(flashed[1], [1,1,0]);
  assertEquals(flashed[2], [0,0,0]);

});

Deno.test("getPoints() -> gets all points for top left point where there is no right or top row", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const points = getPoints({ col: 0, row: 0 }, b);

  assertArrayIncludes(points, [{col: 0, row: 0}, {col: 1, row: 0}]); // middle
  assertArrayIncludes(points, [{col: 0, row: 1}, {col: 1, row: 1}]); // bottom
  assertEquals(points.length, 4)
});

Deno.test("getPoints() -> gets all points for top middle point where there is no top row", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const points = getPoints({ col: 1, row: 0 }, b);

  assertArrayIncludes(points, [{col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0}]); // middle
  assertArrayIncludes(points, [{col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1}]); // bottom
  assertEquals(points.length, 6)
});

Deno.test("getPoints() -> gets all points for top right point where there is no top row or right row", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const points = getPoints({ col: 2, row: 0 }, b);

  assertArrayIncludes(points, [{col: 1, row: 0}, {col: 2, row: 0}]); // middle
  assertArrayIncludes(points, [{col: 1, row: 1}, {col: 2, row: 1}]); // bottom
  assertEquals(points.length, 4)
});


Deno.test("getPoints() -> gets all 9 points for middle point", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const points = getPoints({ col: 1, row: 1 }, b);

  assertArrayIncludes(points, [{col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0}]); // top
  assertArrayIncludes(points, [{col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1}]); // middle
  assertArrayIncludes(points, [{col: 0, row: 2}, {col: 1, row: 2}, {col: 2, row: 2}]); // bottom

  assertEquals(points.length, 9)
});
Deno.test("getPoints() -> gets all 6 points for bottom point", () => {
  const b = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const points = getPoints({ col: 1, row: 2 }, b);

  assertArrayIncludes(points, [{col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1}]); // top
  assertArrayIncludes(points, [{col: 0, row: 2}, {col: 1, row: 2}, {col: 2, row: 2}]); // middle

  assertEquals(points.length, 6)
});


Deno.test("hasFlashed() -> returns true if has flashed", () => {
  const point = { col: 1, row: 2 }

  const flashed = hasFlashed({ col: 1, row: 2 }, [{ col: 1, row: 2 }]);



  assertEquals(flashed, true)
});


Deno.test("hasFlashed() -> returns false if hasnt flashed", () => {
  const point = { col: 1, row: 2 }

  const flashed = hasFlashed({ col: 1, row: 2 }, []);



  assertEquals(flashed, false)
});
