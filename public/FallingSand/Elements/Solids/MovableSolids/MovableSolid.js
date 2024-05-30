import { Empty } from "../../Empty.js";
import { Liquid } from "../../Liquids/Liquid.js";
import { Solid } from "../Solid.js";

class MovableSolid extends Solid{
    inertialResistance;

    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        var velocity = this.getAlpha(gameArray, i)
        var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
        if(this.density>belowElement.density){
            for(var j=0; j<velocity; j++){
                var belowElement = this.getNeighbourElement(gameArray, i+canvasData.width)
                if(this.density>belowElement.density && !(belowElement instanceof Solid) && updatedPositions.includes(i+canvasData.width)==false && i+canvasData.width<canvasData.width*canvasData.height){
                    newGameArray=this.swapPositions(newGameArray, updatedPositions, i, i+canvasData.width)
                    i=i+canvasData.width
                }
                else{
                    velocity=9-velocity;
                    newGameArray=this.updateAlphaByte(newGameArray, velocity, i);
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
            
            if(velocity>0){
                for(var j=0; j<velocity; j++){
                    var adjacentElement = this.getNeighbourElement(newGameArray, i+1);
                    if(this.density>adjacentElement.density && updatedPositions.includes(i+1)==false && i%canvasData.width!=0){
                        newGameArray=this.swapPositions(newGameArray, updatedPositions, i, i+1)
                        i=i+1
                    }
                    else{
                        var FrictionChance=Math.random();
                        if(FrictionChance>1-this.inertialResistance){
                            velocity --
                        }
                        newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
                        return newGameArray
                    }
                }
                var FrictionChance=Math.random()
                if(FrictionChance>1-this.inertialResistance){
                    velocity --
                }
                newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
                
            }

            if(i+canvasData.width+1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width+1)==-1 && i%canvasData.width!=canvasData.width-1){
                var adjacentElement = this.getNeighbourElement(gameArray, i+1);
                if(this.density>adjacentElement.density){
                    var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width+1);
                    if(this.density>destinationElement.density && destinationElement instanceof Liquid || destinationElement instanceof Empty){
                        newGameArray=this.swapPositions(newGameArray, updatedPositions, i, i+canvasData.width+1)
                    }
                }
            }

            return newGameArray
        }
        
        if(velocity>0){
            for(var j=0; j<velocity; j++){
                var adjacentElement = this.getNeighbourElement(newGameArray, i-1);
                if(this.density>adjacentElement.density && updatedPositions.includes(i-1)==false && i%canvasData.width!=0){
                    newGameArray=this.swapPositions(newGameArray, updatedPositions, i, i-1)
                    i=i-1
                }
                else{
                    var FrictionChance=Math.random()
                    if(FrictionChance>1-this.inertialResistance){
                        velocity --
                    }
                    newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
                    return newGameArray
                }
            }
            var FrictionChance=Math.random()
            if(FrictionChance>1-this.inertialResistance){
                velocity --
            }
            newGameArray =this.updateAlphaByte(newGameArray, velocity, i)
            
        }

        if(i+canvasData.width-1<canvasData.width*canvasData.height && updatedPositions.indexOf(i+canvasData.width-1)==-1 && i%canvasData.width!=0){
            var adjacentElement=this.getNeighbourElement(gameArray, i-1);
            if(this.density>adjacentElement.density){
                var destinationElement=this.getNeighbourElement(gameArray, i+canvasData.width-1);
                if(this.density>destinationElement.density && destinationElement instanceof Liquid || destinationElement instanceof Empty){
                    newGameArray=this.swapPositions(newGameArray, updatedPositions, i, i+canvasData.width-1)
                }
            }
        }
            
        return newGameArray;
        
        
    }
}

export {MovableSolid}