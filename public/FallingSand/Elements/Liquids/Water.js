
import { Liquid } from "./Liquid.js";



class Water extends Liquid{
    dispertionRate=50;
    density=1000;
    acidResistance=0.3;
    poisonResistance=0;
    terminalVelocity=3;
    gasState= "steam";
    colour=0xFF901E;
    
}

export {Water}