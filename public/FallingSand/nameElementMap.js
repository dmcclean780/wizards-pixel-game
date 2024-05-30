import { Sand } from "./Elements/Solids/MovableSolids/Sand.js";
import { Water } from "./Elements/Liquids/Water.js";
import { Stone } from "./Elements/Solids/ImmovableSolids/Stone.js";
import { Empty } from "./Elements/Empty.js";
import { Oil } from "./Elements/Liquids/Oil.js";
import { Acid } from "./Elements/Liquids/Acid.js";
import { Poison } from "./Elements/Liquids/Poison.js";
import { StrongAcid } from "./Elements/Liquids/StrongAcid.js";
import { Wood } from "./Elements/Solids/ImmovableSolids/Wood.js";
import { Bedrock } from "./Elements/Solids/ImmovableSolids/Bedrock.js";
import { Coal } from "./Elements/Solids/MovableSolids/Coal.js";
import { Dirt } from "./Elements/Solids/MovableSolids/Dirt.js";
import { Steam } from "./Elements/Gases/Steam.js";
import { LiquidFire } from "./Elements/LiquidFire.js";
import { SolidFire } from "./Elements/SolidFire.js";

var nameToElementMap = {
    "empty": new Empty(),
    "sand": new Sand(),
    "water": new Water(),
    "stone": new Stone(),
    "oil": new Oil(),
    "strongAcid": new StrongAcid(),
    "poison": new Poison(),
    "acid": new Acid(),
    "wood": new Wood(),
    "bedrock": new Bedrock(),
    "coal": new Coal(),
    "dirt": new Dirt(),
    "steam": new Steam(),
    "liquid fire": new LiquidFire(),
    "solid fire": new SolidFire(),
}

function getElementByName(name) {
    return nameToElementMap[name]
}

export{getElementByName};