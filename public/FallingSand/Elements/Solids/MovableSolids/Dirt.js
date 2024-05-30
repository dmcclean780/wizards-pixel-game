import { MovableSolid } from "./MovableSolid.js";

class Dirt extends MovableSolid{
    density = 1100;
    acidResistance=0.3;
    terminalVelocity=7;
    inertialResistance=0.5;
    colour=0x13458B;

}

export{Dirt};