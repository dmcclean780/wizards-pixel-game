
import { Liquid } from "./Liquid.js";



class Water extends Liquid{

    
    density=1000;
    acidResistance=0.3;
    acidStrength=0;
    poisonResistance=0;
    poisonStrength=0;
    terminalVelocity=3;
    inertialResistance=0;
    colour=0xFF901E;
    fireResistance=1000;
    flammable=false;
    dispertionRate=50;
    gasState= "steam";
    liquidState="";
    resistivity=1;
    
}

export {Water}