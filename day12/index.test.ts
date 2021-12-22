import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { createCaveTree, findLegalChildren, hasAnotherSmallCaveBeenVisited } from "./index.ts";

const map = new Map([
  ["dr", new Set(["of", "IJ", "yj", "PZ", "sk", "VT"])],
  ["of", new Set(["dr", "start", "IJ", "VT", "KT", "gb"])],
  ["start", new Set(["KT", "gb", "of"])],
  ["KT", new Set(["start", "end", "yj", "of", "gb"])],
  ["yj", new Set(["sk", "IJ", "KT", "dr"])],
  ["sk", new Set(["yj", "VT", "end", "dr"])],
  ["gb", new Set(["start", "VT", "KT", "of"])],
  ["IJ", new Set(["end", "of", "dr", "yj"])],
  ["end", new Set(["IJ", "sk", "KT"])],
  ["VT", new Set(["sk", "km", "gb", "of", "dr"])],
  ["km", new Set(["VT"])],
  ["PZ", new Set(["dr"])],
]);
Deno.test("finds legal children - start", () => {
  const set = findLegalChildren([], "start", map);

  assertEquals(set.has("KT"), true); //"gb", "of"
  assertEquals(set.has("gb"), true); //"gb", "of"
  assertEquals(set.has("of"), true); //"gb", "of"
});

Deno.test("finds legal children - lowercase with traveled returns uppercase and lower case only visited once", () => {
  const set = findLegalChildren(["sk", "IJ", "KT", "dr"], "yj", map);
  assertEquals(set.has("KT"), true);
  assertEquals(set.has("IJ"), true);
  assertEquals(set.has("dr"), true);
  assertEquals(set.has("sk"), true);
});

Deno.test("finds legal children - filters out lowercase visited twice", () => {
  const set = findLegalChildren(["sk", "IJ", "KT", "dr", "dr"], "yj", map);

  assertEquals(set.has("dr"), false);
});

Deno.test("has another small cave been visited", () => {
  const result = hasAnotherSmallCaveBeenVisited(["sk", "IJ", "KT", "dr", "dr"]);

  assertEquals(result, true);
});

Deno.test("has another small cave been visited", () => {
  const result = hasAnotherSmallCaveBeenVisited(["sk", "IJ", "KT", "dr"]);

  assertEquals(result, false);
});

const anotherMap = new Map([
    ["start", new Set(["A", "b"])],
    ["A", new Set(["start", "c", "b", "end"])],
    ["b", new Set(["start", "A", "d", "end"])],
    ["c", new Set(["A"])],
    ["d", new Set(["b"])],
    ["end", new Set(["A", "b"])],
  ]);

  Deno.test("finds legal children - filters out lowercase visited twice", () => {
    const set = findLegalChildren([
        "start",
        "A",
        "c",
        "A",
        "c"
      ], "A", anotherMap);

    assertEquals(set.has("end"), false);
  });

  Deno.test("finds terminal node", () => {
      const traveled =   ['start', 'A', 'c', 'A', 'c', 'A']
    const node = createCaveTree( anotherMap, "A", traveled);

    assertEquals(node.children.length > 0, true); //should include end
  });

  Deno.test("finds terminal node for root with 2 small caves", () => {
    const traveled =   [
        "start",
        "A",
        "b",
        "A",
        "b",
        "A"
      ]
  const node = createCaveTree( anotherMap, "A", traveled);

  assertEquals(node.children.length , 2); //should include end
});
