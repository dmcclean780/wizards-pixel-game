import {getElement } from "./ElementColourMap.js";

function step(gameArray, canvasData, newGameArray){
    newGameArray=gameArray.slice()
    var updatedPositions=[];
    for(var i=0; i<gameArray.length; i++){
        var colour=gameArray[i];
        colour &= 0x00ffffff;
        var element=getElement(colour);
        newGameArray=element.move(i, gameArray, canvasData, newGameArray, updatedPositions);
    }
    
    return newGameArray;
}




export {step};