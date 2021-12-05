import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import {
  findWinningBoard,
  isColWinner,
  isRowWinner,
  parseBoards,
  parseData,
  winner,
} from "./index.ts";
Deno.test("Parse Test", () => {
  const boards = parseBoards([
    "",
    "83 40",
    "50 74",
    "",
    "12 59",
    "36 33",
  ]);
  assertEquals(boards, [
    [
      [83, 40],
      [50, 74],
    ],
    [
      [12, 59],
      [36, 33],
    ],
  ]);
});

Deno.test("Parse Test - can handle the extra space", () => {
  const boards = parseBoards([
    "",
    "83  40",
    "50 74",
    "",
    "12 59",
    "36 33",
  ]);
  assertEquals(boards, [
    [
      [83, 40],
      [50, 74],
    ],
    [
      [12, 59],
      [36, 33],
    ],
  ]);
});

Deno.test("Parse Test - can handle the extra space", () => {
  const boards = parseBoards([
    "",
    "83  40",
    "50 74",
    "",
    "12 59",
    "36 33",
  ]);
  assertEquals(boards, [
    [
      [83, 40],
      [50, 74],
    ],
    [
      [12, 59],
      [36, 33],
    ],
  ]);
});
Deno.test("Parse Test - can handle the extra space", () => {
  const boards = parseBoards([
    "57  7 30 39 19",
    " 1 13 41 15 50",
  ]);
  assertEquals(boards, [
    [
      [57, 7, 30, 39, 19],
      [1, 13, 41, 15, 50],
    ],
  ]);
});

Deno.test("Is Col Winner", () => {
  const isWin = isColWinner([
    [83, 40],
    [50, 74],
  ], [83, 50]);
  assertEquals(isWin, true, "wins when a winning col");
});

Deno.test("Is Col Winner - odd", () => {
  const isWin = isColWinner([
    [48, 74, 58, 13, 54],
    [57, 18, 37, 92, 78],
    [89, 10, 25, 97, 43],
  ], [48, 57, 89]);
  assertEquals(isWin, true, "wins when a winning col");
});

Deno.test("Is Col Winner - different index", () => {
  const isWin = isColWinner([
    [48, 74, 58, 13, 54],
    [57, 18, 37, 92, 78],
    [89, 10, 25, 97, 43],
  ], [58, 37, 25]);
  assertEquals(isWin, true, "wins when a winning col");
});

Deno.test("Is Row Winner", () => {
  const isWin = isRowWinner([
    [83, 40],
    [50, 74],
  ], [83, 40]);
  assertEquals(isWin, true, "wins when a winning row");
});

Deno.test("Is Row Winner - odd", () => {
  const isWin = isRowWinner([
    [48, 74, 58, 13, 54],
    [57, 18, 37, 92, 78],
    [89, 10, 25, 97, 43],
  ], [57, 18, 37, 92, 78]);
  assertEquals(isWin, true, "wins when a winning row");
});

Deno.test("Is Row Winner - fails", () => {
  const isWin = isRowWinner([
    [48, 74],
    [57, 18],
  ], [1, 2]);
  assertEquals(isWin, false, "fails when not winning row");
});

Deno.test("Calculates Winning Board Number", () => {
  const result = winner([1, 2], [
    [1, 2],
    [3, 4],
  ]);
  assertEquals(
    result,
    14,
    "winning number is 2 and (3, 4) are left, so 2 * (3+4) is 14",
  );
});

Deno.test("calculates winner", () => {
  const result = findWinningBoard([1, 2], [[
    [1, 2],
    [3, 4],
  ]]);

  assertEquals(
    result,
    14,
    "winning number is 2 and (3, 4) are left, so 2 * (3+4) is 14",
  );
});

Deno.test("calculates winner - when winner is not first", () => {
  const result = findWinningBoard([1, 2], [
    [
      [48, 74],
      [57, 18],
    ],
    [
      [1, 2],
      [3, 4],
    ],
  ]);

  assertEquals(
    result,
    14,
    "winning number is 2 and (3, 4) are left, so 2 * (3+4) is 14",
  );
});

Deno.test("calculates winner - when winner is a col", () => {
  const result = findWinningBoard([1, 3], [
    [
      [48, 74],
      [57, 18],
    ],
    [
      [1, 2],
      [3, 4],
    ],
  ]);

  assertEquals(
    result,
    18,
    "winning number is 3 and (2, 4) are left, so 3 * (2+4) is 12",
  );
});
