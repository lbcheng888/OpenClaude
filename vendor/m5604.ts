// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {KVn,R8t} from "../src/config/5029_isDeprecated.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function enc(e){let t=Ztc.c(5),{addNotification:n}=Ui(),r=jQn.useRef(null),o=mt(H$m),s,i;if(t[0]!==n||t[1]!==e||t[2]!==o)s=()=>{let a=KVn(o??e);if(a&&a!==r.current)r.current=a,n({key:"model-deprecation-warning",kind:"warning",text:a,color:"warning",priority:"high"});if(!a)r.current=null},i=[e,o,n],t[0]=n,t[1]=e,t[2]=o,t[3]=s,t[4]=i;else s=t[3],i=t[4];jQn.useEffect(s,i)}
function H$m(e){return e.mainLoopModelForSession??e.mainLoopModel}
var Ztc,jQn;
var tnc=b(()=>{Ld();R8t();configProtoStore();Ztc=M(rt(),1),jQn=M(Te(),1)});
export {enc,H$m,Ztc,jQn,tnc};
