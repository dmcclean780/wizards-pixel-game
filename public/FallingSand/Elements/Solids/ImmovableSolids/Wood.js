import { ImmovableSoild } from "./ImmovableSolid.js";

class Wood extends ImmovableSoild{

    density = Infinity;
    acidResistance=0.4;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    inertialResistance=0;
    terminalVelocity=0;
    colour=0x2F66A1;
    fireResistance=930;
    flammable=true;
    dispertionRate=0;
    gasState="";
    liquidState="";
    resistivity=3000;
}

export{Wood}