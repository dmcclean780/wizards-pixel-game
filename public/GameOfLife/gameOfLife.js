//File containing code to execute the Simulation
var k=0;
//Function to move the simulation on 1 generation
function step(gameArray, canvasData, newGameArray){
    newGameArray = gameOfLife(gameArray, canvasData, newGameArray);
    return newGameArray;
}

//Function to find how many alive cells surround a given cell
function findNeighbors(gameArray, index, canvasData){
    var aliveNeighbors=0;
    var nextIndex;
    for(var i=-1; i<2; i++){
        for(var j=-1; j<2; j++){
            k++;
            nextIndex=index+(canvasData.width*i+j);
            if(k==canvasData.width || k==1){
                nextIndex -= j;
                if(k!=1){
                    k=0;
                }
            }
            if(gameArray[nextIndex] == 0xff00ff00 && nextIndex != index && nextIndex>0 && nextIndex<canvasData.width*canvasData.height){
                aliveNeighbors++;
            }
        }
    }
    return aliveNeighbors;
}

//Function to execute the game of life rules on every cell.
function gameOfLife(gameArray, canvasData, newGameArray){
    const width=canvasData.width;
    const height=canvasData.height;
    for(var i=0; i<width*height; i++){
        var aliveNeighbors=findNeighbors(gameArray, i, canvasData);
        if(gameArray[i]==0xff00ff00){
            if(aliveNeighbors<2 || aliveNeighbors>3 ){
                newGameArray[i]=0x00000000;
            }
            else{
                newGameArray[i]=0xff00ff00;
            }
        }
        if(gameArray[i]==0x00000000){
            if(aliveNeighbors==3){
                newGameArray[i]=0xff00ff00;
            }
            else{
                newGameArray[i]=0x00000000;
            }
        }          
    }
    return newGameArray;
}

//Code to export the step function
export{step};
