// @ts-nocheck
import {X} from "../runtime.ts";
import {VRi} from "./m2485.ts";
import {zRi} from "./m2486.ts";
import {JRi} from "./m2487.ts";
import {s9r} from "./m2483.ts";
import {QRi} from "./m2488.ts";
import {exi} from "./m2489.ts";
var nxi=X((hmh,txi)=>{var mud=VRi(),fud=zRi(),Aud=JRi(),hud=s9r(),gud=QRi(),_ud=exi(),yud=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return mud(e,n,r);case"!=":return fud(e,n,r);case">":return Aud(e,n,r);case">=":return hud(e,n,r);case"<":return gud(e,n,r);case"<=":return _ud(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};txi.exports=yud});
export {nxi};
