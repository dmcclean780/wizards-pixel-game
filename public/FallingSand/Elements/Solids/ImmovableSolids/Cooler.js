import { Steam } from "../../Gases/Steam.js";
import {ImmovableSoild} from "./ImmovableSolid.js"
import { getElementByName} from "../../../nameElementMap.js"

class Cooler extends ImmovableSoild{

    colour=0xFFFF00;

    move(i, gameArray, canvasData, newGameArray, updatedPosition){
        for(var j=-1; j<2; j++){
            for(var k=-1; k<2; k++){
                var nextIndex=i+(canvasData.width*j+k);
                if(nextIndex != i && nextIndex>0 && nextIndex<canvasData.width*canvasData.height && nextIndex%canvasData.width!=0 && nextIndex%canvasData.width!=canvasData.width-1){
                    var neighbour = this.getNeighbourElement(gameArray, nextIndex)
                    if(neighbour instanceof Steam && updatedPosition.includes(nextIndex)==false){
                        var condense=Math.random()>0.995;
                        if(condense){
                            newGameArray=this.changeStateToLiquid(neighbour, newGameArray, nextIndex);
                            updatedPosition.push(nextIndex);
                        }
                    }
                }
            }
        }
        return newGameArray;
    }

    changeStateToLiquid(neighbour, newGameArray, nextIndex){
        var gasState=getElementByName(neighbour.liquidState);
        var alpha = Math.floor(Math.random() * 15+206);
        var colour= gasState.colour | (alpha<<24);
        newGameArray[nextIndex]=colour;
        return newGameArray
    }
}

export {Cooler};