import { getElement } from "../ElementColourMap.js";

class Element{
    
    density; //Integer positive for solids and liquids, negative for gases
    acidResistance; //value between 0 and 1
    acidStrength; //value between 0 and 1
    poisonResistance; //value between 0 and 1
    poisonStrength; //value between 0 and 1
    terminalVelocity; //value between 0 and 9
    inertialResistance; //value between 0 and 1
    colour; //Hex number or array of hex numbers
    fireResistance; //value between 0 and 1000
    flammable; //Boolean value
    dispertionRate; //Positive Integer value less than 32 
    gasState; // String
    liquidState; //String
    resistivity; //Positive value

    move(i, theChunkContent, neighbourChunksContent, newChunkContent, newNeighbourChunksContent, chunkSize, chunkUpdatedPositions, neighbourUpdatedPositions){
        var newChunkUpdateStatus = false

        let result = new Array(2)
        result[0] = newChunkContent
        result[1] = newNeighbourChunksContent

        return result
    }

    swapPositions(newChunkContent, theChunkUpdatedPositions, i0, i1){
        var temp=newChunkContent[i0];
        newChunkContent[i0]=newChunkContent[i1];
        newChunkContent[i1]=temp;
        theChunkUpdatedPositions.push(i0);
        theChunkUpdatedPositions.push(i1);
        return newChunkContent
    }

    swapPositionsBetweenChunk(oldChunkContent, neighbourChunkContent, theChunkUpdatedPositions, neighbourChunksUpdatedPositions, i0, i1){
        var temp = oldChunkContent[i0];
        oldChunkContent[i0]=neighbourChunkContent[i1];
        neighbourChunkContent[i1]=temp
        theChunkUpdatedPositions.push(i0);
        neighbourChunksUpdatedPositions.push(i1)
        return [oldChunkContent, neighbourChunkContent]
    }

    swapPositionsAcid(newChunkContent, updatedPositions, i0, i1){
        newChunkContent[i0]=0x00000000;
        newChunkContent[i1]=0x00000000
        updatedPositions.push(i1)
        return newChunkContent;
    }

    swapPositionsAcidBetweenChunks(oldChunkContent, neighbourChunkContent, theChunkUpdatedPositions, neighbourChunksUpdatedPositions, i0, i1){
        oldChunkContent[i0]=0;
        neighbourChunkContent[i1]=0
        theChunkUpdatedPositions.push(i0);
        neighbourChunksUpdatedPositions.push(i1)
        return [oldChunkContent, neighbourChunkContent]
    }

    swapPositions2xAcid(newChunkContent, updatedPositions, i0, i1){
        var temp=newChunkContent[i0];
        newChunkContent[i0]=0x00000000;
        newChunkContent[i1]=temp
        updatedPositions.push(i1);
        return newChunkContent;
    }

    swapPositions2xAcidBetweenChunks(oldChunkContent, neighbourChunkContent, theChunkUpdatedPositions, neighbourChunksUpdatedPositions, i0, i1){
        var temp=oldChunkContent[i0];
        oldChunkContent[i0]=0x00000000;
        neighbourChunkContent[i1]=temp
        theChunkUpdatedPositions.push(i0);
        neighbourChunksUpdatedPositions.push(i1)
        return [oldChunkContent, neighbourChunkContent]
    }    


    swapPositionsPoison(newChunkContent, updatedPositions, i0, i1){
        newChunkContent[i1]=newChunkContent[i0];
        updatedPositions.push(i1);
        return newChunkContent
    }

    getNeighbourElement(theChunkContent, i){
        var neighbourColour=theChunkContent[i]
        neighbourColour&=0x00ffffff;
        var neighbourElement=getElement(neighbourColour);
        return neighbourElement;
    }

    getAlpha(theChunkContent, i){
        var velocity = theChunkContent[i];
        velocity &= 0x0f000000;
        velocity=velocity  >> 24
        return velocity;
    }

    updateAlphaByte(newChunkContent, alphaByte, i){
       
        var colour=newChunkContent[i];
        colour&=0xf0ffffff;
        colour=colour | (alphaByte<<24);
        newChunkContent[i]=colour;
        return newChunkContent;
    }

    

}



export{Element}