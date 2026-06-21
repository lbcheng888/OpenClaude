// @ts-nocheck
import {JK,W4} from "./m2461.ts";
import {Y4,Cet} from "../src/config/2565_Cet.ts";
import {ju,wk} from "../src/tui/2564_current.ts";
import {getSettingsSchema,k$} from "./m2541.ts";
import {je} from "./m577.ts";
import {b,M} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {Te} from "./m2253.ts";
function p8d(e){for(let t of e){if(t.context!=="Task")continue;let n=JK(t.chord);if(t.action==="task:background"){if(!Kia.has(n))return!0}else if(t.action===null&&Kia.has(n))return!0}return!1}
function m0n({handler:e,isActive:t}){let n=Y4(),r=ju("task:background","Task",M1t),o=getSettingsSchema(),s=o?.bindings,i=Vot.useMemo(()=>s?p8d(s):!1,[s]),a=Vot.useRef(e);a.current=e;let l=!(n&&!i);Vot.useEffect(()=>{if(!o||!t)return;return o.registerHandler({action:"task:background",context:"Task",handler:()=>a.current(),singleKey:l})},[o,t,l]);let c=i?r:zia,u=r===""?"":je.terminal==="tmux"?c.split(" ").map((d)=>d===M1t?`${M1t} ${M1t}`:d).join(" "):c;return{cohesionFixes:n,gateOnShortcut:u,resolvedShortcut:r}}
var Vot,M1t="ctrl+b",zia="ctrl+x ctrl+b",Kia;
var KYr=b(()=>{k$();wk();Lr();Cet();Vot=M(Te(),1),Kia=new Set([M1t,zia].map((e)=>JK(W4(e))))});
export {p8d,m0n,Vot,M1t,zia,Kia,KYr};
