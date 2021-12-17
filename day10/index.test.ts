import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { GrammerError, LineIncompleteError, parseData, readLine, Terminals } from "./index.ts";

Deno.test("parses the first row", async () => {
  const result = await parseData("input.test.txt");

  assertEquals(result[0], [
    "[",
    "(",
    "{",
    "(",
    "<",
    "(",
    "(",
    ")",
    ")",
    "[",
    "]",
    ">",
    "[",
    "[",
    "{",
    "[",
    "]",
    "{",
    "<",
    "(",
    ")",
    "<",
    ">",
    ">",
  ]);
});

Deno.test("readLine - throws corrupted grammer error - ",  () => {
    const corrupted: Terminals[] = ['[', '(', ']',  '(']

    assertThrows(() => { readLine(corrupted)}, GrammerError)
})


Deno.test("readLine - throws incomplete line error - ",  () => {
  const corrupted: Terminals[] = ['[', '(']

  assertThrows(() => { readLine(corrupted) }, LineIncompleteError)
})
