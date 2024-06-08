import {getElement } from "./ElementColourMap.js";

function step(currentChunks, canvasData, newChunks){
    newChunks=currentChunks.map(function(arr){
        return arr.slice();
    })
    const iLoopLength = currentChunks.length
    const jLoopLength = currentChunks[0].length
    for(let i=0; i<iLoopLength; i++){
        for(let j=0; j<jLoopLength; j++){
            const theChunk = currentChunks[i][j]
            const theChunkContent = theChunk.content
            let newChunkContent = newChunks[i][j].content
            const chunkSize = theChunk.size;
            if(theChunk.needUpdated == true){
                const neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)
                let newNeighbourChunksContent =  findNeighbourChunksContent(newChunks, i, j)
                const allChunks= executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)
                newChunkContent=allChunks[0]
                const newChunkUpdateStatus=allChunks[1]
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
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
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
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
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
    let updatedPositions=[];
    let nextUpdateStatus = false;
    const chunkContentLength = theChunkContent.length
    let allChunks
    for(let i=0; i<chunkContentLength; i++){
        let colour=theChunkContent[i];
        colour &= 0x00ffffff;
        let element=getElement(colour);
        
       allChunks=element.move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, updatedPositions, chunkSize);
       let newChunkNeedUpdated= allChunks[1];
       if(newChunkNeedUpdated == true){
        nextUpdateStatus =true;
       }
    }
    allChunks[1] = nextUpdateStatus;
    return allChunks
}




export {step};