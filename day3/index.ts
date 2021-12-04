const text = await Deno.readTextFile("./input.txt");

function add(count: [number, number], compare: 1 | 0) {
  count[compare] = count[compare] + 1;
  return count;
}

function isBinaryNumber(binary: number): binary is (1 | 0) {
  return binary === 1 || binary === 0;
}

function counter(arr:string[]) {
  const counter: Map<number, [number, number]> = new Map();

  arr.forEach((str) => {
    str.split("").forEach((element, index) => {
      if (!counter.has(index)) {
        counter.set(index, [0, 0]);
      }
      const count = counter.get(index);
      const num = parseFloat(element);
      if (count && isBinaryNumber(num)) {
        counter.set(index, add(count, num));
      }
    });
  });
  return counter;
}

function part1(counter: Map<number, [number, number]>) {
  let gamma = "";
  let epsilon = "";

  for (const [_, value] of counter) {
    if (value[0] > value[1]) {
      gamma = gamma + "0";
      epsilon = epsilon + "1";
    } else {
      gamma = gamma + "1";
      epsilon = epsilon + "0";
    }
  }

  console.log("=== part 1 ====");
  console.log("");
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
  console.log("");
  console.log("=======");
}

part1(counter(text.split("\n")));

function oxygenGenerator(arr:string[], position: number = 0):string{
  if(arr.length === 1){
    return arr[0]
  }
  const count = counter(arr)
  const compare = count.get(position)
  if(!compare || arr.length === 0){
    throw new Error('map value not defined')
  }
  const active = compare[0] > compare[1] ? 0 : 1
  const filtered = arr.filter(str=> parseFloat(str[position]) === active)

  return oxygenGenerator(filtered, position+1)
}

function co2Scrubber(arr:string[], position: number = 0):string{
  if(arr.length === 1){
    return arr[0]
  }
  const count = counter(arr)
  const compare = count.get(position)
  if(!compare || arr.length === 0){
    throw new Error('map value not defined')
  }
  const active = compare[0] <= compare[1] ? 0 : 1
  const filtered = arr.filter(str=> parseFloat(str[position]) === active)

  return co2Scrubber(filtered, position+1)
}
console.log(oxygenGenerator(text.split("\n")))
console.log(co2Scrubber(text.split("\n")))

console.log(parseInt(co2Scrubber(text.split("\n")), 2)*parseInt(oxygenGenerator(text.split("\n")), 2))