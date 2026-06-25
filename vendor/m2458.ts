// @ts-nocheck
import {U8,i4} from "./m2426.ts";
import {supportsTabStatus,Nk,GEn,PAi,hg} from "./m2280.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useTabStatus(e,t){let n=Wtt.useContext(U8),r=Wtt.useRef(null);Wtt.useEffect(()=>{if(e===null){if(r.current!==null&&n&&supportsTabStatus())n(Nk(GEn));r.current=null;return}if(r.current=e,!n||!supportsTabStatus())return;let o=Yyd[e],s=e==="idle"&&t!==void 0?{...o,status:t}:o;n(Nk(PAi(s)))},[e,t,n])}
var Wtt,qtt=(e,t,n)=>({type:"rgb",r:e,g:t,b:n}),Yyd;
var Nxi=b(()=>{hg();i4();Wtt=x(et(),1),Yyd={idle:{indicator:qtt(0,215,95),status:"Idle",statusColor:qtt(136,136,136)},busy:{indicator:qtt(255,149,0),status:"Working\u2026",statusColor:qtt(255,149,0)},waiting:{indicator:qtt(95,135,255),status:"Waiting",statusColor:qtt(95,135,255)}}});
export {useTabStatus,Wtt,qtt,Yyd,Nxi};
