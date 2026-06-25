// @ts-nocheck
import {Xae,KO} from "../src/agent/3295_code.ts";
import {_ct,Q4e} from "./m3769.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function syt(e){return"'"+e[0].replaceAll("'",`'"'"'`)+"'"}
function aNm(e){if(e.startsWith("$"))return"variable";if(e.includes("/")||e.startsWith("~")||e.startsWith("."))return"file";return"command"}
function lNm(e,t){let n=e.slice(0,t),r=n.match(/\$[a-zA-Z_][a-zA-Z0-9_]*$/);if(r)return{prefix:r[0],completionType:"variable"};let o=n.split(/\s+/),s=o.at(-1)||"",i=o.length===1&&!n.includes(" "),a=aNm(s);return{prefix:s,completionType:a!=="command"?a:i?"command":"file"}}
function cNm(e,t){if(t==="variable"){let n=e.slice(1);return`compgen -v ${syt([n])} 2>/dev/null`}else if(t==="file")return`compgen -f ${syt([e])} 2>/dev/null | head -${rFo} | while IFS= read -r f; do [ -d "$f" ] && echo "$f/" || echo "$f "; done`;else return`compgen -c ${syt([e])} 2>/dev/null`}
function uNm(e,t){if(t==="variable"){let n=e.slice(1);return`print -rl -- \${(k)parameters[(I)${syt([n])}*]} 2>/dev/null`}else if(t==="file")return`for f in ${syt([e])}*(N[1,${rFo}]); do [[ -d "$f" ]] && echo "$f/" || echo "$f "; done`;else return`print -rl -- \${(k)commands[(I)${syt([e])}*]} 2>/dev/null`}
async function dNm(e,t,n,r,o){let s;if(e==="bash")s=cNm(t,n);else if(e==="zsh")s=uNm(t,n);else return[];return(await(await Xae(s,r,"bash",{timeout:iNm,sessionEnvVars:o})).result).stdout.split(`
`).filter((l)=>l.trim()).slice(0,rFo).map((l)=>({id:l,displayText:l,description:void 0,metadata:{completionType:n}}))}
async function bzl(e,t,n,r){let o=_ct();if(o!=="bash"&&o!=="zsh")return[];try{let{prefix:s,completionType:i}=lNm(e,t);if(!s)return[];return(await dNm(o,s,i,n,r)).map((l)=>({...l,metadata:{...l.metadata,inputSnapshot:e}}))}catch(s){return logForDebugging(`Shell completion failed: ${s}`),[]}}
var rFo=15,iNm=1000;
var Ezl=b(()=>{qe();Q4e();KO()});
export {syt,aNm,lNm,cNm,uNm,dNm,bzl,rFo,iNm,Ezl};
