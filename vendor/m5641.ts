// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {_t,uo} from "./m2468.ts";
import {UYn,YGt} from "../src/config/5059_isDeprecated.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function Uuc(e){let t=Buc.c(5),{addNotification:n}=Ci(),r=Knr.useRef(null),o=_t(nVm),s,i;if(t[0]!==n||t[1]!==e||t[2]!==o)s=()=>{let a=UYn(o??e);if(a&&a!==r.current)r.current=a,n({key:"model-deprecation-warning",kind:"warning",text:a,color:"warning",priority:"high"});if(!a)r.current=null},i=[e,o,n],t[0]=n,t[1]=e,t[2]=o,t[3]=s,t[4]=i;else s=t[3],i=t[4];Knr.useEffect(s,i)}
function nVm(e){return e.mainLoopModelForSession??e.mainLoopModel}
var Buc,Knr;
var $uc=b(()=>{fd();YGt();uo();Buc=x(tt(),1),Knr=x(et(),1)});
export {Uuc,nVm,Buc,Knr,$uc};
