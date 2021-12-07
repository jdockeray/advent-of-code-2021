export async function parseData(path = "input.txt") {
    const numbers = await (await Deno.readTextFile(path)).split(",").map(parseFloat);
   const fish = changeDays(256, numbers)
   return fish.length
}



export function changeDay(fish: number[]):number[]{
    const newFish: number[] = []
    const transformFish = fish.map((f)=>{
        if(f === 0){
            newFish.push(8)
            return 6
        }
        return f - 1
    })
    return [...transformFish, ...newFish]
}

export function changeDays(days: number, fish: number[]): number[] {
    let transformFish = fish
    for(let d = 0; d < days; d++){
        transformFish = changeDay(transformFish)
    }
    return transformFish
}

console.log(await parseData())
