// @ts-nocheck
import {BR,iO,Cp} from "../src/config/2223_level.ts";
import {Non,Las,Mon,_Sr,Mas,Nas,Pa} from "./m720.ts";
import {X3,cZ} from "./m2273.ts";
import {lc,mg} from "./m2209.ts";
import {color,Kve} from "./m2431.ts";
import {b} from "../runtime.ts";
function _ml(e,t,n){if(n||!BR(t))return;return iO(t,e)}
function yml(e,t=!1){if(!e)return;if(t)return`${Non} ultracode \xB7 xhigh effort + dynamic workflows for maximum thoroughness`;return`${DAo(e)} ${e} \xB7 /effort`}
function DAo(e){switch(e){case"low":return Las;case"medium":return Mon;case"high":return _Sr;case"xhigh":return Mas;case"max":return Nas;default:return _Sr}}
function Tml(e){if(e){let t=X3(lc("theme","dark").value);return color("effortUltra",t)("ultracode")}return}
function Sml(e){let t=e.filter(Boolean).join("  ")||void 0;return t?{content:` ${t} `,position:"top",align:"end",offset:0}:void 0}
var PAo=b(()=>{Pa();Cp();mg();cZ();Kve()});
export {_ml,yml,DAo,Tml,Sml,PAo};
