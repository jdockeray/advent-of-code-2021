export interface Entry {
  signals: string[];
  output: string[];
}

export function getOutput(output: string, dictonary: Map<number, string>):number{
  const sorted = output.split('').sort().join('')

  for(const [key, val] of dictonary.entries()){
    const sortedVal = val.split('').sort().join('')
    if(sortedVal === sorted){
      return key
    }
  }
  throw new Error('unknown output')
}
export function getOutputs([o1, o2, o3, o4]: string[], dictonary: Map<number, string>):number{
  return parseFloat(`${getOutput(o1, dictonary)}${getOutput(o2, dictonary)}${getOutput(o3, dictonary)}${getOutput(o4, dictonary)}`)
}

export async function parseData(path = "input.txt"): Promise<number> {
  const data = await (await Deno.readTextFile(path));

  const entries = formatData(data)
  const relations = getRelations();
  let sum = 0
  entries.forEach(e => {
    const simpleKeys = addSimpleKeys(e.signals);
    const result = getSignalMap(e.signals, simpleKeys, relations);
    sum = sum + getOutputs(e.output, result)
  })


  return sum;
}

const simplePatterns: Map<number, number> = new Map();
simplePatterns.set(2, 1);
simplePatterns.set(4, 4);
simplePatterns.set(3, 7);
simplePatterns.set(7, 8);

function getDiff(left: string, right: string) {
  return left.split("").filter(function (i) {
    return right.split("").indexOf(i) < 0;
  }).length;
}

function getSimmilar(left: string, right: string) {
  return left.split("").filter(function (i) {
    return right.split("").indexOf(i) >= 0;
  }).length;
}

export function addSimpleKeys(
  signals: string[],
  dictonary: Map<number, string> = new Map(),
) {
  signals.forEach((s) => {
    if (simplePatterns.has(s.length)) {
      dictonary.set(simplePatterns.get(s.length)!, s);
    }
  });
  return dictonary;
}

export function addComplexKeys(
  signals: string[],
  keys: Map<number, string>,
  relations: Map<number, Map<number, string>>,
  dictonary: Map<number, string> = new Map(),
): Map<number, string> {
  signals.forEach((sig) => {
    if (simplePatterns.has(sig.length)) {
      dictonary.set(simplePatterns.get(sig.length)!, sig);
    }

    for (const [outerKey, outerValue] of relations.entries()) {
      for (const [innerKey, innerValue] of outerValue.entries()) {
        for (const [uKey, uVal] of keys) {
          if (uKey === innerKey) {
            const hash = getHash(sig, uVal!);

            if (innerValue === hash) {
              dictonary.set(outerKey, sig);
              keys.set(outerKey, sig);
            }
          }
        }
      }
    }
  });

  return dictonary;
}

export function getSignalMap(
  signals: string[],
  keys: Map<number, string>,
  relations: Map<number, Map<number, string>>,
  dictonary: Map<number, string> = new Map(),
): Map<number, string> {

  dictonary = addComplexKeys(signals, keys, relations, dictonary);

  const values = Array.from(dictonary.values())
  signals.forEach(s => {
    if(values.indexOf(s)===-1){
      if(s.length === 5){
        dictonary.set(5, s)
      } else {
        dictonary.set(0, s)

      }
    }
  })
  return dictonary;
}

export function removeDuplicateVertialRelations(
  dictonary: Map<number, Map<number, string>>,
) {
  const relations: Map<number, Map<number, string>> = new Map();

  for (const [xKey, xValue] of dictonary.entries()) {
    relations.set(xKey, new Map());
    for (const [yKey, yValue] of xValue.entries()) {
      let isYUnique = true;
      for (const [xxKey, xxValue] of dictonary.entries()) {
        if (xxKey !== xKey) {
          for (const [yyKey, yyValue] of xxValue.entries()) {
            if (yyKey === yKey && yyValue === yValue) {
              isYUnique = false;
            }
          }
        }
      }
      if (isYUnique) {
        relations.get(xKey)?.set(yKey, yValue);
      }
    }
  }
  return relations;
}



export function getHash(outerValue: string, innerValue: string) {
  const diff = getDiff(outerValue, innerValue);
  const simmilar = getSimmilar(outerValue, innerValue);
  return `${diff},${simmilar}`;
}


export function findRelations(
  dictonary: Map<number, string>,
  magicKeys: number[] = [1, 4, 7, 8],
): Map<number, Map<number, string>> {
  const relations: Map<number, Map<number, string>> = new Map();

  for (const [outerKey, outerValue] of dictonary.entries()) {
    relations.set(outerKey, new Map());
    for (const [innerKey, innerValue] of dictonary.entries()) {
      if (innerKey !== outerKey && magicKeys.indexOf(innerKey) !== -1) {
        relations.get(outerKey)?.set(innerKey, getHash(outerValue, innerValue));
      }
    }
  }

  return relations;
}

export function formatData(str: string): Entry[] {
  return str.split("\n").map(
    (str) => {
      const [left, right] = str.split("|");
      return {
        signals: left.split(" ").filter((s) => s.length),
        output: right.split(" ").filter((s) => s.length),
      };
    },
  );
}



export function countSimple(entries: Entry[]): number {
  let count = 0;
  for (
    const {
      output,
    } of entries
  ) {
    output.forEach(
      (o) => {
        const uniqVals = [...new Set(o)];

        if (simplePatterns.has(uniqVals.length)) {
          count = count + 1;
        }
      },
    );
  }
  return count;
}

export function getRelations(): Map<number, Map<number, string>> {
  const dictonary: Map<number, string> = new Map();
  dictonary.set(0, "abcefg");
  dictonary.set(1, "cf");
  dictonary.set(2, "acdeg");
  dictonary.set(3, "acdfg");
  dictonary.set(4, "bcdf");
  dictonary.set(5, "abdfg");
  dictonary.set(6, "abdefg");
  dictonary.set(7, "acf");
  dictonary.set(8, "abcdefg");
  dictonary.set(9, "abcdfg");
  return removeDuplicateVertialRelations(findRelations(dictonary));
}



console.log(await parseData())
