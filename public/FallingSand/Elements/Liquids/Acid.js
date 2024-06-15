
import { Liquid } from "./Liquid.js";

class Acid extends Liquid {
    density = 1;
    acidStrength = 0.5;
    acidResistance = 0.5;
    poisonResistance = 1;
    poisonStrength = 0;
    terminalVelocity = 3;
    inertialResistance = 0;
    colour = 0x2FFFAD;
    fireResistance = 1000;
    flammable = false;
    dispertionRate = 50;
    gasState = "steam";
    liquidState = "";
    resistivity = 1;

    moveDown(i, theChunkContent, newChunkContent, neighbourChunksContent, newNeighbourChunksContent, chunkUpdatedPositions, neighbourUpdatedPositions, velocity, chunkSize) {
        let crossedBorder = false;
        let belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
        if (this.density > belowElement.density) {
            for (let j = 0; j < velocity; j++) {
                belowElement = this.getNeighbourElement(theChunkContent, i + chunkSize);
                if (this.density > belowElement.density || this.acidStrength > belowElement.acidResistance && !chunkUpdatedPositions.includes(i + chunkSize) && i + chunkSize < chunkSize * chunkSize && !crossedBorder) {

                    if ((this.acidStrength) / 2 > belowElement.acidResistance) {
                        newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize);
                        i += chunkSize;
                        //continue
                    }
                    if (this.acidStrength > belowElement.acidResistance) {
                        newChunkContent = this.swapPositionsAcid(newChunkContent, chunkUpdatedPositions, i, i + chunkSize);
                        return [newChunkContent, newNeighbourChunksContent];
                    }
                    else {
                        newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, i + chunkSize);
                        i += chunkSize;
                        //continue
                    }

                } else {
                    const belowChunkContent = neighbourChunksContent[4];
                    if (!Number.isInteger(belowChunkContent)) {
                        if (i + chunkSize >= chunkSize * chunkSize) {
                            let destinationIndex = i % chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
                            if (this.density > belowElement.density || this.acidStrength > belowElement.acidResistance && !neighbourUpdatedPositions[4].includes(destinationIndex)) {

                                if ((this.acidStrength) / 2 > belowElement.acidResistance) {
                                    newChunkContent = this.swapPositions2xAcidBetweenChunks(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex);
                                    i += chunkSize;
                                    //continue
                                }
                                if (this.acidStrength > belowElement.acidResistance) {
                                    newChunkContent = this.swapPositionsAcidBetweenChunks(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex);
                                    return [newChunkContent, newNeighbourChunksContent];
                                }
                                else {
                                    const returnedData = this.swapPositionsBetweenChunk(newChunkContent, newNeighbourChunksContent[4], chunkUpdatedPositions, neighbourUpdatedPositions[4], i, destinationIndex);
                                    newChunkContent = returnedData[0];
                                    newNeighbourChunksContent[4] = returnedData[1];
                                    i = destinationIndex;
                                    crossedBorder = true;
                                    //continue
                                }


                            }
                        }

                        if (crossedBorder) {
                            let destinationIndex = i + chunkSize;
                            belowElement = this.getNeighbourElement(belowChunkContent, destinationIndex);
                            if (this.density > belowElement.density || this.acidStrength > belowElement.acidResistance && !neighbourUpdatedPositions[4].includes(destinationIndex)) {
                                if ((this.acidStrength) / 2 > belowElement.acidResistance) {
                                    newChunkContent = this.swapPositions2xAcid(newChunkContent, chunkUpdatedPositions, i, destinationIndex);
                                    i = destinationIndex;
                                    //continue
                                }
                                if (this.acidStrength > belowElement.acidResistance) {
                                    newChunkContent = this.swapPositionsAcid(newChunkContent, chunkUpdatedPositions, i, destinationIndex);
                                    return [newChunkContent, newNeighbourChunksContent];
                                }
                                else {
                                    newChunkContent = this.swapPositions(newChunkContent, chunkUpdatedPositions, i, destinationIndex);
                                    i = destinationIndex;
                                    //continue
                                }
                            }
                        }
                        else{

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

/*
    moveDownDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i + canvasData.width - 1 < canvasData.width * canvasData.height && updatedPositions.indexOf(i + canvasData.width - 1) == -1 && i % canvasData.width != 0) {
            var adjacentElement = this.getNeighbourElement(gameArray, i - 1);
            if (this.density > adjacentElement.density) {
                var belowElement = this.getNeighbourElement(gameArray, i + canvasData.width - 1);
                if (this.density > belowElement.density || this.acidStrength > belowElement.acidResistance) {
                    if ((this.acidStrength) / 2 > belowElement.acidResistance) {
                        newGameArray = this.swapPositions2xAcid(newGameArray, updatedPositions, i, i + canvasData.width - 1)
                        return newGameArray
                    }
                    if (this.acidStrength > belowElement.acidResistance) {
                        newGameArray = this.swapPositionsAcid(newGameArray, updatedPositions, i, i + canvasData.width - 1)
                        return newGameArray
                    }
                    else {
                        newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i + canvasData.width - 1)
                        return newGameArray
                    }
                }
            }
        }
        return -1;
    }

    moveDownDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i + canvasData.width + 1 < canvasData.width * canvasData.height && updatedPositions.indexOf(i + canvasData.width + 1) == -1 && i % canvasData.width != canvasData.width - 1) {
            var adjacentElement = this.getNeighbourElement(gameArray, i + 1);
            if (this.density > adjacentElement.density) {
                var belowElement = this.getNeighbourElement(gameArray, i + canvasData.width + 1);
                if (this.density > belowElement.density || this.acidStrength > belowElement.acidResistance) {
                    if ((this.acidStrength) / 2 > belowElement.acidResistance) {
                        newGameArray = this.swapPositions2xAcid(newGameArray, updatedPositions, i, i + canvasData.width + 1)
                        return newGameArray
                    }
                    if (this.acidStrength > belowElement.acidResistance) {
                        newGameArray = this.swapPositionsAcid(newGameArray, updatedPositions, i, i + canvasData.width + 1)
                        return newGameArray
                    }
                    else {
                        newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i + canvasData.width + 1);
                        return newGameArray
                    }
                }
            }

        }
        return -1;
    }

    moveHorizontalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for (var j = 0; j < this.dispertionRate; j++) {
            var adjacentElement = this.getNeighbourElement(newGameArray, i - 1);
            var belowElement = this.getNeighbourElement(gameArray, i + canvasData.width)
            if (this.density > adjacentElement.density && this.density <= belowElement.density && updatedPositions.includes(i - 1) == false && i % canvasData.width != 0 || this.acidStrength > adjacentElement.acidResistance) {
                if ((this.acidStrength) / 2 > adjacentElement.acidResistance) {
                    newGameArray = this.swapPositions2xAcid(newGameArray, updatedPositions, i, i - 1)
                }
                else {
                    if (this.acidStrength > adjacentElement.acidResistance) {
                        newGameArray = this.swapPositionsAcid(newGameArray, updatedPositions, i, i - 1)
                        return newGameArray
                    }
                    else {
                        newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i - 1)
                    }
                }
                i = i - 1
            }
            else {
                return newGameArray
            }
        }
        return -1;
    }

    moveHorizontalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for (var j = 0; j < this.dispertionRate; j++) {
            var adjacentElement = this.getNeighbourElement(newGameArray, i + 1);
            var belowElement = this.getNeighbourElement(gameArray, i + canvasData.width)
            if (this.density > adjacentElement.density && this.density <= belowElement.density && updatedPositions.includes(i + 1) == false && i % canvasData.width != canvasData.width - 1 || this.acidStrength > adjacentElement.acidResistance) {
                if ((this.acidStrength) / 2 > adjacentElement.acidResistance) {
                    newGameArray = this.swapPositions2xAcid(newGameArray, updatedPositions, i, i + 1)
                }
                else {
                    if (this.acidStrength > adjacentElement.acidResistance) {
                        newGameArray = this.swapPositionsAcid(newGameArray, updatedPositions, i, i + 1)
                        return newGameArray
                    }
                    else {
                        newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i + 1)
                    }
                }
                i = i + 1
            }
            else {
                return newGameArray
            }
        }
        return -1;
    }
        */



}

export { Acid }