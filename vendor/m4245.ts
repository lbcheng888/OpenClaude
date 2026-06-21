// @ts-nocheck
import {Tae,Jtt} from "./m2725.ts";
import {mh,vC} from "./m5145.ts";
import {b} from "../runtime.ts";
function hOp(){return Tae("TASK_MAX_OUTPUT_LENGTH",process.env.TASK_MAX_OUTPUT_LENGTH,kpo,xpo).effective}
function aWa(e,t){let n=hOp();if(e.length<=n)return{content:e,wasTruncated:!1};let o=`[Truncated. Full output: ${mh(t)}]

`,s=n-o.length,i=e.slice(-s);return{content:o+i,wasTruncated:!0}}
var xpo=160000,kpo=32000;
var Hpo=b(()=>{Jtt();vC()});
export {hOp,aWa,xpo,kpo,Hpo};
