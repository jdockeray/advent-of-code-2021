import { changeDay, changeDays, countFish } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test("changes day correctly -> no new lantern fish", () => {
  const result = changeDay([3, 4, 3, 1, 2]);

  assertEquals(result, [2, 3, 2, 0, 1]);
});

Deno.test("changes day correctly -> new lantern fish", () => {
  const result = changeDay([2, 3, 2, 0, 1]);

  assertEquals(result, [1, 2, 1, 6, 0, 8]);
});

Deno.test("changes days", () => {
  const result = changeDays(4, [3, 4, 3, 1, 2]);

  assertEquals(result, [6, 0, 6, 4, 5, 6, 7, 8, 8]);
});

Deno.test("changes days", () => {
  const result = changeDays(4, [3, 4, 3, 1, 2]);

  assertEquals(result, [6, 0, 6, 4, 5, 6, 7, 8, 8]);
});

Deno.test("changes days", () => {
  const result = changeDays(20, [6]);

  assertEquals(result, [0, 2, 2, 4]);
});

Deno.test("count fish", () => {
  const result = countFish(6, 20);

  assertEquals(result, 4);
});
