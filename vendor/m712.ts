// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {Mde,BTt} from "./m68.ts";
import {b} from "../runtime.ts";
import {PLe,DP} from "./m19.ts";
function wau(e){return jy(e)||Mde(e)||!!(gas&&e&&e[gas])}
var gas,_as;
var yas=b(()=>{PLe();BTt();DU();gas=DP?DP.isConcatSpreadable:void 0;_as=wau});
export {wau,gas,_as,yas};
