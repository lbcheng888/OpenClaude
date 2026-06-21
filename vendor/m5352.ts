// @ts-nocheck
import {_i,hp} from "../src/session/1460_promise.ts";
import {ec,Dd} from "./m687.ts";
import {vc,AC,ma,mg} from "../src/agent/2580_level.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function gjl(){let[e,t]=MJn.useState(null);return MJn.useEffect(()=>{if(!_i()||ec())return;let n=vc(AC()),r,o=async()=>{let i=(await ma(n))?.children?.find((l)=>l.kind!=="frame"),a=i?Number(i.id):NaN;if(!i||!Number.isFinite(a))return;t((l)=>l?.number===a&&l.url===i.href?l:{number:a,url:i.href})};try{r=hjl.watch(n,(s,i)=>{if(i&&!i.startsWith("state.json"))return;o()}),r.on("error",(s)=>logForDebugging(`[useBgSessionPr] watcher error: ${Se(s)}`,{level:"warn"})),r.unref()}catch(s){logForDebugging(`[useBgSessionPr] watch skipped: ${Se(s)}`)}return o(),()=>r?.close()},[]),e}
var hjl,MJn;
var _jl=b(()=>{mg();Dd();hp();qe();bt();hjl=require("fs"),MJn=M(Te(),1)});
export {gjl,hjl,MJn,_jl};
