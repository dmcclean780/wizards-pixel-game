//File containg code to output to the canvas

//Procedure to update every pixel  
  function renderArray(canvasData, gameArray){ 
    var width=canvasData.width;
    var height=canvasData.height;
    var ctx=canvasData.ctx;
    var iData = new ImageData(new Uint8ClampedArray(gameArray.buffer), width, height);
    ctx.putImageData(iData,0 ,0);
    
}

//Code to export the renderArray procedure 
export{renderArray};