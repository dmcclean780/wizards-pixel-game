import { ImmovableSoild } from "./ImmovableSolid.js";

class Bedrock extends ImmovableSoild{
    density = Infinity;
    acidResistance=1;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    inertialResistance=0;
    terminalVelocity=0;
    colour=0x424244;
    fireResistance=1000;
    flammable=false;
    dispertionRate=0;
    gasState="";
    liquidState="";
    resistivity=100;
}

export {Bedrock};