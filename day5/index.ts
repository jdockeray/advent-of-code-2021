type Cood = [number, number];
export type Path = [Cood, Cood];
type PathMap = Map<string, number>;


function numberRange(start: number, end: number): number[] {
  return new Array(end - start).fill(0).map((d, i) => i + start);
}

export async function parseData(path = "input.txt") {
  const text = await (await Deno.readTextFile(path)).split("\n");
  const paths = formatRows(text);

  let pathMap = new Map();
  paths.forEach((p) => {
    pathMap = drawPath(pathMap, p);
  });

  let count = 0;
  for (const [_key, value] of pathMap) {
    if (value >= 2) {
      count = count + 1;
    }
  }
  return count;
}

export function formatRow(str: string): Path {
  const [x1, y1, x2, y2] = str.replace(" -> ", ",").split(",").map(parseFloat);
  return [[x1, y1], [x2, y2]];
}

export function formatRows(strArr: string[]): Path[] {
  return strArr.map(formatRow);
}

export function drawPath(pathMap: PathMap, path: Path): PathMap {
  if(isValidDiagnol(path)){
    return plotLine(pathMap, getDiagnolLine(path))
  }
  if (isValidHorizontal(path)) {
    return plotLine(pathMap, getHorizontalLine(path));
  }
  if (isValidVertical(path)) {
    return plotLine(pathMap, getVerticalLine(path));
  }

  return pathMap;
}

export function isValidHorizontal([[_x1, y1], [_x2, y2]]: Path): boolean {
  return y1 === y2;
}

export function isValidVertical([[x1, _y1], [x2, _y2]]: Path): boolean {
  return x1 === x2;
}

export function isValidDiagnol(path: Path): boolean {
  return !(isValidHorizontal(path) || isValidVertical(path));
}

export function getVerticalLine([[_x1, y1], [x, y2]]: Path): Cood[] {
  const min = y1 > y2 ? y2 : y1;
  const max = y1 > y2 ? y1 : y2;
  return numberRange(min, max + 1).map((n) => [x, n]);
}

export function getHorizontalLine([[x1, y], [x2, _y]]: Path): Cood[] {
  const min = x1 > x2 ? x2 : x1;
  const max = x1 > x2 ? x1 : x2;
  return numberRange(min, max + 1).map((n) => [n, y]);
}

export function getDiagnolLine([[x1, y1], [x2, y2]]: Path): Cood[] {
  const xMin = x1 > x2 ? x2 : x1;
  const xMax = x1 > x2 ? x1 : x2;

  const yMin = y1 > y2 ? y2 : y1;
  const yMax = y1 > y2 ? y1 : y2;

  const isXasc = x1 > x2 ? false : true
  const isYasc = y1 > y2 ? false : true


  let x = numberRange(xMin, xMax + 1).map((n) => {
    return n;
  });

  if(isXasc){
    x = x.reverse()
  }

  let y =  numberRange(yMin, yMax + 1).map((n) => {
    return n;
  });

  if(isYasc){
    y = y.reverse()
  }

 return  x.map((cood, i) => [cood, y[i]]);
}

export function plotLine(map: PathMap, line: Cood[]): PathMap {
  line.forEach((cood) => {
    const hash = getCoodHash(cood);
    if (map.has(hash)) {
      const currentVal = map.get(hash);
      if (currentVal !== undefined) { // ts needs this for maps
        map.set(hash, currentVal + 1);
      }
    } else {
      map.set(hash, 1);
    }
  });
  return map;
}

export function getCoodHash(cood: Cood) {
  return cood.toString();
}

console.log(await parseData());

