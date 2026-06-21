// @ts-nocheck
import {zTe,ygt} from "./m102.ts";
import {tT,c2} from "./m13.ts";
import {W_i,G_i} from "./m2278.ts";
import {b} from "../runtime.ts";
function jed(e){if(typeof e=="number")return e;if(zTe(e))return V_i;if(tT(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=tT(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=W_i(e);var n=Ued.test(e);return n||$ed.test(e)?qed(e.slice(2),n?2:8):Fed.test(e)?V_i:+e}
var V_i=NaN,Fed,Ued,$ed,qed,NFr;
var K_i=b(()=>{G_i();c2();ygt();Fed=/^[-+]0x[0-9a-f]+$/i,Ued=/^0b[01]+$/i,$ed=/^0o[0-7]+$/i,qed=parseInt;NFr=jed});
export {jed,V_i,Fed,Ued,$ed,qed,NFr,K_i};
