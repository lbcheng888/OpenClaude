// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {useClock} from "./m2432.ts";
import {Bki,HUe} from "./m2512.ts";
import {qw,UZ} from "../src/telemetry/2468_action.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Bbn(e,t){let{addNotification:n}=Ui(),r=cet.useRef(e),o=cet.useRef(0),s=cet.useRef(null),i=useClock();cet.useEffect(()=>{let a=r.current;if(r.current=e,!t||!e||a)return;if(s.current)s.current();return s.current=i.setTimeout(async()=>{s.current=null;let l=Date.now();if(l-o.current<Lmd)return;if(await Bki())o.current=l,n({key:Pmd,kind:"contextual",text:`Image in clipboard \xB7 ${qw("chat:imagePaste","Chat","ctrl+v")} to paste`,priority:"immediate",timeoutMs:8000})},Omd),()=>{if(s.current)s.current(),s.current=null}},[e,t,n,i])}
var cet,Pmd="clipboard-image-hint",Omd=1000,Lmd=30000;
var I9r=b(()=>{Ld();ze();UZ();HUe();cet=M(Te(),1)});
export {Bbn,cet,Pmd,Omd,Lmd,I9r};
