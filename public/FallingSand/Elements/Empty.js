import { Element } from "./Elements.js";
import {getElement } from "../ElementColourMap.js";

class Empty extends Element{
    density=0;
    colour=0x000000
    resistivity=Math.random()*1.5;
}

export{Empty}