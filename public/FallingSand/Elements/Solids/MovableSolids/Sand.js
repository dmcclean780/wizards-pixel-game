
import { MovableSolid } from "./MovableSolid.js";

class Sand extends MovableSolid{
    
    density = 1631;
    acidResistance=0.4;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=5;
    inertialResistance=0.1;
    colour=0x8CE6F0;
    fireResistance=1000;
    flammable=false;
    dispertionRate=0;
    gasState="";
    liquidState="";
    resistivity=5;

}

export{Sand}
