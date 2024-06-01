import { Element } from "../Elements.js";
import { Solid } from "../Solids/Solid.js";

class Gas extends Element {

    move(i, gameArray, canvasData, newGameArray, updatedPositions) {
        
        var moveUpPossible = this.moveUp(i, gameArray, canvasData, newGameArray, updatedPositions);
        if (!Number.isInteger(moveUpPossible)) {
            return moveUpPossible;
        }

        var dir = Math.random() < 0.5;

        if (dir) {

            var moveUpDiagonalRightPossible = this.moveUpDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions)
            if (!Number.isInteger(moveUpDiagonalRightPossible)) {
                return moveUpDiagonalRightPossible
            }

            var moveHorizontalRightPossible = this.moveHorizontalRight(i, gameArray, canvasData, newGameArray, updatedPositions)
            if (!Number.isInteger(moveHorizontalRightPossible)) {
                return moveHorizontalRightPossible
            }

        }

        if (!dir) {

            var moveUpDiagonalLeftPossible = this.moveUpDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions)
            if (!Number.isInteger(moveUpDiagonalLeftPossible)) {
                return moveUpDiagonalLeftPossible
            }

            var moveHorizontalLeftPossible = this.moveHorizontalLeft(i, gameArray, canvasData, newGameArray, updatedPositions)
            if (!Number.isInteger(moveHorizontalLeftPossible)) {
                
                return moveHorizontalLeftPossible
            }
        }
        return newGameArray
    }

    moveUp(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i - canvasData.width > 0 && updatedPositions.indexOf(i - canvasData.width) == -1) {
            var destinationElement = this.getNeighbourElement(gameArray, i - canvasData.width)
            if (this.density < destinationElement.density && !(destinationElement instanceof Solid)) {
                newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i - canvasData.width)
                return newGameArray
            }
        }
        return -1
    }

    moveUpDiagonalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i - canvasData.width - 1 > 0 && updatedPositions.indexOf(i - canvasData.width - 1) == -1 && i % canvasData.width != 0) {
            var adjacentElement = this.getNeighbourElement(gameArray, i - 1);
            if (this.density < adjacentElement.density && !(adjacentElement instanceof Solid)) {
                var destinationElement = this.getNeighbourElement(gameArray, i - canvasData.width - 1);
                if (this.density < destinationElement.density && !(destinationElement instanceof Solid)) {
                    newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i - canvasData.width - 1)
                    return newGameArray
                }
            }
        }
        return -1
    }

    moveUpDiagonalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        if (i - canvasData.width + 1 > 0 && updatedPositions.indexOf(i - canvasData.width + 1) == -1 && i % canvasData.width != canvasData.width - 1) {
            var adjacentElement = this.getNeighbourElement(gameArray, i + 1);
            if (this.density < adjacentElement.density && !(adjacentElement instanceof Solid)) {
                var destinationElement = this.getNeighbourElement(gameArray, i - canvasData.width + 1);
                if (this.density < destinationElement.density && !(destinationElement instanceof Solid)) {
                    newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i - canvasData.width + 1)
                    return newGameArray
                }
            }
        }
        return -1
    }

    moveHorizontalLeft(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for (var j = 0; j < this.dispertionRate; j++) {
            var adjacentElement = this.getNeighbourElement(newGameArray, i - 1);
            var aboveElement = this.getNeighbourElement(gameArray, i - canvasData.width)
            if (this.density < adjacentElement.density && (this.density >= aboveElement.density || aboveElement instanceof Solid) && !(adjacentElement instanceof Solid) && updatedPositions.includes(i - 1) == false && i % canvasData.width != 0) {
                newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i - 1)
                i = i - 1
            }
            else {
                return newGameArray
            }
        }
        return -1
    }

    moveHorizontalRight(i, gameArray, canvasData, newGameArray, updatedPositions) {
        for (var j = 0; j < this.dispertionRate; j++) {
            var adjacentElement = this.getNeighbourElement(newGameArray, i + 1);
            var aboveElement = this.getNeighbourElement(gameArray, i - canvasData.width)
            if (this.density < adjacentElement.density && (this.density >= aboveElement.density || aboveElement instanceof Solid) && !(adjacentElement instanceof Solid) && updatedPositions.includes(i + 1) == false && i % canvasData.width != canvasData.width - 1) {
                newGameArray = this.swapPositionsLiquid(newGameArray, updatedPositions, i, i + 1)
                i = i + 1
            }
            else {
                return newGameArray
            }
        }
        return -1
    }
}

export { Gas };