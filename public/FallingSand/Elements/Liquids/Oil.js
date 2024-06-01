import { Liquid } from "./Liquid.js";

class Oil extends Liquid{

    density=700;
    acidResistance=0.4;
    acidStrength=0;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=3;
    inertialResistance=0;
    colour=0x0B86B8;
    fireResistance=900;
    flammable=true;
    dispertionRate=30;
    gasState="oil"
    liquidState="";
}

export {Oil}