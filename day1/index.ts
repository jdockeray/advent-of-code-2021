const text = await Deno.readTextFile("./input.txt");
const measurements = text.split("\n").map(parseFloat);

// part 1
function part1()  {
    let count = 0;
    for (let i = 0; i < measurements.length -1 ; i++) {
      const [pv, cv] = measurements.slice(i, i + 2);
    
      if (cv > pv) {
        count=count+1;
      }
    }
    console.log("====")
    console.log('part 1')
    console.log(count);
    console.log("====")

}

// part 2
function part2()  {
    let count = 0;
    for (let i = 1; i < measurements.length -2 ; i++) {
      const [x1, x2, x3] = measurements.slice(i, i + 4);
      const [y1, y2, y3] = measurements.slice(i-1, i-1 + 4);

      if ((x1+x2+x3) > (y1+y2+y3)) {
        count=count+1;
      }
    }
    console.log("====")
    console.log('part 2')
    console.log(count);
    console.log("====")

}

part1()
part2()