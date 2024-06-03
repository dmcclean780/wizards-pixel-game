import { Acid } from "./Acid.js"

class StrongAcid extends Acid{
    
    density=1;
    acidResistance=1;
    acidStrength=1;
    poisonResistance=1;
    poisonStrength=0;
    terminalVelocity=3;
    inertialResistance=0;
    colour=0x00FF00;
    fireResistance=1000;
    flammable=false;
    dispertionRate=50;
    gasState= "steam";
    liquidState="";
    resistivity=1;
}

export{StrongAcid}