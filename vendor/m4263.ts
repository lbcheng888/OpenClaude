// @ts-nocheck
import {_ae,Qrt} from "./m2737.ts";
import {gf,wE} from "./m5177.ts";
import {b} from "../runtime.ts";
function M2p(){return _ae("TASK_MAX_OUTPUT_LENGTH",process.env.TASK_MAX_OUTPUT_LENGTH,R_o,A_o).effective}
function wYa(e,t){let n=M2p();if(e.length<=n)return{content:e,wasTruncated:!1};let o=`[Truncated. Full output: ${gf(t)}]

`,s=n-o.length,i=e.slice(-s);return{content:o+i,wasTruncated:!0}}
var A_o=160000,R_o=32000;
var v_o=b(()=>{Qrt();wE()});
export {M2p,wYa,A_o,R_o,v_o};
