//File containg code to output to the canvas

//Procedure to update every pixel  
  function renderArray(canvasData, currentChunks){
    //console.log(currentChunks)
    for(var i=0; i<currentChunks.length; i++){
      for(var j=0; j<currentChunks[i].length; j++){
        var width=currentChunks[i][j].size;
        var height=currentChunks[i][j].size;
        var ctx=canvasData.ctx;
        var chunkPos=currentChunks[i][j].worldPos
        var canvasXPos=chunkPos[0]*width
        var canvasYPos=chunkPos[1]*height
        //console.log(currentChunks[i][j].content)
        var iData = new ImageData(new Uint8ClampedArray(currentChunks[i][j].content.buffer), width, height);
        ctx.putImageData(iData,canvasXPos ,canvasYPos);
      }
      
    } 
}

//Code to export the renderArray procedure 
export{renderArray};