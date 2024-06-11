import { Empty } from "../../Empty.js";
import { Liquid } from "../../Liquids/Liquid.js";
import { Solid } from "../Solid.js";

class MovableSolid extends Solid {


    move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize, chunkUpdatedPositions, neighbourUpdatedPositions) {

        let velocity = this.getAlpha(theChunkContent, i)
        if(velocity>31){
            velocity=31
        }
        //console.log(velocity)
        const moveDownPossible = this.moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize);
        //console.log(moveDownPossible)
        if (!Number.isInteger(moveDownPossible)) {
            return moveDownPossible;
        }

        const dir = Math.random() < 0.5;
        /*
        if (dir) {

            var moveHorizontalRightPossible=this.moveHorizontalRight(i, canvasData, newGameArray, updatedPositions, velocity)
            if(!Number.isInteger(moveHorizontalRightPossible)){
                return moveHorizontalRightPossible
            }

            var moveDownDiagonalRightPossible=this.moveDownDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions)
            if(!Number.isInteger(moveDownDiagonalRightPossible)){
                return moveDownDiagonalRightPossible
            }
    
        }

        if(!dir){
            var moveHorizontalLeftPossible=this.moveHorizontalLeft(i, canvasData, newGameArray, updatedPositions, velocity)
            if(!Number.isInteger(moveHorizontalLeftPossible)){
                return moveHorizontalLeftPossible
            }
    
            var moveDownDiagonalLeftPossible=this.moveDownDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions)
            if(!Number.isInteger(moveDownDiagonalLeftPossible)){
                return moveDownDiagonalLeftPossible
            }
        }
*/
        //console.log("hello")

        let result = new Array(2)
        result[0] = newChunkContent
        result[1] = newNeighbourChunksContent

        return result

    }

    moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize) {
        let crossedBorder=false
        let belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize)
        if (this.density > belowElement.density) {
            for (var j = 0; j < velocity; j++) {
                belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize)
                if (this.density > belowElement.density && !(belowElement instanceof Solid) && chunkUpdatedPositions.includes(i + chunkSize) == false && i + chunkSize < chunkSize * chunkSize && crossedBorder==false ) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize) 
                    i = i + chunkSize
                }
                else {
                    if(i + chunkSize >= chunkSize * chunkSize || crossedBorder == true){
                        const belowChunkContent = neighbourChunksContent[4]
                        let destinationIndex;
                        if (belowChunkContent != -1) {
                            
                            if(crossedBorder == false){
                                destinationIndex=i%chunkSize
                                belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex)
                                if (this.density > belowElement.density && !(belowElement instanceof Solid) && neighbourUpdatedPositions[4].includes(destinationIndex) == false) {
                                    const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex)

                                    newChunkContent = returnedData[0]
                                    newNeighbourChunksContent[4] = returnedData[1]

                                    i=i%chunkSize
                                    crossedBorder=true
                                }
                            }
                            else{
                                destinationIndex=i + chunkSize
                                belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex)
                                if (this.density > belowElement.density && !(belowElement instanceof Solid) && neighbourUpdatedPositions[4].includes(destinationIndex) == false){
                                    newNeighbourChunksContent[4] = this.swapPositions(newNeighbourChunksContent[4], neighbourUpdatedPositions[4], i, i + chunkSize)
                                    
                                    i=i+chunkSize
                                }
                            }
                        }
                    }
                }
            }
            if (velocity < this.terminalVelocity) {
                velocity++;
            }

            newChunkContent = this.updateAlphaByte(newChunkContent, velocity, i)

            let result = new Array(2)
            result[0] = newChunkContent
            result[1] = newNeighbourChunksContent

            if((newChunkContent instanceof Array)){
                //console.log(newChunkContent)
            }
            
            return result
        }
        return -1;
    }

    moveDownDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i + canvasData.width - 1 < canvasData.width * canvasData.height && updatedPositions.indexOf(i + canvasData.width - 1) == -1 && i % canvasData.width != 0) {
            var adjacentElement = this.getNeighbourElement(gameArray, i - 1);
            if (this.density > adjacentElement.density) {
                var destinationElement = this.getNeighbourElement(gameArray, i + canvasData.width - 1);
                if (this.density > destinationElement.density && destinationElement instanceof Liquid || destinationElement instanceof Empty) {
                    newGameArray = this.swapPositions(newGameArray, updatedPositions, i, i + canvasData.width - 1)
                    return newGameArray;
                }
            }
        }
        return -1;
    }

    moveDownDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i + canvasData.width + 1 < canvasData.width * canvasData.height && updatedPositions.indexOf(i + canvasData.width + 1) == -1 && i % canvasData.width != canvasData.width - 1) {
            var adjacentElement = this.getNeighbourElement(gameArray, i + 1);
            if (this.density > adjacentElement.density) {
                var destinationElement = this.getNeighbourElement(gameArray, i + canvasData.width + 1);
                if (this.density > destinationElement.density && destinationElement instanceof Liquid || destinationElement instanceof Empty) {
                    newGameArray = this.swapPositions(newGameArray, updatedPositions, i, i + canvasData.width + 1)
                    return newGameArray;
                }
            }
        }
        return -1;
    }

    moveHorizontalLeft(i, canvasData, newGameArray, updatedPositions, velocity) {
        if (velocity > 0) {
            for (var j = 0; j < velocity; j++) {
                var adjacentElement = this.getNeighbourElement(newGameArray, i - 1);
                if (this.density > adjacentElement.density && updatedPositions.includes(i - 1) == false && i % canvasData.width != 0) {
                    newGameArray = this.swapPositions(newGameArray, updatedPositions, i, i - 1)
                    i = i - 1
                }
                else {
                    var FrictionChance = Math.random()
                    if (FrictionChance > 1 - this.inertialResistance) {
                        velocity--
                    }
                    newGameArray = this.updateAlphaByte(newGameArray, velocity, i)
                    return newGameArray
                }
            }
            var FrictionChance = Math.random()
            if (FrictionChance > 1 - this.inertialResistance) {
                velocity--
            }
            newGameArray = this.updateAlphaByte(newGameArray, velocity, i)
            return newGameArray;

        }
        return -1;
    }

    moveHorizontalRight(i, canvasData, newGameArray, updatedPositions, velocity) {
        if (velocity > 0) {
            for (var j = 0; j < velocity; j++) {
                var adjacentElement = this.getNeighbourElement(newGameArray, i + 1);
                if (this.density > adjacentElement.density && updatedPositions.includes(i + 1) == false && i % canvasData.width != 0) {
                    newGameArray = this.swapPositions(newGameArray, updatedPositions, i, i + 1)
                    i = i + 1
                }
                else {
                    var FrictionChance = Math.random();
                    if (FrictionChance > 1 - this.inertialResistance) {
                        velocity--
                    }
                    newGameArray = this.updateAlphaByte(newGameArray, velocity, i)
                    return newGameArray
                }
            }
            var FrictionChance = Math.random()
            if (FrictionChance > 1 - this.inertialResistance) {
                velocity--
            }
            newGameArray = this.updateAlphaByte(newGameArray, velocity, i)
            return newGameArray
        }
        return -1
    }
}

export { MovableSolid }