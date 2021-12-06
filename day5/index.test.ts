import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import {
  drawPath,
  formatRow,
  formatRows,
  getDiagnolLine,
  getHorizontalLine,
  getVerticalLine,
  isValidHorizontal,
  isValidVertical,
  Path,
  plotLine,
} from "./index.ts";

Deno.test("row format", () => {
  const result = formatRow("661,85 -> 780,85");
  assertEquals(result, [[661, 85], [780, 85]]);
});

Deno.test("rows format", () => {
  const input = ["661,85 -> 780,85", "484,231 -> 91,231"];
  const result = formatRows(input);

  const output = [[[661, 85], [780, 85]], [[484, 231], [91, 231]]];
  assertEquals(result, output);
});

Deno.test("fails when not valid horizontal", () => {
  const result = isValidHorizontal([[804, 936], [949, 936]]);

  assertEquals(result, false);
});

Deno.test("passes when  valid horizontal", () => {
  const result = isValidHorizontal([[9, 7], [8, 7]]);

  assertEquals(result, true);
});

Deno.test("fails when not valid vertical", () => {
  const result = isValidVertical([[804, 936], [949, 936]]);

  assertEquals(result, false);
});

Deno.test("passes when  valid vertical", () => {
  const result = isValidVertical([[1, 1], [1, 3]]);

  assertEquals(result, true);
});

Deno.test("gets horizontal line - desc", () => {
  const input: Path = [[9, 7], [7, 7]];
  const result = getHorizontalLine(input);

  const output = [[7, 7], [8, 7], [9, 7]];
  assertEquals(result, output);
});

Deno.test("gets horizontal line -asc", () => {
  const input: Path = [[7, 7], [9, 7]];
  const result = getHorizontalLine(input);

  const output = [[7, 7], [8, 7], [9, 7]];
  assertEquals(result, output);
});

Deno.test("gets vertical line - asc", () => {
  const input: Path = [[1, 1], [1, 3]];
  const result = getVerticalLine(input);

  const output = [[1, 1], [1, 2], [1, 3]];
  assertEquals(result, output);
});

Deno.test("gets vertical line - des", () => {
  const input: Path = [[1, 3], [1, 1]];
  const result = getVerticalLine(input);

  const output = [[1, 1], [1, 2], [1, 3]];
  assertEquals(result, output);
});

Deno.test("plots line", () => {
  const map = plotLine(new Map(), [[1, 1], [1, 2], [1, 3]]);

  assertEquals(map.get("1,1"), 1);
  assertEquals(map.get("1,2"), 1);
  assertEquals(map.get("1,3"), 1);
});

Deno.test("counts crossing lines", () => {
  let map = plotLine(new Map(), [[1, 1], [1, 2], [1, 3]]);
  map = plotLine(map, [[1, 1], [1, 2], [1, 3]]);
  assertEquals(map.get("1,1"), 2);
  assertEquals(map.get("1,2"), 2);
  assertEquals(map.get("1,3"), 2);
});

Deno.test("draws vertical path", () => {
  const map = drawPath(new Map(), [[1, 3], [1, 1]]);
  assertEquals(map.get("1,1"), 1);
  assertEquals(map.get("1,2"), 1);
  assertEquals(map.get("1,3"), 1);
});

Deno.test("gets diagnol line - 1,1 -> 3,3", () => {
  const input: Path = [[1, 1], [3, 3]];
  const result = getDiagnolLine(input);

  const output = [[3, 3], [2, 2], [1, 1]];
  assertEquals(result, output);
});

Deno.test("gets diagnol line - 9,7 -> 7,9", () => {
  const input: Path = [[9, 7], [7, 9]];
  const result = getDiagnolLine(input);

  const output = [ [ 7, 9 ], [ 8, 8 ], [ 9, 7 ] ]
  assertEquals(result, output);
});


