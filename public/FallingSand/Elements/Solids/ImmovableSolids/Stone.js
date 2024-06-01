
import { ImmovableSoild } from "./ImmovableSolid.js";

class Stone extends ImmovableSoild{
    density = Infinity;
    acidResistance=0.7;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    inertialResistance=0;
    terminalVelocity=0;
    colour=0xA9A9A9;
    fireResistance=1000;
    flammable=false;
    dispertionRate=0;
    gasState="";
    liquidState="";
}

export{Stone}