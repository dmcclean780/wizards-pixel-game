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

function getMousePositionY(canvasData,drawingData){
    var rect = drawingData.rect;
    var y = drawingData.clientY - rect.top;
    var canvasY = Math.round(y * canvasData.height / canvasData.clientHeight);
    return canvasY;
}

//Procedure to handle a mouse click
function startPainting(drawingData, gameArray, canvasData){
    paint = true;
    orgX =getMousePositionX(canvasData, drawingData);
    orgY =getMousePositionY(canvasData, drawingData);
    updateArray(orgX, orgY, gameArray, drawingData);
    renderArray(canvasData, gameArray);
}

function stopPainting(){
    paint = false;
    
}
            
function sketch(drawingData, gameArray, canvasData){
    if (!paint) return;
    var curX=getMousePositionX(canvasData, drawingData);
    var curY =getMousePositionY(canvasData, drawingData);
    drawLine(curX, curY, gameArray, drawingData);
    renderArray(canvasData, gameArray);
    orgX=curX;
    orgY=curY;
}

function drawLine(curX, curY, gameArray, drawingData){
    var dx = Math.abs(curX-orgX);
    if(orgX<curX){
        var sx=1;
    }
    else{
        var sx =-1;
    }
    var dy = -Math.abs(curY-orgY);
    if(orgY<curY){
        var sy=1;
    }
    else{
        var sy =-1;
    }
    var error = dx+dy;
    while(true){
        updateArray(orgX, orgY, gameArray, drawingData);
        if(orgX==curX && orgY == curY){
            break
        }
        var e2 =2*error;
        if(e2 >= dy){
            if(orgX == curX){
                break
            }
            error+=dy;
            orgX+=sx;
        }
        if(e2 <= dx){
            if(orgY == curY){
                break
            }
            error+=dx;
            orgY+=sy;
        }
    }
}


function eraseMode(eraseButton){
    if(!erase){
        eraseButton.style.backgroundColor="red";
        erase=true;
        
    }
    else{
        eraseButton.style.backgroundColor="white";
        erase=false;
    }
    
}

//Procedure to update the gameArray item to be true
function updateArray(x,y, gameArray, drawingData){
    var index = coordToIndex(x,y, canvas)
    if(erase){
        gameArray[index]=0x00000000;
    }
    else{
        gameArray[index]=drawingData.colour;
    }    
}


//Code to export the handleClick procedure
export{startPainting, stopPainting, sketch, eraseMode};


    
