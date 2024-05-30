import { Element } from "../Elements.js";


class Liquid extends Element{
    dispertionRate;
    gasState;


    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        var velocity = this.getAlpha(gameArray, i)
        var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
        if(this.density>belowElement.density){
            for(var j=0; j<velocity; j++){
                var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
                if(this.density>belowElement.density && updatedPositions.includes(i+canvasData.width)==false && i+canvasData.width<canvasData.width*canvasData.height){
                    newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width)
                    i=i+canvasData.width
                }
                else{
                    return newGameArray
                }
            }
            if(velocity<this.terminalVelocity){
                velocity++;
            }
            newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
            return newGameArray;
        }
        var dir=Math.random() < 0.5;
        if(dir){
            if(i+canvasData.width+1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width+1)==-1 && i%canvasData.width!=canvasData.width-1){
                var adjacentElement = this.getNeighbourElement(gameArray, i+1);
                if(this.density>adjacentElement.density){
                    var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width+1);
                    if(this.density>destinationElement.density){
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width+1)
                        return newGameArray
                    }
                }
                
            }
        }
        if(i+canvasData.width-1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width-1)==-1 && i%canvasData.width!=0){
            var adjacentElement=this.getNeighbourElement(gameArray, i-1);
            if(this.density>adjacentElement.density){
                var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width-1);
                if(this.density>destinationElement.density){
                    newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width-1)
                    return newGameArray
                }
            }
        }
        dir=Math.random() < 0.5;
        if(dir){
            for(var j=0; j<this.dispertionRate; j++){
                var adjacentElement = this.getNeighbourElement(newGameArray, i+1);
                var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
                if(this.density>adjacentElement.density && this.density<=belowElement.density && updatedPositions.includes(i+1)==false && i%canvasData.width!=canvasData.width-1){
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
            var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
            if(this.density>adjacentElement.density && this.density<=belowElement.density && updatedPositions.includes(i-1)==false && i%canvasData.width!=0){
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



export{Liquid};