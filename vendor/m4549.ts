// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {useTheme} from "./m2274.ts";
import {applyConfigShorthand,listConfigKeys,parseConfigShorthand,h8n} from "../src/agent/4515_parseConfigShorthand.ts";
import {dDe,y6t} from "./m4548.ts";
import {logMCPError,uoe,initKp} from "./m609.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var oll={};
isFullscreenWithTTY(oll,{call:()=>vGp});
function wGp(e){let t=rll.c(6),{pairs:n,context:r,onDone:o}=e,[,s]=useTheme(),i=$8n.useRef(!1),a,l;if(t[0]!==r||t[1]!==o||t[2]!==n||t[3]!==s)a=()=>{if(i.current)return;i.current=!0;let c=applyConfigShorthand(n,r,{setTheme:s});o(c.map(RGp).join(`
`),{display:"system"})},l=[n,r,o,s],t[0]=r,t[1]=o,t[2]=n,t[3]=s,t[4]=a,t[5]=l;else a=t[4],l=t[5];return $8n.useEffect(a,l),null}
function RGp(e){return e.message}
var rll,T6t,$8n,vGp=async(e,t,n)=>{let r=n?.trim()||"";if(!r)return T6t.createElement(dDe,{onClose:e,context:t,defaultTab:"Config"});let o=r.toLowerCase();if(logMCPError.includes(o)||uoe.includes(o)){e(`Run /config to open settings, or /config key=value to set one directly.
${listConfigKeys(t)}`,{display:"system"});return}let s=parseConfigShorthand(r);if(!s){e(`Expected key=value, got "${r}". Run /config to open settings.`,{display:"system"});return}return T6t.createElement(wGp,{pairs:s,context:t,onDone:e})};
var sll=b(()=>{y6t();initKp();ze();h8n();rll=M(rt(),1),T6t=M(Te(),1),$8n=M(Te(),1)});
export {oll,wGp,RGp,rll,T6t,$8n,vGp,sll};
