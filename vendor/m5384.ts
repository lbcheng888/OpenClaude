// @ts-nocheck
import {Ws,vd} from "../src/session/1465_promise.ts";
import {pl,Wu} from "./m438.ts";
import {ec,eb,Oi,Pf} from "../src/agent/2591_level.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Yjl(){let[e,t]=Ler.useState(null);return Ler.useEffect(()=>{if(!Ws()||pl())return;let n=ec(eb()),r,o=async()=>{let i=(await Oi(n))?.children?.find((l)=>l.kind!=="frame"),a=i?Number(i.id):NaN;if(!i||!Number.isFinite(a))return;t((l)=>l?.number===a&&l.url===i.href?l:{number:a,url:i.href})};try{r=jjl.watch(n,(s,i)=>{if(i&&!i.startsWith("state.json"))return;o()}),r.on("error",(s)=>logForDebugging(`[useBgSessionPr] watcher error: ${Ce(s)}`,{level:"warn"})),r.unref()}catch(s){logForDebugging(`[useBgSessionPr] watch skipped: ${Ce(s)}`)}return o(),()=>r?.close()},[]),e}
var jjl,Ler;
var Jjl=b(()=>{Pf();Wu();vd();qe();Ct();jjl=require("fs"),Ler=x(et(),1)});
export {Yjl,jjl,Ler,Jjl};
