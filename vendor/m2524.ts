// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {useClock} from "./m2442.ts";
import {oLi,k2e} from "./m2523.ts";
import {KR,NZ} from "../src/telemetry/2478_action.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function RRn(e,t){let{addNotification:n}=Ci(),r=dnt.useRef(e),o=dnt.useRef(0),s=dnt.useRef(null),i=useClock();dnt.useEffect(()=>{let a=r.current;if(r.current=e,!t||!e||a)return;if(s.current)s.current();return s.current=i.setTimeout(async()=>{s.current=null;let l=Date.now();if(l-o.current<aAd)return;if(await oLi())o.current=l,n({key:sAd,kind:"contextual",text:`Image in clipboard \xB7 ${KR("chat:imagePaste","Chat","ctrl+v")} to paste`,priority:"immediate",timeoutMs:8000})},iAd),()=>{if(s.current)s.current(),s.current=null}},[e,t,n,i])}
var dnt,sAd="clipboard-image-hint",iAd=1000,aAd=30000;
var c5r=b(()=>{fd();je();NZ();k2e();dnt=x(et(),1)});
export {RRn,dnt,sAd,iAd,aAd,c5r};
