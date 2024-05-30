
import { MovableSolid } from "./MovableSolid.js";

class Sand extends MovableSolid{
    density = 1631;
    acidResistance=0.4;
    terminalVelocity=5;
    inertialResistance=0.1;
    colour=0x8CE6F0;

}

export{Sand}
