import { coordToIndex, indexToCoord } from "../../../utils/array.js";
import { Element } from "../Elements.js";

class Lightning extends Element{
    
    density=0; //Integer positive for solids and liquids, negative for gases
    acidResistance=1; //value between 0 and 1
    acidStrength=0; //value between 0 and 1
    poisonResistance=1; //value between 0 and 1
    poisonStrength=0; //value between 0 and 1
    terminalVelocity=0; //value between 0 and 9
    inertialResistance=0; //value between 0 and 1
    colour= 0xFFF97D; //Hex number or array of hex numbers
    fireResistance=1000; //value between 0 and 1000
    flammable=false; //Boolean value
    dispertionRate=0; //Positive Integer value 
    gasState=""; // String
    liquidState=""; //String
    resistivity=0.1; //Positive value
    world;

    move(i, gameArray, canvasData, newGameArray, updatedPositions){
        let start=indexToCoord(i, canvasData)
        start=this.popWorld(start, canvasData);
        let end={x:start.x, y:canvasData.height-1}
        //console.log(start, end)
        let lightningPath = this.AStar(start, end, newGameArray, canvasData);
        //console.log(lightningPath)
        return this.plotPath(lightningPath, newGameArray, updatedPositions, canvasData);
    }

    plotPath(lightningPath, newGameArray, updatedPositions, canvasData){
        for(var i=0; i<lightningPath.length; i++){
            let point=lightningPath[i]
            let index=coordToIndex(point.x, point.y, canvasData)
            newGameArray[index]=this.colour;
            updatedPositions.push(index)
        }
        return newGameArray
    }
    
    popWorld(start, canvasData){
        this.world=new Array(canvasData.width);
        for(var i=0; i<this.world.length; i++){
            this.world[i]=new Array(canvasData.height);
            for(var j=0; j<this.world[i].length; j++){
                this.world[i][j]={x:i, y:j, f:0, g:0, h:0, neighbours:null, parent:null};
            }
        }
        start=this.world[start.x][start.y]
        return start;
    }
    
    heuristic(curPos, end, D){
        let dx = Math.abs(curPos.x-end.x)
        let dy = Math.abs(curPos.y-end.y)
        return D*(dy+dx);
    }
    
    getD(newGameArray, x, y, canvasData){
        let i = coordToIndex(x, y, canvasData)
        let neighbourElement = this.getNeighbourElement(newGameArray, i)
        return neighbourElement.resistivity
    }

    getNeighbours(x,y){
        let neighbours=[]
        for(let i=-1; i<2; i++){
            if(i!=0 && x+i>-1 && x+i<canvas.width){
                neighbours.push({x:x+i, y:y})
            }
        }
        for(let i=-1; i<2; i++){
            if(i!=0 && y+i>-1 && y+i<canvas.height){
                neighbours.push({x:x, y:y+i})
            }
        }
        return neighbours;
    }
    
    AStar(start, end, newGameArray, canvasData) {
    
        let openSet = [];
        let closedSet = [];
        let path = [];
    
        openSet.push(start)
    
        while (openSet.length > 0) {
            let lowestCostIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestCostIndex].f) {
                    lowestCostIndex = i;
                }
            }
    
    
            let currentNode = openSet[lowestCostIndex];
            currentNode.neighbours = this.getNeighbours(currentNode.x, currentNode.y);
    
            if (currentNode.x == end.x && currentNode.y == end.y) {
                let temp = currentNode;
                path.push(temp)
                while (temp.parent != null) {
                    path.push(temp.parent);
                    temp = temp.parent;
                }
                return path
            }
    
            openSet.splice(lowestCostIndex, 1);
            closedSet.push(currentNode);
    
            let neighbours = currentNode.neighbours;
    
            for (let i = 0; i < neighbours.length; i++) {
    
                let neighbour = this.world[neighbours[i].x][neighbours[i].y]
    
                let currentG = currentNode.g
                let nextG = currentG + 1
                neighbour.g = nextG
                let D=this.getD(newGameArray, neighbour.x, neighbour.y, canvasData)
                neighbour.h = this.heuristic(neighbour, end, D)
                //console.log(neighbour.h)
    
                if (!(closedSet.includes(neighbour))) {
    
                    let thisF = neighbour.g + neighbour.h;
                    let thisParent = currentNode;
                    neighbour.f = thisF;
                    neighbour.parent = thisParent;
    
                    if (!(openSet.includes(neighbour))) {
                        openSet.push(neighbour);
                    }
    
                }
            }
        }
        return []
    }
}

export {Lightning}