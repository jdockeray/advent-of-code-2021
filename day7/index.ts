export async function parseData(path = "input.txt") {
  const crabs = await (await Deno.readTextFile(path)).split(",").map(
    parseFloat,
  );
  return findLowest(crabs);
}

export function findLowest(crabs: number[]): number {
  let lowest = 0;
  for (const crab of crabs) {
    const compare = costCrabs(crabs, crab);
    if (!lowest) {
      lowest = compare;
    }
    if (compare < lowest) {
      lowest = compare;
    }
  }
  return lowest;
}

export function costCrabs(crabs: number[], compare: number) {
  let sum = 0;
  for (const crab of crabs) {
    sum = sum + cost(crab, compare);
  }
  return sum;
}

// recursion wont work
//
// export function move(range: number: number {
//   if (range === 1) {
//     return sum + 1;
//   }
//   return move(range - 1, sum + range);
// }

export function move(range: number) {
    let sum = 0;
    for(let i = 0; i<range; i++){
        sum = sum + (range - i)
    }
    return sum
}

export function cost(left: number, right: number) {
  return move(Math.abs(left - right))
}

console.log(await parseData());
3
