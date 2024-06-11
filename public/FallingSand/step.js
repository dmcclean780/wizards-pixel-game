import { getElement } from "./ElementColourMap.js";

function step(currentChunks, newChunks, genNo) {
    for(let i=0; i<currentChunks.length; i++){
        for(let j=0; j<currentChunks[i].length; j++){
            newChunks[i][j]=currentChunks[i][j]
        }
    }

    const currentPhase = genNo%4
    //console.log(newChunks, currentChunks)
    switch(currentPhase){
        case 0:
            newChunks=firstPhase(currentChunks, newChunks)
            break
        case 1:
            newChunks=secondPhase(currentChunks, newChunks)
            break
        case 2:
            newChunks=thirdPhase(currentChunks, newChunks)
            break
        case 3:
            newChunks=fourthPhase(currentChunks, newChunks)
            break
    }

   
    return newChunks;
}

function firstPhase(currentChunks, newChunks){
   
    const iLoopLength = currentChunks.length
    const jLoopLength = currentChunks[0].length
    let k=0

    for(let i=0; i<iLoopLength; i=i+2){
        for(let j=0; j<jLoopLength; j=j+2){

            k++
            //console.log(k)

            const theChunk = currentChunks[i][j]
            if(theChunk.needUpdated){
                const chunkSize=theChunk.size

                const theChunkContent = theChunk.content
                const neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)

                let newChunkContent = newChunks[i][j].content
                let newNeighbourChunksContent = findNeighbourChunksContent(newChunks, i, j)
               
                const updatedChunkData=executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)

                let newUpdateStatus=updatedChunkData[2]
                newChunks[i][j].needUpdated=newUpdateStatus
                
                if(newUpdateStatus){
                    newChunkContent=updatedChunkData[0]
                    newNeighbourChunksContent=updatedChunkData[1]
                    newChunks[i][j].content = newChunkContent;
                    newChunks = updateNeighbourChunks(newChunks, newNeighbourChunksContent, i, j)
                }
            }
        }

    }
   
    return newChunks
}

function secondPhase(currentChunks, newChunks){
  
    const iLoopLength = currentChunks.length
    const jLoopLength = currentChunks[0].length


    for(let i=1; i<iLoopLength; i=i+2){
        for(let j=0; j<jLoopLength; j=j+2){
            const theChunk = currentChunks[i][j]
            if(theChunk.needUpdated){

                const chunkSize=theChunk.size

                const theChunkContent = theChunk.content
                const neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)

                let newChunkContent = newChunks[i][j].content
                let newNeighbourChunksContent = findNeighbourChunksContent(newChunks, i, j)
               
                const updatedChunkData=executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)

                let newUpdateStatus=updatedChunkData[2]
                newChunks[i][j].needUpdated=newUpdateStatus
                
                if(newUpdateStatus){
                    newChunkContent=updatedChunkData[0]
                    newNeighbourChunksContent=updatedChunkData[1]
                    newChunks[i][j].content = newChunkContent;
                    newChunks = updateNeighbourChunks(newChunks, newNeighbourChunksContent, i, j)
                }
            }
        }

    }
    
    return newChunks
}

function thirdPhase(currentChunks, newChunks){
   
    const iLoopLength = currentChunks.length
    const jLoopLength = currentChunks[0].length


    for(let i=0; i<iLoopLength; i=i+2){
        for(let j=1; j<jLoopLength; j=j+2){
            const theChunk = currentChunks[i][j]
            if(theChunk.needUpdated){

                const chunkSize=theChunk.size

                const theChunkContent = theChunk.content
                const neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)

                let newChunkContent = newChunks[i][j].content
                let newNeighbourChunksContent = findNeighbourChunksContent(newChunks, i, j)
               
                const updatedChunkData=executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)

                let newUpdateStatus=updatedChunkData[2]
                newChunks[i][j].needUpdated=newUpdateStatus
              
                if(newUpdateStatus){
                    newChunkContent=updatedChunkData[0]
                    newNeighbourChunksContent=updatedChunkData[1]
                    newChunks[i][j].content = newChunkContent;
                    newChunks = updateNeighbourChunks(newChunks, newNeighbourChunksContent, i, j)
                }
            }
        }

    }
   
    return newChunks
}

function fourthPhase(currentChunks, newChunks){
   
    const iLoopLength = currentChunks.length
    const jLoopLength = currentChunks[0].length
    let k=0

    for(let i=1; i<iLoopLength; i=i+2){
        for(let j=1; j<jLoopLength; j=j+2){
            const theChunk = currentChunks[i][j]
            k++
            //console.log(k)
            if(theChunk.needUpdated){

                const chunkSize=theChunk.size

                const theChunkContent = theChunk.content
                const neighbourChunksContent = findNeighbourChunksContent(currentChunks, i, j)

                let newChunkContent = newChunks[i][j].content
                let newNeighbourChunksContent = findNeighbourChunksContent(newChunks, i, j)
                
                const updatedChunkData=executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize)

                let newUpdateStatus=updatedChunkData[2]
                newChunks[i][j].needUpdated=newUpdateStatus
                
                if(newUpdateStatus){
                    newChunkContent=updatedChunkData[0]
                    newNeighbourChunksContent=updatedChunkData[1]
                    newChunks[i][j].content = newChunkContent;
                    newChunks = updateNeighbourChunks(newChunks, newNeighbourChunksContent, i, j)
                }
            }
        }

    }
    
    return newChunks
}

function findNeighbourChunksContent(currentChunks, x, y) {
    let neighbourChunksContent = []
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i == 0 && j == 0) {
                continue
            }
            else {
                if (x + i >= 0 && x + i < currentChunks.length && y + j >= 0 && y + j < currentChunks[x].length) {
                    let neighbourChunkContent = currentChunks[x + i][y + j].content
                    neighbourChunksContent.push(neighbourChunkContent);
                }
                else {
                    neighbourChunksContent.push(-1);
                }
            }
        }
    }
    return neighbourChunksContent;
}


function updateNeighbourChunks(newChunks, newNeighbourChunksContent, x, y) {
    let k = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i == 0 && j == 0) {
                continue
            }
            else {
                if (x + i >= 0 && x + i < newChunks.length && y + j >= 0 && y + j < newChunks[x].length) {
                    if (newNeighbourChunksContent[k] != -1) {
                        newChunks[x + i][y + j].content = newNeighbourChunksContent[k]
                        newChunks[x + i][y + j].needUpdated = true;
                    }

                }
            }
            k++
        }
    }
    return newChunks
}


function executeChunk(theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize) {
    let chunkUpdatedPositions = [];
    let neighbourUpdatedPositions = [[],[],[],[],[],[],[],[]]
    let newUpdateStatus=true;
    const chunkContentLength = theChunkContent.length
    let result;
    for (let i = 0; i < chunkContentLength; i++) {
        let colour = theChunkContent[i];
        colour &= 0x00ffffff;
        let element = getElement(colour);
        result = element.move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize, chunkUpdatedPositions, neighbourUpdatedPositions);
    }
    var isEmpty = neighbourUpdatedPositions.every( function (a) { return !a.length });
    if(chunkUpdatedPositions == [] && isEmpty){
        newUpdateStatus=false
    }
    result.push(newUpdateStatus)
    return result
}




export { step };