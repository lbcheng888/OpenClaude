// @ts-nocheck
import {Qae,initXL} from "../src/agent/3279_code.ts";
import {yat,B3e} from "./m3753.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function $At(e){return"'"+e[0].replaceAll("'",`'"'"'`)+"'"}
function Dkm(e){if(e.startsWith("$"))return"variable";if(e.includes("/")||e.startsWith("~")||e.startsWith("."))return"file";return"command"}
function Pkm(e,t){let n=e.slice(0,t),r=n.match(/\$[a-zA-Z_][a-zA-Z0-9_]*$/);if(r)return{prefix:r[0],completionType:"variable"};let o=n.split(/\s+/),s=o.at(-1)||"",i=o.length===1&&!n.includes(" "),a=Dkm(s);return{prefix:s,completionType:a!=="command"?a:i?"command":"file"}}
function Okm(e,t){if(t==="variable"){let n=e.slice(1);return`compgen -v ${$At([n])} 2>/dev/null`}else if(t==="file")return`compgen -f ${$At([e])} 2>/dev/null | head -${wPo} | while IFS= read -r f; do [ -d "$f" ] && echo "$f/" || echo "$f "; done`;else return`compgen -c ${$At([e])} 2>/dev/null`}
function Lkm(e,t){if(t==="variable"){let n=e.slice(1);return`print -rl -- \${(k)parameters[(I)${$At([n])}*]} 2>/dev/null`}else if(t==="file")return`for f in ${$At([e])}*(N[1,${wPo}]); do [[ -d "$f" ]] && echo "$f/" || echo "$f "; done`;else return`print -rl -- \${(k)commands[(I)${$At([e])}*]} 2>/dev/null`}
async function Mkm(e,t,n,r,o){let s;if(e==="bash")s=Okm(t,n);else if(e==="zsh")s=Lkm(t,n);else return[];return(await(await Qae(s,r,"bash",{timeout:Ikm,sessionEnvVars:o})).result).stdout.split(`
`).filter((l)=>l.trim()).slice(0,wPo).map((l)=>({id:l,displayText:l,description:void 0,metadata:{completionType:n}}))}
async function mql(e,t,n,r){let o=yat();if(o!=="bash"&&o!=="zsh")return[];try{let{prefix:s,completionType:i}=Pkm(e,t);if(!s)return[];return(await Mkm(o,s,i,n,r)).map((l)=>({...l,metadata:{...l.metadata,inputSnapshot:e}}))}catch(s){return logForDebugging(`Shell completion failed: ${s}`),[]}}
var wPo=15,Ikm=1000;
var fql=b(()=>{qe();B3e();initXL()});
export {$At,Dkm,Pkm,Okm,Lkm,Mkm,mql,wPo,Ikm,fql};
