// @ts-nocheck
import {jt,ws} from "./m228.ts";
import {Ds,Iu} from "./m643.ts";
import {truncate} from "./m237.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {ps} from "./m238.ts";
function OWa(e,t,n){try{let r=jt(),o=Ds(e),{buffer:s,bytesRead:i}=r.readSync(o,{length:PWa}),l=s.toString("utf-8",0,i).split(`
`);if(t<0||t>=l.length)return null;if(i===PWa&&t===l.length-1)return null;let c=l[t];if(!c||n<0||n>=c.length)return null;let u=/[\w$'!]+|[+\-*/%&|^~<>=]+/g,d;while((d=u.exec(c))!==null){let p=d.index,m=p+d[0].length;if(n>=p&&n<m){let f=d[0];return truncate(f,30)}}return null}catch(r){if(r instanceof Error)logForDebugging(`Symbol extraction failed for ${e}:${t}:${n}: ${r.message}`,{level:"warn"});return null}}
var PWa=65536;
var LWa=b(()=>{qe();ps();ws();Iu()});
export {OWa,PWa,LWa};
