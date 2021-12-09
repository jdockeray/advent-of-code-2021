import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import {
  addComplexKeys,
  addSimpleKeys,
  findRelations,
  formatData,
  getHash,
  getRelations,
  removeDuplicateVertialRelations,
} from "./index.ts";

Deno.test("changes day correctly -> no new lantern fish", () => {
  const result = formatData("aa aaaa | aa aaa");

  assertEquals(result[0].output, ["aa", "aaa"]);
  assertEquals(result[0].signals, ["aa", "aaaa"]);
});

Deno.test("findRelations", () => {
  const dictonary: Map<number, string> = new Map();
  dictonary.set(0, "abcefg");
  dictonary.set(1, "cf");
  const result = findRelations(dictonary);

  assertEquals(result.get(0)!.get(1), "4,2");
  assertEquals(result.get(1)!.has(1), false);
});
Deno.test("addSimpleKeys", () => {
  const result = addSimpleKeys(["aa", "b", "cccc"]);
  assertEquals(result.get(1), "aa");
  assertEquals(result.get(4), "cccc");
  assertEquals(result.size, 2);
});

Deno.test("addSimpleKeys", () => {
  const result = addSimpleKeys([
    "acedgfb",
    "cdfbe",
    "gcdfa",
    "fbcad",
    "dab",
    "cefabd",
    "cdfgeb",
    "eafb",
    "cagedb",
    "ab",
  ]);
  assertEquals(result.get(8), "acedgfb");
  assertEquals(result.get(1), "ab");
});

Deno.test("addComplexKeys", () => {
  const signals = [
    "acedgfb",
    "cdfbe",
    "gcdfa",
    "fbcad",
    "dab",
    "cefabd",
    "cdfgeb",
    "eafb",
    "cagedb",
    "ab",
  ];

  const simpleKeys = addSimpleKeys(signals);
  const relations = getRelations();
  const result = addComplexKeys(signals, simpleKeys, relations);
  assertEquals(result.get(8), "acedgfb");
  assertEquals(result.get(2), "gcdfa"); //x
  assertEquals(result.get(3), "fbcad");
  assertEquals(result.get(7), "dab"); //x

});

Deno.test("removeDuplicateVerticalRelations", () => {
  const dictonary = new Map();
  dictonary.set(
    1,
    new Map([
      [1, "4,1"],
      [5, "2,3"],
      [8, "0,5"],
    ]),
  );
  dictonary.set(
    2,
    new Map([
      [5, "2,3"],
      [8, "0,5"],
    ]),
  );
  const result = removeDuplicateVertialRelations(dictonary);
  assertEquals(result.get(1)?.has(1), true);
  assertEquals(result.get(1)?.has(5), false);
  assertEquals(result.get(1)?.has(8), false);

  assertEquals(result.get(2)?.size, 0);
});

Deno.test("getHash", () => {
  const result1 = getHash("cdfbe", "dab");
  const result2 = getHash("gcdfa", "dab");
  assertEquals(result1, "3,2");
  assertEquals(result2, "3,2");
});

// eafb

// 5 => Map { 7 => "3,2" },

// "cdfbe" => 5,
// "gcdfa" => 5,
