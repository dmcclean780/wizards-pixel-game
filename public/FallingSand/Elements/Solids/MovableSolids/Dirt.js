import { MovableSolid } from "./MovableSolid.js";

class Dirt extends MovableSolid{
    
    density = 1100;
    acidResistance=0.3;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=7;
    inertialResistance=0.5;
    colour=0x13458B;
    fireResistance=1000;
    flammable=false;
    dispertionRate=0;
    gasState="";
    liquidState="";
    resistivity=10;

}

export{Dirt};