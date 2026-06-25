// @ts-nocheck
import {X4,uS} from "../src/config/3192_path.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {b,x} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {et} from "./m2261.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function jZn(e,t){let n=k7t.useRef(void 0),r=k7t.useRef(t);r.current=t,k7t.useEffect(()=>{let o=X4(e);if(n.current!==o)n.current=o;if(o)o.client.setNotificationHandler(f1m(),(s)=>{if(n.current!==o)return;try{let i=s.params,a=i.lineStart!==void 0?i.lineStart+1:void 0,l=i.lineEnd!==void 0?i.lineEnd+1:void 0;r.current({filePath:i.filePath,lineStart:a,lineEnd:l}),He("ide_at_mention")}catch(i){Ie(i),xe("ide_at_mention","ide_at_mention_failed")}})},[e])}
function YZn(e,t){let n=C7l.default.relative(isTmuxControlMode(),e.filePath),r;if(e.lineStart&&e.lineEnd)r=e.lineStart===e.lineEnd?`@${n}#L${e.lineStart} `:`@${n}#L${e.lineStart}-${e.lineEnd} `;else r=`@${n} `;if(t!==void 0&&!/\s/.test(t))r=` ${r}`;return r}
var C7l,k7t,m1m="at_mentioned",f1m;
var JZn=b(()=>{vn();Qr();mn();Po();uS();C7l=x(require("path")),k7t=x(et(),1),f1m=ve(()=>C.object({method:C.literal(m1m),params:C.object({filePath:C.string(),lineStart:C.number().optional(),lineEnd:C.number().optional()})}))});
export {jZn,YZn,C7l,k7t,m1m,f1m,JZn};
