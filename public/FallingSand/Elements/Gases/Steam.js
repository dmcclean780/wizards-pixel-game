
import { Gas } from "./Gas.js";

class Steam extends Gas{
    density=-0.6;
    acidResistance=1;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=1;
    inertialResistance=0;
    colour=0xE6D8AD
    fireResistance=1000;
    flammable=false;
    dispertionRate=50;
    gasState="";
    liquidState="water";
    resistivity=1.3;
}

export{Steam};