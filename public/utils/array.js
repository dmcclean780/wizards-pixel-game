//File containing code to initilaise the game Array

//Function to create the gameArray and set every item to be false
function createArray(canvasData){
    var gameArray = new Uint32Array(canvasData.width*canvasData.height);
    for (var i=0; i<canvasData.width*canvasData.height; i++ ){
        gameArray[i]=0x00000000;
    }
    return gameArray
}

function coordToIndex(x,y,canvasData){
    var index = (y*canvasData.width)+x;
    return index;
}

function indexToCoord(index,canvasData){
    var y = Math.floor(index/canvasData.width);
    var x = modulo(index, canvasData.width);
    var coord = [x,y];
    return coord;
}

//Equivilent of the Modulo Operator (%)
//Taken from https://gist.github.com/jussi-kalliokoski/962137
function modulo(dividend, divisor){
	while (dividend >= divisor){
		dividend -= divisor;
	}
	return dividend;
}

//Code to export the above function
export{createArray, coordToIndex, indexToCoord, modulo};