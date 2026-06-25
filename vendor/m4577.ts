// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {useTheme} from "./m2285.ts";
import {applyConfigShorthand,listConfigKeys,parseConfigShorthand,OVn} from "../src/agent/4535_parseConfigShorthand.ts";
import {uPe,z8t} from "./m4576.ts";
import {i3,loe,Ud} from "./m615.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var Lhl={};
ft(Lhl,{call:()=>HZp});
function IZp(e){let t=Ohl.c(6),{pairs:n,context:r,onDone:o}=e,[,s]=useTheme(),i=bKn.useRef(!1),a,l;if(t[0]!==r||t[1]!==o||t[2]!==n||t[3]!==s)a=()=>{if(i.current)return;i.current=!0;let c=applyConfigShorthand(n,r,{setTheme:s});o(c.map(xZp).join(`
`),{display:"system"})},l=[n,r,o,s],t[0]=r,t[1]=o,t[2]=n,t[3]=s,t[4]=a,t[5]=l;else a=t[4],l=t[5];return bKn.useEffect(a,l),null}
function xZp(e){return e.message}
var Ohl,bKn,ERo,HZp=async(e,t,n)=>{let r=n?.trim()||"";if(!r)return ERo.jsx(uPe,{onClose:e,context:t,defaultTab:"Config"});let o=r.toLowerCase();if(i3.includes(o)||loe.includes(o)){e(`Run /config to open settings, or /config key=value to set one directly.
${listConfigKeys(t)}`,{display:"system"});return}let s=parseConfigShorthand(r);if(!s){e(`Expected key=value, got "${r}". Run /config to open settings.`,{display:"system"});return}return ERo.jsx(IZp,{pairs:s,context:t,onDone:e})};
var Mhl=b(()=>{z8t();Ud();je();OVn();Ohl=x(tt(),1),bKn=x(et(),1),ERo=x(oe(),1)});
export {Lhl,IZp,xZp,Ohl,bKn,ERo,HZp,Mhl};
