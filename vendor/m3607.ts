// @ts-nocheck
import {X} from "../runtime.ts";
import {o3e} from "./m3531.ts";
import {aA} from "./m3509.ts";
import {DL} from "./m3513.ts";
import {Xee} from "./m3517.ts";
import {i6} from "./m3527.ts";
import {f9} from "./m3516.ts";
import {bE} from "./m3511.ts";
var zTa=X((Ito)=>{Object.defineProperty(Ito,"__esModule",{value:!0});Ito.setup=lop;var jTa=require("net"),WTa=o3e(),oMn=aA(),Rto=DL(),GTa=Xee(),oop=i6(),VTa=f9(),sop=bE(),iop="ip_resolver";function KTa(e){sop.trace(oMn.LogVerbosity.DEBUG,iop,e)}var xto="ipv4",kto="ipv6",aop=443;class Hto{constructor(e,t,n){var r;this.listener=t,this.endpoints=[],this.error=null,this.hasReturnedResult=!1,KTa("Resolver constructed for target "+(0,VTa.uriToString)(e));let o=[];if(!(e.scheme===xto||e.scheme===kto)){this.error={code:oMn.Status.UNAVAILABLE,details:`Unrecognized scheme ${e.scheme} in IP resolver`,metadata:new Rto.Metadata};return}let s=e.path.split(",");for(let i of s){let a=(0,VTa.splitHostPort)(i);if(a===null){this.error={code:oMn.Status.UNAVAILABLE,details:`Failed to parse ${e.scheme} address ${i}`,metadata:new Rto.Metadata};return}if(e.scheme===xto&&!(0,jTa.isIPv4)(a.host)||e.scheme===kto&&!(0,jTa.isIPv6)(a.host)){this.error={code:oMn.Status.UNAVAILABLE,details:`Failed to parse ${e.scheme} address ${i}`,metadata:new Rto.Metadata};return}o.push({host:a.host,port:(r=a.port)!==null&&r!==void 0?r:aop})}this.endpoints=o.map((i)=>({addresses:[i]})),KTa("Parsed "+e.scheme+" address list "+o.map(oop.subchannelAddressToString))}updateResolution(){if(!this.hasReturnedResult)this.hasReturnedResult=!0,process.nextTick(()=>{if(this.error)this.listener((0,WTa.statusOrFromError)(this.error),{},null,"");else this.listener((0,WTa.statusOrFromValue)(this.endpoints),{},null,"")})}destroy(){this.hasReturnedResult=!1}static getDefaultAuthority(e){return e.path.split(",")[0]}}function lop(){(0,GTa.registerResolver)(xto,Hto),(0,GTa.registerResolver)(kto,Hto)}});
export {zTa};
