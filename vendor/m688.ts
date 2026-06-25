// @ts-nocheck
import {Sje,bje} from "./m644.ts";
import {$1e,TTr,STr} from "./m687.ts";
import {b} from "../runtime.ts";
function Piu(){return!1}
async function Kb(e,t=[],n){if(Piu()){let r=Sje(e);if(r===null)throw Error(`Command '${e}' not found or is in an unsafe location (current directory)`);return $1e(r,t,n)}return $1e(e,t,n)}
async function Nv(e,t){return $1e(e,{...t,shell:!0})}
function uis(e,t){return TTr(e,{...t,shell:!0})}
var zN=b(()=>{STr();bje()});
export {Piu,Kb,Nv,uis,zN};
