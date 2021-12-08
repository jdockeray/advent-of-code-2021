export interface Entry {
  signals: string[];
  output: string[];
}
const simplePatterns:Map<number, number> = new Map()
simplePatterns.set(2,1)
simplePatterns.set(4, 4)
simplePatterns.set(3, 7)
simplePatterns.set(7, 8)

export function formatData(str: string): Entry[] {
  return str.split("\n").map(
    (str) => {
      const [left, right] = str.split("|");
      return {
        signals: left.split(" ").filter(s=>s.length),
        output: right.split(" ").filter(s=>s.length),
      };
    },
  );
}
export async function parseData(path = "input.txt"): Promise<number> {
  const data = await (await Deno.readTextFile(path));
  return countSimple(formatData(data));
}

export function countSimple(entries: Entry[]):number{
    let count = 0
    for(const {
        output
    } of entries){
        output.forEach(
            o => {
                const uniqVals = [...new Set(o)]

                if(simplePatterns.has(uniqVals.length)){
                    count = count + 1
                }
            }
        )
    }
    return count
}
console.log(await parseData())