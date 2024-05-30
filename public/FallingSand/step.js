import {getElement } from "./ElementColourMap.js";
import { Element } from "./Elements/Elements.js";

function step(gameArray, canvasData, newGameArray){
    newGameArray=gameArray.slice()
    var updatedPositions=[];
    /*
    var waterCount=0;
    var oilCount=0;
    var sandCount=0;
    */
    for(var i=0; i<gameArray.length; i++){
        var colour=gameArray[i];
        colour &= 0x00ffffff;
        var element=getElement(colour);
        /*
        if(element instanceof Water){
            waterCount++;
        }
        if(element instanceof Oil){
            oilCount++;
        }
        if(element instanceof Sand){
            console.log(data.toString(16), velocity.toString(16), colour.toString(16));
        }
        */
    
        
        newGameArray=element.move(i, gameArray, canvasData, newGameArray, updatedPositions);
    }
    /*
    console.log("water",waterCount);
    console.log("oil",oilCount);
    console.log("sand", sandCount)
    */
    
    return newGameArray;
}




export {step};