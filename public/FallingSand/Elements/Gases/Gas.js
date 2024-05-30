import { Element } from "../Elements.js";
import { Solid } from "../Solids/Solid.js";

class Gas extends Element{
    dispertionRate;
    liquidState;

    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        if(i-canvasData.width>0 && updatedPositions.indexOf(i-canvasData.width)==-1){
            var destinationElement = this.getNeighbourElement(gameArray, i-canvasData.width)
            if(this.density<destinationElement.density && !(destinationElement instanceof Solid)){
                newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i-canvasData.width)
                return newGameArray
            }
            
        }
        var dir=Math.random() < 0.5;
        if(dir){
            if(i-canvasData.width+1>0 && updatedPositions.indexOf(i-canvasData.width+1)==-1 && i%canvasData.width!=canvasData.width-1){
                var adjacentElement = this.getNeighbourElement(gameArray, i+1);
                if(this.density<adjacentElement.density && !(adjacentElement instanceof Solid)){
                    var destinationElement=this.getNeighbourElement(gameArray, i-canvasData.width+1);
                    if(this.density<destinationElement.density && !(destinationElement instanceof Solid)){
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i-canvasData.width+1)
                        return newGameArray
                    }
                }
                
            }
        }
        if(i-canvasData.width-1>0 && updatedPositions.indexOf(i-canvasData.width-1)==-1 && i%canvasData.width!=0){
            var adjacentElement=this.getNeighbourElement(gameArray, i-1);
            if(this.density<adjacentElement.density && !(adjacentElement instanceof Solid)){
                var destinationElement=this.getNeighbourElement(gameArray, i-canvasData.width-1);
                if(this.density<destinationElement.density && !(destinationElement instanceof Solid)){
                    newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i-canvasData.width-1)
                    return newGameArray
                }
            }
        }
        dir=Math.random() < 0.5;
        if(dir){
            for(var j=0; j<this.dispertionRate; j++){
                var adjacentElement = this.getNeighbourElement(newGameArray, i+1);
                var aboveElement = this.getNeighbourElement(gameArray, i-canvasData.width)
                if(this.density<adjacentElement.density && (this.density>=aboveElement.density || aboveElement instanceof Solid) && !(adjacentElement instanceof Solid) && updatedPositions.includes(i+1)==false && i%canvasData.width!=canvasData.width-1){
                    newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+1)
                    i=i+1
                }
                else{
                    return newGameArray
                }
            }
            
            
        }
        for(var j=0; j<this.dispertionRate; j++){
            var adjacentElement = this.getNeighbourElement(newGameArray, i-1);
            var aboveElement = this.getNeighbourElement(gameArray, i-canvasData.width)
            if(this.density<adjacentElement.density && (this.density>=aboveElement.density || aboveElement instanceof Solid) && !(adjacentElement instanceof Solid) && updatedPositions.includes(i-1)==false && i%canvasData.width!=0){
                newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i-1)
                i=i-1
            }
            else{
                return newGameArray
            }
        }
        return newGameArray
    }
}

export {Gas};