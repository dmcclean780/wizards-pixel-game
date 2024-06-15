import { Element } from "../Elements.js";
import { Solid } from "../Solids/Solid.js";


class Liquid extends Element {



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

        const dir = Math.random() < 0.5;

        if (dir) {




            const moveDownDiagonalRightPossible = this.moveDownDiagonalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveDownDiagonalRightPossible)) {
                return moveDownDiagonalRightPossible
            }

            var moveHorizontalRightPossible = this.moveHorizontalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveHorizontalRightPossible)) {
                return moveHorizontalRightPossible
            }

        }

        else {




            const moveDownDiagonalLeftPossible = this.moveDownDiagonalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveDownDiagonalLeftPossible)) {
                return moveDownDiagonalLeftPossible
            }

            var moveHorizontalLeftPossible = this.moveHorizontalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize)
            if (!Number.isInteger(moveHorizontalLeftPossible)) {
                return moveHorizontalLeftPossible
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
        let belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
    
        if (this.density > belowElement.density) {
            for (let j = 0; j < velocity; j++) {
                belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
                if (this.density > belowElement.density && !(belowElement instanceof Solid) && !chunkUpdatedPositions.includes(i + chunkSize) && i + chunkSize < chunkSize * chunkSize && !crossedBorder) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize);
                    i += chunkSize;
                } else {
                    const belowChunkContent = neighbourChunksContent[4];
                    if (!Number.isInteger(belowChunkContent)) {
                        if (i + chunkSize >= chunkSize * chunkSize) {
                            let destinationIndex = i % chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
                            if (this.density > belowElement.density && !(belowElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(destinationIndex)) {
                                const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex);
                                newChunkContent = returnedData[0];
                                newNeighbourChunksContent[4] = returnedData[1];
                                i = destinationIndex;
                                crossedBorder = true;
                            }
                        }
    
                        if (crossedBorder) {
                            let destinationIndex = i + chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
                            if (this.density > belowElement.density && !(belowElement instanceof Solid) && !neighbourUpdatedPositions[4].includes(destinationIndex)) {
                                newNeighbourChunksContent[4] = this.swapPositions(newNeighbourChunksContent[4], neighbourUpdatedPositions[4], i, destinationIndex);
                                i += chunkSize;
                            }
                        } 
                        else {
                            velocity = 9 - velocity;
                            newChunkContent = this.updateAlphaByte(newChunkContent, velocity, i);
                            return [newChunkContent, newNeighbourChunksContent];
                        }
                    }
                }
            }
    
            if (velocity < this.terminalVelocity) {
                velocity++;
            }
    
            newChunkContent = this.updateAlphaByte(newChunkContent, velocity, i);
            return [newChunkContent, newNeighbourChunksContent];
        }
        return -1;
    }
    

    moveDownDiagonalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {
        const chunkWidthMinusOne = chunkSize - 1;
        if (i % chunkSize === 0 && !Number.isInteger(neighbourChunksContent[1])) {
            const adjacentChunkContent = neighbourChunksContent[1];
            const adjacentIndex = i + chunkWidthMinusOne;
            const adjacentElement = this.getNeighbourElement(adjacentChunkContent, adjacentIndex);
    
            if (this.density > adjacentElement.density) {
                if (i === chunkSize * chunkWidthMinusOne && !Number.isInteger(neighbourChunksContent[2])) {
                    const destinationChunkContent = neighbourChunksContent[2];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, chunkWidthMinusOne);
    
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[2].includes(chunkWidthMinusOne)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[2], chunkUpdatedPositions, neighbourUpdatedPositions[7], i, chunkWidthMinusOne);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[2] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                } else {
                    const destinationChunkContent = neighbourChunksContent[1];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, adjacentIndex + chunkSize);
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[1].includes(adjacentIndex + chunkSize)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[1], chunkUpdatedPositions, neighbourUpdatedPositions[1], i, adjacentIndex + chunkSize);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[1] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                }
            }
        } else {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i - 1);
            if (this.density > adjacentElement.density) {
                if (i + chunkWidthMinusOne > chunkSize * chunkSize && neighbourChunksContent[4] !== -1) {
                    const destinationChunkContent = neighbourChunksContent[4];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, i % chunkSize - 1);
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[4].includes(i % chunkSize - 1)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, i % chunkSize - 1);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[4] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                }
                const destinationElement = this.getNeighbourElement(theChunkContent, i + chunkWidthMinusOne);
                if (this.density > destinationElement.density && !chunkUpdatedPositions.includes(i + chunkWidthMinusOne) && i % chunkSize !== 0) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkWidthMinusOne);
                    return [newChunkContent, newNeighbourChunksContent];
                }
            }
        }
        return -1;
    }
    





    moveDownDiagonalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {
        const chunkWidthMinusOne = chunkSize - 1;
        if (i % chunkSize === chunkWidthMinusOne && !Number.isInteger(neighbourChunksContent[6])) {
            const adjacentChunkContent = neighbourChunksContent[6];
            const adjacentIndex = i - chunkWidthMinusOne;
            const adjacentElement = this.getNeighbourElement(adjacentChunkContent, adjacentIndex);
    
            if (this.density > adjacentElement.density) {
                if (i === (chunkSize * chunkSize) - 1 && !Number.isInteger(neighbourChunksContent[7])) {
                    const destinationChunkContent = neighbourChunksContent[7];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, 0);
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[7].includes(0)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[5], chunkUpdatedPositions, neighbourUpdatedPositions[7], i, 0);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[7] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                } else {
                    const destinationChunkContent = neighbourChunksContent[6];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, adjacentIndex + chunkSize);
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[6].includes(adjacentIndex + chunkSize)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[6], chunkUpdatedPositions, neighbourUpdatedPositions[6], i, adjacentIndex + chunkSize);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[6] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                }
            }
        } else {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i + 1);
            if (this.density > adjacentElement.density) {
                if (i + chunkWidthMinusOne > chunkSize * chunkSize && neighbourChunksContent[4] !== -1) {
                    const destinationChunkContent = neighbourChunksContent[4];
                    const destinationElement = this.getNeighbourElement(destinationChunkContent, i % chunkSize + 1);
                    if (this.density > destinationElement.density && !neighbourUpdatedPositions[4].includes(i % chunkSize + 1)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, i % chunkSize + 1);
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[4] = returnedData[1];
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    return -1;
                }
                const destinationElement = this.getNeighbourElement(theChunkContent, i + chunkSize + 1);
                if (this.density > destinationElement.density && !chunkUpdatedPositions.includes(i + chunkSize + 1) && i % chunkSize !== chunkWidthMinusOne) {
                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize + 1);
                    return [newChunkContent, newNeighbourChunksContent];
                }
            }
        }
        return -1;
    }
    

    moveHorizontalLeft(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {

        let crossedBorder = false;
        const dispertionRate = this.dispertionRate;
        const density = this.density;
        const chunkWidth = chunkSize;
        const neighbourChunkContent = neighbourChunksContent[1];
    
        for (let j = 0; j < dispertionRate; j++) {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i - 1);
            let belowElement = this.getNeighbourElement(theChunkContent, i + chunkWidth);
    
            const isChunkBorder = i % chunkWidth === 0;
            const notCrossedBorder = !crossedBorder;
    
            if (density > adjacentElement.density && density <= belowElement.density && !chunkUpdatedPositions.includes(i - 1) && !isChunkBorder && notCrossedBorder) {
                newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i - 1);
                i -= 1;
            } else {
                if (!Number.isInteger(neighbourChunkContent)) {
                    if (isChunkBorder) {
                        let destinationIndex = i + chunkWidth - 1;
                        adjacentElement = this.getNeighbourElement(neighbourChunkContent, destinationIndex);
                        belowElement = this.getNeighbourElement(neighbourChunksContent[4], i % chunkWidth);
    
                        if (density > adjacentElement.density && density <= belowElement.density && !neighbourUpdatedPositions[1].includes(destinationIndex)) {
                            const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[1], chunkUpdatedPositions, neighbourUpdatedPositions[1], i, destinationIndex);
    
                            newChunkContent = returnedData[0];
                            newNeighbourChunksContent[1] = returnedData[1];
    
                            i = destinationIndex;
                            crossedBorder = true;
                        }
                    }
    
                    if (crossedBorder) {
                        let destinationIndex = i - 1;
                        adjacentElement = this.getNeighbourElement(neighbourChunkContent, destinationIndex);
                        belowElement = this.getNeighbourElement(neighbourChunksContent[1], i + chunkWidth);
    
                        if (density > adjacentElement.density && density <= belowElement.density && !neighbourUpdatedPositions[1].includes(destinationIndex)) {
                            newNeighbourChunksContent[1] = this.swapPositions(newNeighbourChunksContent[1], neighbourUpdatedPositions[1], i, destinationIndex);
                            i = destinationIndex;
                        }
                    } else {
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                }
            }
        }
    
        return [newChunkContent, newNeighbourChunksContent];
    }

    moveHorizontalRight(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, chunkSize) {

        let crossedBorder = false;
        const dispertionRate = this.dispertionRate;
        const density = this.density;
        const chunkWidth = chunkSize;
        const neighbourChunkContent = neighbourChunksContent[6];
        const neighbourBelowChunkContent = neighbourChunksContent[4];
        const chunkWidthMinusOne = chunkWidth - 1;
    
        for (let j = 0; j < dispertionRate; j++) {
            let adjacentElement = this.getNeighbourElement(theChunkContent, i + 1);
            let belowElement = this.getNeighbourElement(theChunkContent, i + chunkWidth);
    
            if (density > adjacentElement.density && density <= belowElement.density && !chunkUpdatedPositions.includes(i + 1) && i % chunkWidth !== chunkWidthMinusOne && !crossedBorder) {
                newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + 1);
                i += 1;
            } else if (!Number.isInteger(neighbourChunkContent)) {
                if (i % chunkWidth === chunkWidthMinusOne) {
                    let destinationIndex = i - chunkWidthMinusOne;
                    adjacentElement = this.getNeighbourElement(neighbourChunkContent, destinationIndex);
                    belowElement = this.getNeighbourElement(neighbourBelowChunkContent, i % chunkWidth);
    
                    if (density > adjacentElement.density && density <= belowElement.density && !neighbourUpdatedPositions[6].includes(destinationIndex)) {
                        const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[6], chunkUpdatedPositions, neighbourUpdatedPositions[6], i, destinationIndex);
    
                        newChunkContent = returnedData[0];
                        newNeighbourChunksContent[6] = returnedData[1];
    
                        i = destinationIndex;
                        crossedBorder = true;
                    }
                }
    
                if (crossedBorder) {
                    let destinationIndex = i + 1;
                    adjacentElement = this.getNeighbourElement(neighbourChunkContent, destinationIndex);
                    belowElement = this.getNeighbourElement(neighbourChunkContent, i + chunkWidth);
    
                    if (density > adjacentElement.density && density <= belowElement.density && !neighbourUpdatedPositions[6].includes(destinationIndex)) {
                        newNeighbourChunksContent[6] = this.swapPositions(newNeighbourChunksContent[6], neighbourUpdatedPositions[6], i, destinationIndex);
                        i += 1;
                    }
                } else {
                    return [newChunkContent, newNeighbourChunksContent];
                }
            }
        }
    
        return [newChunkContent, newNeighbourChunksContent];
    }
    
}



export { Liquid };