class GameChunk{
    worldPos;
    size=64;
    content;
    updatedPositions=[]
    needUpdated;

    constructor(worldPos){
        this.worldPos=worldPos
        this.content=new Uint32Array(4096)
        this.needUpdated=false;
        for(var i=0; i<this.content.length; i++){
            this.content[i]=0x00000000;
        }
    }
}

export{GameChunk}