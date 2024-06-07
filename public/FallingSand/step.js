import {getElement } from "./ElementColourMap.js";

function step(currentChunks, canvasData, newChunks){
    newChunks=currentChunks.map(function(arr){
        return arr.slice();
    })
    for(var i=0; i<currentChunks.length; i++){
        for(var j=0; j<currentChunks[i].length; j++){
            var theChunk = currentChunks[i][j]
            var theChunkContent = theChunk.content
            var newChunkContent = newChunks[i][j].content
            const chunkSize = theChunk.size;
            if(theChunk.needUpdated == true){
                var neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)
                var newNeighbourChunksContent =  findNeighbourChunksContent(newChunks, i, j)
                var allChunks= executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)
                newChunkContent=allChunks[0]
                var newChunkUpdateStatus=allChunks[1]
                newNeighbourChunksContent=allChunks[2];
                newChunks[i][j].needUpdated=newChunkUpdateStatus;
                if(newChunkUpdateStatus){
                    newChunks[i][j].content=newChunkContent;
                    newChunks=updateNeighbourChunks(newChunks, newNeighbourChunksContent, i, j)
                }
            }
        }
    }
    return newChunks;
}

function findNeighbourChunksContent(currentChunks, x, y){
    let neighbourChunksContent=[]
    for(var i=-1; i<2; i++){
        for(var j=-1; j<2; j++){
            if(i==0 && j==0){
                continue
            }
            else{
                if(x+i >= 0 && x+i < currentChunks.length && y+j >= 0 && y+j < currentChunks[x].length){
                    let neighbourChunkContent = currentChunks[x+i][y+j].content
                    neighbourChunksContent.push(neighbourChunkContent);
                }
                else{
                    neighbourChunksContent.push(-1);
                }
            }
        }
    }
    return neighbourChunksContent;
}

function updateNeighbourChunks(newChunks, newNeighbourChunksContent, x, y){
    let k=0
    for(var i=-1; i<2; i++){
        for(var j=-1; j<2; j++){
            if(i==0 && j==0){
                continue
            }
            else{
                if(x+i >= 0 && x+i < newChunks.length && y+j >= 0 && y+j < newChunks[x].length){
                    if(newNeighbourChunksContent[k]!=-1){
                        newChunks[x+i][y+j].content=newNeighbourChunksContent[k]
                        newChunks[x+i][y+j].needUpdated=true;
                    }
                    
                }
            }
            k++
        }
    }
    return newChunks
}

function executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize){
    var updatedPositions=[];
    var nextUpdateStatus = false;
    for(var i=0; i<theChunkContent.length; i++){
        var colour=theChunkContent[i];
        colour &= 0x00ffffff;
        var element=getElement(colour);
        
       var allChunks=element.move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, updatedPositions, chunkSize);
       var newChunkNeedUpdated= allChunks[1];
       if(newChunkNeedUpdated == true){
        nextUpdateStatus =true;
       }
    }
    allChunks[1] = nextUpdateStatus;
    return allChunks
}




export {step};