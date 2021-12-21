import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { inRange, step, steps } from "./index.ts";

Deno.test("right side in range", () => {
  const result = inRange({ x: 0, y: 0 }, { x: 1, y: 0 });

  assertEquals(result, true);
});


Deno.test("steps", () => {
  const example = [
    [1, 1, 1, 1, 1],
    [1, 9, 9, 9, 1],
    [1, 9, 1, 9, 1],
    [1, 9, 9, 9, 1],
    [1, 1, 1, 1, 1],
  ];
  let board = step(example); // step 1

  assertEquals(board[0], [3,4,5,4,3]);
  assertEquals(board[1], [4,0,0,0,4]);
  assertEquals(board[2], [5,0,0,0,5]);
  assertEquals(board[3], [4,0,0,0,4]);
  assertEquals(board[4], [3,4,5,4,3]);
});
