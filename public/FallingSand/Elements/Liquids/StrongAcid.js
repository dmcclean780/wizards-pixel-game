import { Acid } from "./Acid.js"

class StrongAcid extends Acid{
    acidStrength=0.8;
    acidResistance=0.8;
    terminalVelocity=3;
    gasState= "steam";
    colour=0x00FF00;
}

export{StrongAcid}