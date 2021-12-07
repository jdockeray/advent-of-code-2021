export async function parseData(path = "input.txt") {
  const fish = await (await Deno.readTextFile(path)).split(",").map(
    parseFloat,
  );
  return countManyFish(fish, 256);
}

// first attempt, brute force by creating and counting arrays

export function changeDay(fish: number[]): number[] {
  const newFish: number[] = [];
  const transformFish = fish.map((f) => {
    if (f === 0) {
      newFish.push(8);
      return 6;
    }
    return f - 1;
  });
  return [...transformFish, ...newFish];
}

export function changeDays(days: number, fish: number[]): number[] {
  let transformFish = fish;
  for (let d = 0; d < days; d++) {
    transformFish = changeDay(transformFish);
  }
  return transformFish;
}

// second attempt, memoize and recurse

let memoized: Map<number, Map<number, number>> = new Map();

export const countFish = (fishTime: number, daysLeft: number): number => {
  if (memoized.get(daysLeft)?.get(fishTime)) {
    return memoized.get(daysLeft)!.get(fishTime)!;
  }

  if (daysLeft === 0) {
    return 1;
  }

  if (fishTime === 0) {
    const result = countFish(6, daysLeft - 1) + countFish(8, daysLeft - 1);
    if (!memoized.has(daysLeft)) {
      memoized.set(daysLeft, new Map());
    }
    memoized.get(daysLeft)?.set(fishTime, result);

    return result;
  }

  return countFish(fishTime - 1, daysLeft - 1);
};

export const countManyFish = (fish: number[], daysLeft: number) => {
  let sum = 0;
  for (const f of fish) {
    sum = sum + countFish(f, daysLeft);
  }
  return sum;
};

console.log(await parseData());
