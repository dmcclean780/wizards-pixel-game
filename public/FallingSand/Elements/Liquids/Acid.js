import { Steam } from "../Gases/Steam.js";
import { Liquid } from "./Liquid.js";

class Acid extends Liquid{
    density=1;
    dispertionRate=50;
    acidStrength=0.5;
    acidResistance=0.5;
    terminalVelocity=3;
    gasState= "steam";
    colour=0x2FFFAD;

    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        var velocity=this.getAlpha(gameArray, i)
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
        
        var dir=Math.random() < 0.5;
        if(dir){
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
        }
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
        dir=Math.random() < 0.5;
        if(dir){
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
            
            
        }
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
        return newGameArray
    }

    
    
}

export{Acid}