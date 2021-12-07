import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { cost, costCrabs, move } from "./index.ts";

Deno.test("cost", () => {
  const result = cost(16, 2);
  assertEquals(result, 14);
});

Deno.test("cost", () => {
  const result = cost(1, 2);
  assertEquals(result, 1);
});

Deno.test("cost", () => {
  const result = cost(0, 2);
  assertEquals(result, 2);
});

Deno.test("costCrabs", () => {
  const result = costCrabs([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2);
  assertEquals(result, 37);
});

Deno.test("move", () => {
  const result = move(4);
  assertEquals(result, 10);
});

Deno.test("move", () => {
  const result = move(11);
  assertEquals(result, 66);
});
