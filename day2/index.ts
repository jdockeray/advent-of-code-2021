const text = await Deno.readTextFile("./input.txt");
const splitBySpace = (s: string): [string, string] =>
  s.split(" ") as [string, string];
const convert = (
  [s, n]: [string, string],
): [string, number] => [s, parseFloat(n)];
const instructions = text.split("\n").map(splitBySpace).map(convert);

function part1() {
  const position = {
    x: 0,
    y: 0,
  };
  for (const [command, unit] of instructions) {
    switch (command) {
      case "forward":
        position.x = position.x + unit;
        break;
      case "up":
        position.y = position.y - unit;
        break;
      case "down":
        position.y = position.y + unit;
    }
  }
  console.log("part1:")
  console.log(position.x * position.y);
}
part1();


function part2() {
    const position = {
      x: 0,
      y: 0,
      a: 0
    };
    for (const [command, unit] of instructions) {
      switch (command) {
        case "forward":
          position.x = position.x + unit;
          position.y = position.y + (position.a * unit)
          break;
        case "up":
          position.a = position.a - unit;
          break;
        case "down":
          position.a = position.a + unit;
      }
    }
    console.log("part 2")
    console.log(position.x * position.y);
  }
  part2()