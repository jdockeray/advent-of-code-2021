
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { formatData } from "./index.ts";

Deno.test("changes day correctly -> no new lantern fish", () => {
  const result = formatData("aa aaaa | aa aaa");

  assertEquals(result[0].output, ["aa", "aaa"])
  assertEquals(result[0].signals, ["aa", "aaaa"])

 
});

