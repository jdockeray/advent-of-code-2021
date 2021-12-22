type CaveMap = Map<string, Set<string>>;
type CaveTree = {
  root: string;
  travelled: string[];
  children: CaveTree[];
};

export async function parseCaveMap(path = "input.txt"): Promise<CaveMap> {
  const data = await (await Deno.readTextFile(path)).split("\n").map((s) =>
    s.split("-")
  ).filter((r) => r.length);

  const keys = new Set(data.flatMap(
    (m) => m,
  ));
  keys.delete(""); // remove empty

  const caveMap: CaveMap = new Map();
  keys.forEach((key) => {
    const val: Set<string> = new Set();
    data.forEach(
      (d) => {
        if (d.indexOf(key) !== -1) {
          d.forEach((dd) => {
            if (dd !== key) {
              val.add(dd);
            }
          });
        }
      },
    );
    caveMap.set(key, val);
  });

  return caveMap;
}

function isLowerCase(str: string): boolean {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

export const hasAnotherSmallCaveBeenVisited = (
  travelled: string[],
): boolean => {
  return travelled.filter((compare, _idx, arr) => {
    return arr.filter((test) => test === compare).length > 1 &&
      isLowerCase(compare);
  }).length > 1;
};

export const isSmallCaveLegal = (cave: string, travelled: string[]) => {
  if (cave === "start" || cave === "end") {
    return travelled.indexOf(cave) === -1;
  }

  if (!hasAnotherSmallCaveBeenVisited(travelled)) {
    return true;
  }


   return travelled.indexOf(cave) === -1;
};

export const findLegalChildren = (
  travelled: string[],
  root: string,
  map: CaveMap,
): Set<string> => {
  const children: Set<string> = new Set();
  map.get(root)?.forEach((cave) => {
    if (isLowerCase(cave)) {
      // is small cave
      if (
        isSmallCaveLegal(cave, travelled)
      ) {
        children.add(cave);
      }
    } else {
      // is big cave
      children.add(cave);
    }
  });
  return children;
};

export const createCaveTree = (
  map: CaveMap,
  root = "start",
  travelled: string[] = [],
): CaveTree => {
  const t = [...travelled, root];
  let children: CaveTree[] = [];
  if (root !== "end") {
    children = [...findLegalChildren(t, root, map).values()].map(
      (child) =>
        createCaveTree(
          map,
          child,
          t,
        ),
    );
  }

  return {
    root,
    travelled,
    children,
  };
};

const countEndings = ({ root, children }: CaveTree): number => {
  if (children.length === 0) {
    if (root === "end") {
      return 1;
    }
    return 0;
  }
  let sum = 0;
  for (const child of children) {
    sum = sum + countEndings(child);
  }
  return sum;
};
const m = await parseCaveMap();
console.log(m);
console.log(countEndings(createCaveTree(m)));
