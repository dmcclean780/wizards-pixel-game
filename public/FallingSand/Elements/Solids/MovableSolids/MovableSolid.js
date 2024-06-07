import { Empty } from "../../Empty.js";
import { Liquid } from "../../Liquids/Liquid.js";
import { Solid } from "../Solid.js";

class MovableSolid extends Solid {
    

    move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, updatedPositions, chunkSize){

        var velocity = this.getAlpha(theChunkContent, i)
        //console.log(velocity)
        var moveDownPossible=this.moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, updatedPositions, velocity, chunkSize);
        if(!Number.isInteger(moveDownPossible)){
            return moveDownPossible;
        }

        var dir = Math.random() < 0.5;
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
        var newChunkUpdateStatus = false
        var allChunks= [newChunkContent, newChunkUpdateStatus, neighbourChunksContent]
        return allChunks

    }

    moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, updatedPositions, velocity, chunkSize) {
        var belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize)
        if (this.density > belowElement.density) {
            for (var j = 0; j < velocity; j++) {
                var belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize)
                if (this.density > belowElement.density && !(belowElement instanceof Solid) && updatedPositions.includes(i + chunkSize) == false && i + chunkSize < chunkSize *  chunkSize) {
                    newChunkContent= this.swapPositions(newChunkContent, updatedPositions, i, i +  chunkSize)
                    i = i +  chunkSize
                }
                else {
                    var belowChunkContent = neighbourChunksContent[4]
                    var newBelowChunkContent = newNeighbourChunksContent[4]
                    if(belowChunkContent != -1){
                        belowElement=this.getNeighbourElement(belowChunkContent, i%chunkSize)
                        if(this.density > belowElement.density && !(belowElement instanceof Solid)){
                            [newChunkContent, newBelowChunkContent]=this.swapPositionsBetweenChunk(newChunkContent, newBelowChunkContent, updatedPositions, i, i%chunkSize)
                            neighbourChunksContent[4]=newBelowChunkContent
                            var newChunkUpdateStatus = true
                            var allChunks= [newChunkContent, newChunkUpdateStatus, neighbourChunksContent]
                            return allChunks
                        }
                    }
                    /*
                    velocity = 9 - velocity;
                    
                    newChunkContent.content = this.updateAlphaByte(newChunkContent.content, velocity, i);
                    var allChunks= [newChunkContent, neighbourChunksContent]
                    return allChunks
                    */
                }
            }
            if (velocity < this.terminalVelocity) {
                velocity++;
            }

            newChunkContent= this.updateAlphaByte(newChunkContent, velocity, i)
            var newChunkUpdateStatus = true
            var allChunks= [newChunkContent, newChunkUpdateStatus, neighbourChunksContent]
            return allChunks
        }
        return -1;
    }

    moveDownDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions){
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

    moveDownDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions){
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

    moveHorizontalLeft(i, canvasData, newGameArray, updatedPositions, velocity){
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

    moveHorizontalRight(i, canvasData, newGameArray, updatedPositions, velocity){
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