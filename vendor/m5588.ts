// @ts-nocheck
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function ilc(e,t=AWm){let n=useClock(),[r,o]=anr.useState(!e);return anr.useEffect(()=>{if(e){o(!1);return}let s=n.setTimeout(()=>o(!0),t);return()=>s()},[e,n,t]),r}
var anr,AWm=2000;
var alc=b(()=>{je();anr=x(et(),1)});
export {ilc,anr,AWm,alc};
