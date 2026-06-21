// @ts-nocheck
import {Lq,ab} from "../src/config/3178_path.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {Te} from "./m2253.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function f4l(e,t){let n=YWt.useRef(void 0),r=YWt.useRef(t);r.current=t,YWt.useEffect(()=>{let o=Lq(e);if(n.current!==o)n.current=o;if(o)o.client.setNotificationHandler(Fxm(),(s)=>{if(n.current!==o)return;try{let i=s.params,a=i.lineStart!==void 0?i.lineStart+1:void 0,l=i.lineEnd!==void 0?i.lineEnd+1:void 0;r.current({filePath:i.filePath,lineStart:a,lineEnd:l}),Ie("ide_at_mention")}catch(i){De(i),Oe("ide_at_mention","ide_at_mention_failed")}})},[e])}
var YWt,Bxm="at_mentioned",Fxm;
var A4l=b(()=>{Rn();Xr();ln();ab();YWt=M(Te(),1),Fxm=we(()=>E.object({method:E.literal(Bxm),params:E.object({filePath:E.string(),lineStart:E.number().optional(),lineEnd:E.number().optional()})}))});
export {f4l,YWt,Bxm,Fxm,A4l};
