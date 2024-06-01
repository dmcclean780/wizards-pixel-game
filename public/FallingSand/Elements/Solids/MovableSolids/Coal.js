import { MovableSolid } from "./MovableSolid.js";

class Coal extends MovableSolid{
    density = 1346;
    acidResistance=0.7;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=9;
    inertialResistance=0.9;
    colour=0x2B2B2E;
    fireResistance=950
    flammable=true;
    dispertionRate=0;
    gasState="";
    liquidState="";
}

export{Coal};