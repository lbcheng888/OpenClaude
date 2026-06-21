// @ts-nocheck
import {Lw,jO,Om} from "../src/config/2215_level.ts";
import {nnn,$ts,tnn,UAr,qts,jts,sl} from "./m715.ts";
import {H4,Yfe} from "./m2265.ts";
import {bc,Ug} from "./m2264.ts";
import {No,lwe} from "./m2421.ts";
import {b} from "../runtime.ts";
function xil(e,t,n){if(n||!Lw(t))return;return jO(t,e)}
function kil(e,t=!1){if(!e)return;if(t)return`${nnn} ultracode \xB7 xhigh effort + dynamic workflows for maximum thoroughness`;return`${Byo(e)} ${e} \xB7 /effort`}
function Byo(e){switch(e){case"low":return $ts;case"medium":return tnn;case"high":return UAr;case"xhigh":return qts;case"max":return jts;default:return UAr}}
function Hil(e){if(e){let t=H4(bc("theme","dark").value);return No("effortUltra",t)("ultracode")}return}
function Iil(e){let t=e.filter(Boolean).join("  ")||void 0;return t?{content:` ${t} `,position:"top",align:"end",offset:0}:void 0}
var Fyo=b(()=>{sl();Om();Ug();Yfe();lwe()});
export {xil,kil,Byo,Hil,Iil,Fyo};
