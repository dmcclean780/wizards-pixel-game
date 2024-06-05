import { GameChunk } from "./GameChunk.js"

function createChunks(canvasData){
    let sampleChunk=new GameChunk(0)
    let chunksPerRow=canvasData.width/sampleChunk.size
    let chunksPerColumn=canvasData.height/sampleChunk.size
    let chunkList=new Array(chunksPerRow)

    for(var i=0; i<chunkList.length; i++){
        chunkList[i]=new Array(chunksPerColumn)
        for(var j=0; j<chunkList[i].length; j++){
            chunkList[i][j]=new GameChunk([i,j])
        }
    }
    return chunkList
}

function getWorldPos(i, chunksPerRow, numberOfRows){
    let xPos=i%chunksPerRow;
    let yPos=0;
    if(i>=chunksPerRow){
        yPos = Math.floor(i/chunksPerRow)
        numberOfRows++;
    }
    var worldPos={x:xPos, y:yPos}
    return [worldPos, numberOfRows]
}

export {createChunks}