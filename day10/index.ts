const terminals = ["(", ")", "[", "]", "{", "}", "<", ">"] as const;
export type Terminals = typeof terminals[number];

export class GrammerError extends Error {
  constructor(message: string, read: Terminals, pop: Terminals) {
    super(message);
    this.read = read;
    this.pop = pop;
  }
  read: Terminals;
  pop: Terminals;
}
export class LineIncompleteError extends Error {
  constructor(message: string, pdaStack: Terminals[]) {
    super(message);
    this.pdaStack = pdaStack;
  }
  pdaStack: Terminals[];
}

export const scores: Map<Terminals, number> = new Map([
  [")", 3],
  ["]", 57],
  ["}",1197],
  [">", 25137]
]);

export async function parseData(path = "input.txt"): Promise<Terminals[][]> {
  return await (await Deno.readTextFile(path)).split("\n").filter((r) =>
    r.length
  ).map((s) =>
    s.split("").map(
      parseTerminal,
    )
  );
}

const isTerminal = (terminal: string): terminal is Terminals => {
  if (terminals.indexOf(terminal as Terminals) !== -1) {
    return true;
  }
  return false;
};

const parseTerminal = (str: string): Terminals => {
  if (isTerminal(str)) {
    return str;
  }
  throw new Error("invalid input");
};

const readCharacter = (c: Terminals, stack: Terminals[]) => {
  if (
    ["(", "[", "{", "<"].indexOf(c) !== -1
  ) {
    stack.push(c);
    return;
  }
  const top = stack.pop();
  if(
    ( c === ')' && top === '(') ||
    ( c === '}' && top === '{') ||
    ( c === ']' && top === '[') ||
    ( c === '>' && top === '<')
  ){
    return // all good in the hood
  }
  throw new GrammerError("", c, top!);

};

export const readLine = (input: Terminals[]) => {
  const stack: Terminals[] = [];
  input.forEach(
    (c) => {
      readCharacter(c, stack);
    },
  );
  if(stack.length > 0){
    throw new LineIncompleteError('Line incomplete', stack)
  }
};

export const getScore = (t: Terminals) => {
  switch (t) {
    case '(':
      return 1
    case '[':
      return 2
    case '{':
      return 3
    case '<':
      return 4
  }
  throw new Error('invalid stack terminal')
}

export const computeScore = (stack: Terminals[]):number => {
  let s = 0
  while(stack.length > 0){
    s = s * 5
    const t = stack.pop()
    s = s + getScore(t!)
  }
  return s
}

export const readLines = (input: Terminals[][]) => {
  let score = []

  for (const row of input) {
    try {
      readLine(row);
    } catch (e) {
      if (e instanceof GrammerError) {
        // ignore, line is not valid
      }
      if(e instanceof LineIncompleteError){
        console.log(e)
        score.push(computeScore(e.pdaStack))
        // do something
      }

    }
  }
  return score.sort((a, b) => a-b)
};
// console.log(scores);
const arr = readLines(await parseData())
const middle = arr[arr.length / 2 | 0]
console.log(middle);
