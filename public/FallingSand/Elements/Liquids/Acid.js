
import { Liquid } from "./Liquid.js";

class Acid extends Liquid{
    density=1;
    acidStrength=0.5;
    acidResistance=0.5;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=3;
    inertialResistance=0;
    colour=0x2FFFAD;
    fireResistance=1000;
    flammable=false;
    dispertionRate=50;
    gasState= "steam";
    liquidState="";
    resistivity=1;

    moveDown(i, gameArray, canvasData, newGameArray, updatedPositions, velocity) {
        var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width);
        if(this.density>belowElement.density || this.acidStrength>belowElement.acidResistance){
            for(var j=0; j<velocity; j++){
                if(i+canvasData.width<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width)==-1){
                    var destinationElement = this.getNeighbourElement(gameArray, i+canvasData.width)
                    if(this.density>destinationElement.density || this.acidStrength>destinationElement.acidResistance){
                        if((this.acidStrength)/2>destinationElement.acidResistance){
                            newGameArray=this.swapPositions2xAcid(newGameArray, updatedPositions, i, i+canvasData.width)
                            i=i+canvasData.width
                        }
                        if(this.acidStrength>destinationElement.acidResistance){
                            newGameArray=this.swapPositionsAcid(newGameArray, updatedPositions, i, i+canvasData.width)
                            return newGameArray
                        }
                        else{
                            newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width);
                            i=i+canvasData.width
                        }
                        
                    }
                    else{
                        return newGameArray
                    }
                    
                }
            }
            if(velocity<this.terminalVelocity){
                velocity++;
            }
            newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
            return newGameArray;
        }
        return -1;
    }

    moveDownDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if(i+canvasData.width-1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width-1)==-1 && i%canvasData.width!=0){
            var adjacentElement=this.getNeighbourElement(gameArray, i-1);
            if(this.density>adjacentElement.density){
                var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width-1);
                if(this.density>destinationElement.density || this.acidStrength>destinationElement.acidResistance){
                    if((this.acidStrength)/2>destinationElement.acidResistance){
                        newGameArray=this.swapPositions2xAcid(newGameArray, updatedPositions, i, i+canvasData.width-1)
                        return newGameArray
                    }
                    if(this.acidStrength>destinationElement.acidResistance){
                        newGameArray=this.swapPositionsAcid(newGameArray, updatedPositions, i, i+canvasData.width-1)
                        return newGameArray
                    }
                    else{
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width-1)
                        return newGameArray
                    }
                }
            }
        }
        return -1;
    }

    moveDownDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if(i+canvasData.width+1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width+1)==-1 && i%canvasData.width!=canvasData.width-1){
            var adjacentElement = this.getNeighbourElement(gameArray, i+1);
            if(this.density>adjacentElement.density){
                var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width+1);
                if(this.density>destinationElement.density || this.acidStrength>destinationElement.acidResistance){
                    if((this.acidStrength)/2>destinationElement.acidResistance){
                        newGameArray=this.swapPositions2xAcid(newGameArray, updatedPositions, i, i+canvasData.width+1)
                        return newGameArray
                    }
                    if(this.acidStrength>destinationElement.acidResistance){
                        newGameArray=this.swapPositionsAcid(newGameArray, updatedPositions, i, i+canvasData.width+1)
                        return newGameArray
                    }
                    else{
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+canvasData.width+1);
                        return newGameArray
                    }
                }
            }
            
        }
        return -1;
    }

    moveHorizontalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for(var j=0; j<this.dispertionRate; j++){
            var adjacentElement = this.getNeighbourElement(newGameArray, i-1);
            var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
            if(this.density>adjacentElement.density && this.density<=belowElement.density && updatedPositions.includes(i-1)==false && i%canvasData.width!=0 || this.acidStrength>adjacentElement.acidResistance){
                if((this.acidStrength)/2>adjacentElement.acidResistance){
                   newGameArray=this.swapPositions2xAcid(newGameArray, updatedPositions, i, i-1)
                }
                else{
                    if(this.acidStrength>adjacentElement.acidResistance){
                        newGameArray=this.swapPositionsAcid(newGameArray, updatedPositions, i, i-1)
                        return newGameArray
                    }
                    else{
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i-1)
                    }
                }
                i=i-1
            }
            else{
                return newGameArray
            }
        }
        return -1;
    }

    moveHorizontalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for(var j=0; j<this.dispertionRate; j++){
            var adjacentElement = this.getNeighbourElement(newGameArray, i+1);
            var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
            if(this.density>adjacentElement.density && this.density<=belowElement.density && updatedPositions.includes(i+1)==false && i%canvasData.width!=canvasData.width-1 || this.acidStrength>adjacentElement.acidResistance){
                if((this.acidStrength)/2>adjacentElement.acidResistance){
                    newGameArray=this.swapPositions2xAcid(newGameArray, updatedPositions, i, i+1)
                }
                else{
                    if(this.acidStrength>adjacentElement.acidResistance){
                        newGameArray=this.swapPositionsAcid(newGameArray, updatedPositions, i, i+1)
                        return newGameArray
                    }
                    else{
                        newGameArray=this.swapPositionsLiquid(newGameArray, updatedPositions, i, i+1)
                    }
                }
                i=i+1
            }
            else{
                return newGameArray
            }
        }
        return -1;
    }

    
    
}

export{Acid}