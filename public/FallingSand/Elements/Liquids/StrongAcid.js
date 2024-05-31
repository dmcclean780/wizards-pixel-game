import { Acid } from "./Acid.js"

class StrongAcid extends Acid{
    acidStrength=1;
    acidResistance=1;
    terminalVelocity=3;
    gasState= "steam";
    colour=0x00FF00;
}

export{StrongAcid}