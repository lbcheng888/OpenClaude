// @ts-nocheck
import {Wt,ps} from "./m230.ts";
import {hs,Tu} from "./m649.ts";
import {truncate} from "./m239.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Xo} from "./m240.ts";
function eJa(e,t,n){try{let r=Wt(),o=hs(e),{buffer:s,bytesRead:i}=r.readSync(o,{length:ZYa}),l=s.toString("utf-8",0,i).split(`
`);if(t<0||t>=l.length)return null;if(i===ZYa&&t===l.length-1)return null;let c=l[t];if(!c||n<0||n>=c.length)return null;let u=/[\w$'!]+|[+\-*/%&|^~<>=]+/g,d;while((d=u.exec(c))!==null){let p=d.index,m=p+d[0].length;if(n>=p&&n<m){let f=d[0];return truncate(f,30)}}return null}catch(r){if(r instanceof Error)logForDebugging(`Symbol extraction failed for ${e}:${t}:${n}: ${r.message}`,{level:"warn"});return null}}
var ZYa=65536;
var tJa=b(()=>{qe();Xo();ps();Tu()});
export {eJa,ZYa,tJa};
