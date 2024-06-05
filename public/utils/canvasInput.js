//File containing code to give recieve input form the canvas

//Code to import the renderArray procedure
import { renderArray } from "./canvasOutput.js";
import { coordToIndex } from "./array.js";

let paint = false;
let erase = false;
let orgX;
let orgY;

//Pair of functions to find the x and y coordinates of a mouse click
//Taken and adapted from https://stackoverflow.com/questions/20516311/drawing-a-circle-in-a-canvas-on-mouseclick and https://stackoverflow.com/questions/40753016/mouse-coordinates-on-canvas-after-css-scale
function getMousePositionX(canvasData, drawingData) {
    var rect = drawingData.rect;
    var x = drawingData.clientX - rect.left;
    var canvasX = Math.round(x * canvasData.width / canvasData.clientWidth);
    return canvasX;
}

function getMousePositionY(canvasData, drawingData) {
    var rect = drawingData.rect;
    var y = drawingData.clientY - rect.top;
    var canvasY = Math.round(y * canvasData.height / canvasData.clientHeight);
    return canvasY;
}

//Procedure to handle a mouse click
function startPainting(drawingData, currentChunks, canvasData) {
    paint = true;
    orgX = getMousePositionX(canvasData, drawingData);
    orgY = getMousePositionY(canvasData, drawingData);
    updateArray(orgX, orgY, currentChunks, drawingData);
    renderArray(canvasData, currentChunks);
}

function stopPainting() {
    paint = false;

}

function sketch(drawingData, currentChunks, canvasData) {
    if (!paint) return;
    var curX = getMousePositionX(canvasData, drawingData);
    var curY = getMousePositionY(canvasData, drawingData);
    drawLine(curX, curY, currentChunks, drawingData);
    renderArray(canvasData, currentChunks);
    orgX = curX;
    orgY = curY;
}

function drawLine(curX, curY, currentChunks, drawingData) {
    var dx = Math.abs(curX - orgX);
    if (orgX < curX) {
        var sx = 1;
    }
    else {
        var sx = -1;
    }
    var dy = -Math.abs(curY - orgY);
    if (orgY < curY) {
        var sy = 1;
    }
    else {
        var sy = -1;
    }
    var error = dx + dy;
    while (true) {
        updateArray(orgX, orgY, currentChunks, drawingData);
        if (orgX == curX && orgY == curY) {
            break
        }
        var e2 = 2 * error;
        if (e2 >= dy) {
            if (orgX == curX) {
                break
            }
            error += dy;
            orgX += sx;
        }
        if (e2 <= dx) {
            if (orgY == curY) {
                break
            }
            error += dx;
            orgY += sy;
        }
    }
}


function eraseMode(eraseButton) {
    if (!erase) {
        eraseButton.style.backgroundColor = "red";
        erase = true;

    }
    else {
        eraseButton.style.backgroundColor = "white";
        erase = false;
    }

}

//Procedure to update the currentChunks item to be true
function updateArray(x, y, currentChunks, drawingData) {
    var xChunk = Math.floor(x / currentChunks[0][0].size)
    var yChunk = Math.floor(y / currentChunks[0][0].size)
    var xInchunk = x - (xChunk * currentChunks[0][0].size)
    var yInchunk = y - (yChunk * currentChunks[0][0].size)
    var chunkCoord = [xChunk, yChunk]
    var index = chunkIndex(xInchunk, yInchunk, currentChunks[0][0].size)
    var theChunk = currentChunks[chunkCoord[0]][chunkCoord[1]]
    if (erase) {
        theChunk.content[index] = 0x00000000;
    }
    else {
        theChunk.content[index] = drawingData.colour;
    }
    currentChunks[chunkCoord[0]][chunkCoord[1]] = theChunk;
}

function chunkIndex(x, y, size) {
    return y * size + x;
}

function getChunkIndex(currentChunks, chunkCoord) {
    for (var i = 0; i < currentChunks.length; i++) {
        if (currentChunks[i].worldPos.x == chunkCoord.x && currentChunks[i].worldPos.y == chunkCoord.y) {
            return i
        }
    }
    return -1;
}


//Code to export the handleClick procedure
export { startPainting, stopPainting, sketch, eraseMode };



