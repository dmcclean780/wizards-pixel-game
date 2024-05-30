import { Liquid } from "./Liquid.js";

class Oil extends Liquid{
    density=700;
    dispertionRate=30;
    acidResistance=0.4;
    terminalVelocity=3;
    colour=0x0B86B8;
    gasState="oil"
    fireResistance=900;
    burnTime=0xf;
}

export {Oil}