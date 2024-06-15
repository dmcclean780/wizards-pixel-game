import { Empty } from "../../Empty.js";
import { Liquid } from "../../Liquids/Liquid.js";
import { Solid } from "../Solid.js";

class MovableSolid extends Solid {


    move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize, chunkUpdatedPositions, neighbourUpdatedPositions) {

        let velocity = this.getAlpha(theChunkContent, i)
        if (velocity > 31) {
            velocity = 31
        }
        //console.log(velocity)
        const moveDownPossible = this.moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize);
        //console.log(moveDownPossible)
        if (!Number.isInteger(moveDownPossible)) {
            return moveDownPossible;
        }

        const dir = Math.random() > 0.5;

        if (dir) {

            const moveHorizontalRightPossible = this.moveHorizontalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize)
            if (!Number.isInteger(moveHorizontalRightPossible)) {
                return moveHorizontalRightPossible
            }


            const moveDownDiagonalRightPossible = this.moveDownDiagonalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveDownDiagonalRightPossible)) {
                return moveDownDiagonalRightPossible
            }

        }

        else {

            const moveHorizontalLeftPossible = this.moveHorizontalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize)
            if (!Number.isInteger(moveHorizontalLeftPossible)) {
                return moveHorizontalLeftPossible
            }

            const moveDownDiagonalLeftPossible = this.moveDownDiagonalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveDownDiagonalLeftPossible)) {
                return moveDownDiagonalLeftPossible
            }

        }

        //console.log("hello")

        let result = new Array(2)
        result[0] = newChunkContent
        result[1] = newNeighbourChunksContent

        return result

    }

    moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize) {
        let crossedBorder = false;
    
        const updateVelocity = (content, vel, idx) => {
            content = this.updateAlphaByte(content, vel, idx);
            return [content, newNeighbourChunksContent];
        };
    
        let belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
    
        if (this.density > belowElement.density) {
            for (let j = 0; j < velocity; j++) {
                belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
    
                if (this.density > belowElement.density && !(belowElement instanceof Solid) && !chunkUpdatedPositions.includes(i + chunkSize) && i + chunkSize < chunkSize * chunkSize && !crossedBorder) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize);
                    i += chunkSize;
                } else {
                    const belowChunkContent = neighbourChunksContent[4];
    
                    if (belowChunkContent !== -1) {
                        if (i + chunkSize >= chunkSize * chunkSize) {
                            let destinationIndex = i % chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
    
                            if (this.density > belowElement.density && !(belowElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(destinationIndex)) {
                                const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex);
    
                                newChunkContent = returnedData[0];
                                newNeighbourChunksContent[4] = returnedData[1];
    
                                i = i % chunkSize;
                                crossedBorder = true;
                            }
                        }
    
                        if (crossedBorder) {
                            let destinationIndex = i + chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
    
                            if (this.density > belowElement.density && !(belowElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(destinationIndex)) {
                                newNeighbourChunksContent[4] = this.swapPositions(newNeighbourChunksContent[4], neighbourUpdatedPositions[4], i, i + chunkSize);
                                i += chunkSize;
                            }
                        } else {
                            return updateVelocity(newChunkContent, 9 - velocity, i);
                        }
                    }
                }
            }
    
            if (velocity < this.terminalVelocity) {
                velocity++;
            }
    
            return updateVelocity(newChunkContent, velocity, i);
        }
    
        return -1;
    }
    

    moveDownDiagonalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {
        const moveBetweenChunks = (currentChunk, newChunk, currentPositions, newPositions, idx, newIdx) => {
            const returnedData = this.swapPositionsBetweenChunk(currentChunk, newChunk, currentPositions, newPositions, idx, newIdx);
            let result = [returnedData[0], newNeighbourChunksContent];
            result[1][1] = returnedData[1];
            return result;
        };
    
        const adjacentChunk = neighbourChunksContent[1];
        const destinationChunk = neighbourChunksContent[2];
    
        if (i % chunkSize === 0 && adjacentChunk !== -1) {
            const adjacentIndex = i + chunkSize - 1;
            const adjacentElement = this.getNeighbourElement(adjacentChunk, adjacentIndex);
    
            if (this.density > adjacentElement.density) {
                if (i === chunkSize * (chunkSize - 1) && destinationChunk !== -1) {
                    const destinationElement = this.getNeighbourElement(destinationChunk, chunkSize - 1);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[2].includes(chunkSize - 1)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[2], chunkUpdatedPositions, neighbourUpdatedPositions[2], i, chunkSize - 1);
                    }
                    return -1;
                } else {
                    const destinationElement = this.getNeighbourElement(adjacentChunk, adjacentIndex + chunkSize);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[1].includes(adjacentIndex + chunkSize)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[1], chunkUpdatedPositions, neighbourUpdatedPositions[1], i, adjacentIndex + chunkSize);
                    }
                    return -1;
                }
            }
        } else {
            const adjacentElement = this.getNeighbourElement(theChunkContent, i - 1);
            if (this.density > adjacentElement.density) {
                const destinationChunkContent = neighbourChunksContent[4];
                if (i + chunkSize - 1 > chunkSize * chunkSize && destinationChunkContent !== -1) {
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, i % chunkSize - 1);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(i % chunkSize - 1)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, i % chunkSize - 1);
                    }
                    return -1;
                }
                const destinationElement = this.getNeighbourElement(theChunkContent, i + chunkSize - 1);
                if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !chunkUpdatedPositions.includes(i + chunkSize - 1) && i % chunkSize !== 0) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize - 1);
                    return [newChunkContent, newNeighbourChunksContent];
                }
            }
        }
        return -1;
    }
    




    moveDownDiagonalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {
        const moveBetweenChunks = (currentChunk, newChunk, currentPositions, newPositions, idx, newIdx) => {
            const returnedData = this.swapPositionsBetweenChunk(currentChunk, newChunk, currentPositions, newPositions, idx, newIdx);
            let result = [returnedData[0], newNeighbourChunksContent];
            result[1][6] = returnedData[1];
            return result;
        };
    
        const adjacentChunk = neighbourChunksContent[6];
        const destinationChunk = neighbourChunksContent[7];
    
        if (i % chunkSize === chunkSize - 1 && adjacentChunk !== -1) {
            const adjacentIndex = i - chunkSize + 1;
            const adjacentElement = this.getNeighbourElement(adjacentChunk, adjacentIndex);
    
            if (this.density > adjacentElement.density) {
                if (i === (chunkSize * chunkSize) - 1 && destinationChunk !== -1) {
                    const destinationElement = this.getNeighbourElement(destinationChunk, 0);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[7].includes(0)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[7], chunkUpdatedPositions, neighbourUpdatedPositions[7], i, 0);
                    }
                    return -1;
                } else {
                    const destinationElement = this.getNeighbourElement(adjacentChunk, adjacentIndex + chunkSize);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[6].includes(adjacentIndex + chunkSize)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[6], chunkUpdatedPositions, neighbourUpdatedPositions[6], i, adjacentIndex + chunkSize);
                    }
                    return -1;
                }
            }
        } else {
            const adjacentElement = this.getNeighbourElement(theChunkContent, i + 1);
            if (this.density > adjacentElement.density) {
                const destinationChunkContent = neighbourChunksContent[4];
                if (i + chunkSize - 1 > chunkSize * chunkSize && destinationChunkContent !== -1) {
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, i % chunkSize + 1);
                    if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(i % chunkSize + 1)) {
                        return moveBetweenChunks(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, i % chunkSize + 1);
                    }
                    return -1;
                }
                const destinationElement = this.getNeighbourElement(theChunkContent, i + chunkSize + 1);
                if (this.density > destinationElement.density && !(destinationElement instanceof Solid) && !chunkUpdatedPositions.includes(i + chunkSize + 1) && i % chunkSize !== chunkSize - 1) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize + 1);
                    return [newChunkContent, newNeighbourChunksContent];
                }
            }
        }
        return -1;
    }
    

    moveHorizontalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize) {
        let crossedBorder = false;
        let moved = false;
        const chunkSizeMinus1 = chunkSize - 1;
    
        for (let j = 0; j < velocity; j++) {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i - 1);
    
            if (!crossedBorder && this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !chunkUpdatedPositions.includes(i - 1) && i % chunkSize !== 0) {
                newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i - 1);
                i--;
                moved = true;
            } else {
                const adjacentChunkContent = neighbourChunksContent[1];
    
                if (adjacentChunkContent !== -1) {
                    if (i % chunkSize === 0) {
                        const destinationIndex = i + chunkSizeMinus1;
                        adjacentElement = this.getNeighbourElement(adjacentChunkContent, destinationIndex);
    
                        if (this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !neighbourUpdatedPositions[1].includes(destinationIndex)) {
                            const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[1], chunkUpdatedPositions, neighbourUpdatedPositions[1], i, destinationIndex);
    
                            newChunkContent = returnedData[0];
                            newNeighbourChunksContent[1] = returnedData[1];
                            i = destinationIndex;
                            crossedBorder = true;
                            moved = true;
                        }
                    } else if (crossedBorder) {
                        const destinationIndex = i - 1;
                        adjacentElement = this.getNeighbourElement(adjacentChunkContent, destinationIndex);
    
                        if (this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !neighbourUpdatedPositions[1].includes(destinationIndex)) {
                            newNeighbourChunksContent[1] = this.swapPositions(newNeighbourChunksContent[1], neighbourUpdatedPositions[1], i, destinationIndex);
                            i--;
                            moved = true;
                        }
                    } else {
                        break;
                    }
                }
            }
    
            if (Math.random() > 1 - this.inertialResistance) {
                velocity--;
            }
        }
    
        newChunkContent = this.updateAlphaByte(newChunkContent, velocity, i);
    
        if (!moved) {
            return -1;
        }
    
        return [newChunkContent, newNeighbourChunksContent];
    }
    
    

    moveHorizontalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize) {
        let crossedBorder = false;
        let moved = false;
        const chunkSizeMinus1 = chunkSize - 1;
    
        for (let j = 0; j < velocity; j++) {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i + 1);
    
            if (!crossedBorder && this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !chunkUpdatedPositions.includes(i + 1) && i % chunkSize !== chunkSizeMinus1) {
                newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + 1);
                i++;
                moved = true;
            } else {
                const adjacentChunkContent = neighbourChunksContent[6];
    
                if (adjacentChunkContent !== -1) {
                    if (i % chunkSize === chunkSizeMinus1) {
                        const destinationIndex = i - chunkSizeMinus1;
                        adjacentElement = this.getNeighbourElement(adjacentChunkContent, destinationIndex);
    
                        if (this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !neighbourUpdatedPositions[6].includes(destinationIndex)) {
                            const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[6], chunkUpdatedPositions, neighbourUpdatedPositions[6], i, destinationIndex);
    
                            newChunkContent = returnedData[0];
                            newNeighbourChunksContent[6] = returnedData[1];
                            i = destinationIndex;
                            crossedBorder = true;
                            moved = true;
                        }
                    } else if (crossedBorder) {
                        const destinationIndex = i + 1;
                        adjacentElement = this.getNeighbourElement(adjacentChunkContent, destinationIndex);
    
                        if (this.density > adjacentElement.density && !(adjacentElement instanceof Solid) && !neighbourUpdatedPositions[6].includes(destinationIndex)) {
                            newNeighbourChunksContent[6] = this.swapPositions(newNeighbourChunksContent[6], neighbourUpdatedPositions[6], i, destinationIndex);
                            i++;
                            moved = true;
                        }
                    } else {
                        break;
                    }
                }
            }
    
            if (Math.random() > 1 - this.inertialResistance) {
                velocity--;
            }
        }
    
        newChunkContent = this.updateAlphaByte(newChunkContent, velocity, i);
    
        if (!moved) {
            return -1;
        }
    
        return [newChunkContent, newNeighbourChunksContent];
    }
    
    

    

}

export { MovableSolid }