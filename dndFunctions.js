import { RNG, getBaseLog } from "./utils.js";

export function rollDice(diceFaces) {
    if (diceFaces === null) { diceFaces = 20 }

    return RNG(1,diceFaces);
}

export function priceConverter(rins) {
    let res = ""
    let rin = rins % 10
    let monete = Math.floor((rins%100)/10)
    let corone = Math.floor((rins%1000)/100)
    let diamanti = Math.floor(rins/1000)
    
    if (rins>0) {
        if (rins>9) {
            if (rins>99) {
                if (rins>999) {
                    res+= diamanti+ " Dia "
                }
                res+= corone+ " Cor " 
            }
            res+= monete+ " Mon " 
        }
        res+= rin+ " Rin" 
    } 
    
    return res
}

export function randomPriceGen(min,max) {
    let res = RNG(min,max)
    return priceConverter(res)
}