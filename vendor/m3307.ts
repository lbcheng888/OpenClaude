// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {sOn,xeo} from "./m3303.ts";
import {lfa,cfa} from "./m3306.ts";
import {b} from "../runtime.ts";
function aQd(e){var t=jy(e)?sOn:lfa;return t(e)}
var tx;
var i_e=b(()=>{xeo();cfa();DU();tx=aQd});
export {aQd,tx,i_e};
