// @ts-nocheck
import {dec,pec} from "./m5569.ts";
import {Ui,Ld} from "./m2459.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function mec(e=dec){let{addNotification:t}=Ui(),n=bQn.useRef(!1);bQn.useEffect(()=>{if(getIsRemoteMode()||n.current)return;n.current=!0;let r=getGlobalConfig().seenNotifications??{},o=[];Promise.allSettled(e.map(async(s)=>{if(s.maxImpressions!==void 0&&(r[s.id]??0)>=s.maxImpressions)return;let i=await s.compute();if(!i||Array.isArray(i)&&i.length===0)return;for(let a of Array.isArray(i)?i:[i])t(a);if(s.onShown?.(),s.maxImpressions!==void 0)o.push(s.id)})).then((s)=>{for(let i of s)if(i.status==="rejected")De(i.reason);if(o.length===0)return;saveGlobalConfig((i)=>{let a={...i.seenNotifications??{}};for(let l of o)a[l]=(a[l]??0)+1;return{...i,seenNotifications:a}})})},[t,e])}
var bQn;
var fec=b(()=>{lt();Ld();Qn();Rn();pec();bQn=M(Te(),1)});
export {mec,bQn,fec};
