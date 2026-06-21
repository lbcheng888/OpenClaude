// @ts-nocheck
import {w5,F4} from "./m2416.ts";
import {supportsTabStatus,Sk,oTn,v_i,lg} from "./m2269.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useTabStatus(e,t){let n=$Ze.useContext(w5),r=$Ze.useRef(null);$Ze.useEffect(()=>{if(e===null){if(r.current!==null&&n&&supportsTabStatus())n(Sk(oTn));r.current=null;return}if(r.current=e,!n||!supportsTabStatus())return;let o=Cld[e],s=e==="idle"&&t!==void 0?{...o,status:t}:o;n(Sk(v_i(s)))},[e,t,n])}
var $Ze,UZe=(e,t,n)=>({type:"rgb",r:e,g:t,b:n}),Cld;
var ywi=b(()=>{lg();F4();$Ze=M(Te(),1),Cld={idle:{indicator:UZe(0,215,95),status:"Idle",statusColor:UZe(136,136,136)},busy:{indicator:UZe(255,149,0),status:"Working\u2026",statusColor:UZe(255,149,0)},waiting:{indicator:UZe(95,135,255),status:"Waiting",statusColor:UZe(95,135,255)}}});
export {useTabStatus,$Ze,UZe,Cld,ywi};
