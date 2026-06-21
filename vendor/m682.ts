// @ts-nocheck
import {E7e,C7e} from "./m638.ts";
import {zMe,Wfr,Gfr} from "./m681.ts";
import {b} from "../runtime.ts";
function hJc(){return!1}
async function qb(e,t=[],n){if(hJc()){let r=E7e(e);if(r===null)throw Error(`Command '${e}' not found or is in an unsafe location (current directory)`);return zMe(r,t,n)}return zMe(e,t,n)}
async function wR(e,t){return zMe(e,{...t,shell:!0})}
function mes(e,t){return Wfr(e,{...t,shell:!0})}
var vB=b(()=>{Gfr();C7e()});
export {hJc,qb,wR,mes,vB};
