export function RNG(min, max) {
    let res = Math.floor((Math.random() * (max-min+1))+min)
    return res
}

export function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}