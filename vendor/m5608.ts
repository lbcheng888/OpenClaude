// @ts-nocheck
import {Qlc,Zlc} from "./m5607.ts";
import {Ci,fd} from "./m2469.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function ecc(e=Qlc){let{addNotification:t}=Ci(),n=Anr.useRef(!1);Anr.useEffect(()=>{if(getIsRemoteMode()||n.current)return;n.current=!0;let r=getGlobalConfig().seenNotifications??{},o=[];Promise.allSettled(e.map(async(s)=>{if(s.maxImpressions!==void 0&&(r[s.id]??0)>=s.maxImpressions)return;let i=await s.compute();if(!i||Array.isArray(i)&&i.length===0)return;for(let a of Array.isArray(i)?i:[i])t(a);if(s.onShown?.(),s.maxImpressions!==void 0)o.push(s.id)})).then((s)=>{for(let i of s)if(i.status==="rejected")Ie(i.reason);if(o.length===0)return;saveGlobalConfig((i)=>{let a={...i.seenNotifications??{}};for(let l of o)a[l]=(a[l]??0)+1;return{...i,seenNotifications:a}})})},[t,e])}
var Anr;
var tcc=b(()=>{lt();fd();tr();vn();Zlc();Anr=x(et(),1)});
export {ecc,Anr,tcc};
