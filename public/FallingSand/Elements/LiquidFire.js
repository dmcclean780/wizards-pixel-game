import { Element } from "./Elements.js";
import { getElementByName } from "../nameElementMap.js";
import { Liquid } from "./Liquids/Liquid.js";
import { Oil } from "./Liquids/Oil.js";
import { Empty } from "./Empty.js";
import { MovableSolid } from "./Solids/MovableSolids/MovableSolid.js";
import { ImmovableSoild } from "./Solids/ImmovableSolids/ImmovableSolid.js";

class LiquidFire extends Element{
    colour=[0x008CFF, 0x0045FF, 0x00A5FF, 0x00D7FF, 0x00CDFF, 0x004DFF, 0x00D5FF];
    density=0.1

    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        newGameArray=this.moveAsLiquid(newGameArray, gameArray, canvasData, updatedPositions, i);
        newGameArray = this.updateFire(gameArray, i, canvasData, updatedPositions, newGameArray);
        //newGameArray = this.genNewFire(i, canvasData, updatedPositions, newGameArray);
        return newGameArray
    }

    changeStateToGas(neighbour, newGameArray, nextIndex){
        var gasState=getElementByName(neighbour.gasState);
        var alpha = Math.floor(Math.random() * 15+206);
        var colour= gasState.colour | (alpha<<24);
        newGameArray[nextIndex]=colour;
        return newGameArray
    }

    spreadFire(newGameArray, nextIndex, neighbour){
        var alpha = Math.floor(Math.random() * 15+206);
        var colour = this.colour[Math.floor(Math.random()*6)] | (alpha<<24);
        if(neighbour instanceof Liquid || neighbour instanceof MovableSolid){
            var colour=(this.colour[Math.floor(Math.random()*6)]) | (alpha<<24);
        }
        else{
            var colour = (getElementByName("solid fire").colour[Math.floor(Math.random()*6)]) | (alpha<<24);
        }
        newGameArray[nextIndex]=colour;
        return newGameArray;
    }

    genNewFire(i, canvasData, updatedPosition, newGameArray){
        var genNewFire=Math.random()
        var fireHeight=Math.floor(Math.random()*10)
        var neighbour=this.getNeighbourElement(newGameArray, i-canvasData.width*fireHeight)
        if(genNewFire>0.3 && neighbour instanceof Empty){
            newGameArray=this.spreadFire(newGameArray, i-canvasData.width*fireHeight, new ImmovableSoild)
        }
        return newGameArray
    }

    updateFire(gameArray, i, canvasData, updatedPosition, newGameArray){
        var fireLife = this.getAlpha(gameArray, i);
        for(var j=-1; j<2; j++){
            for(var k=-1; k<2; k++){
                var nextIndex=i+(canvasData.width*j+k);
                if(nextIndex != i && nextIndex>0 && nextIndex<canvasData.width*canvasData.height && nextIndex%canvasData.width!=0 && nextIndex%canvasData.width!=canvasData.width-1){
                    var neighbour = this.getNeighbourElement(gameArray, nextIndex)
                    var aboveNeighbour=this.getNeighbourElement(gameArray, nextIndex-canvasData.width)
                    var leftNeighbour=this.getNeighbourElement(gameArray, nextIndex+1)
                    var rightNeighbour=this.getNeighbourElement(gameArray, nextIndex-1)
                    var belowNeighour=this.getNeighbourElement(gameArray, nextIndex+canvasData.width)
                    var spreadFire = Math.random()*1000
                    if(spreadFire>neighbour.fireResistance && (aboveNeighbour instanceof Empty || leftNeighbour instanceof Empty || rightNeighbour instanceof Empty || belowNeighour instanceof Empty)){
                        newGameArray=this.spreadFire(newGameArray, nextIndex, neighbour)
                    }
                    if(neighbour instanceof Liquid && !(neighbour instanceof Oil) && updatedPosition.includes(nextIndex)==false){
                        var evaporate=Math.random()>0.3;
                        if(evaporate){
                            newGameArray=this.changeStateToGas(neighbour, newGameArray, nextIndex);
                        }
                        else{
                            newGameArray[i]=0x00000000
                        }
                       
                        updatedPosition.push(nextIndex);
                    }
                }
            }
            var fireDecrease=Math.random()*1000>950
            if(fireDecrease){
                fireLife--
            }
            if(fireLife==0){
                newGameArray[i]=0x00000000;
            }
            newGameArray=this.updateAlphaByte(newGameArray, fireLife, i);
        }
        return newGameArray
    }

    moveAsLiquid(newGameArray, gameArray, canvasData, updatedPositions, i){
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

export{LiquidFire};