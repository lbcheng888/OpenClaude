// @ts-nocheck
import {Q} from "../runtime.ts";
import {y4e} from "./m3547.ts";
import {yf} from "./m3525.ts";
import {JO} from "./m3529.ts";
import {Vee} from "./m3533.ts";
import {Eq} from "./m3543.ts";
import {B$} from "./m3532.ts";
import {xE} from "./m3527.ts";
var cka=Q((mio)=>{Object.defineProperty(mio,"__esModule",{value:!0});mio.setup=Jfp;var oka=require("net"),ska=y4e(),XNn=yf(),cio=JO(),ika=Vee(),Kfp=Eq(),aka=B$(),zfp=xE(),jfp="ip_resolver";function lka(e){zfp.trace(XNn.LogVerbosity.DEBUG,jfp,e)}var uio="ipv4",dio="ipv6",Yfp=443;class pio{constructor(e,t,n){var r;this.listener=t,this.endpoints=[],this.error=null,this.hasReturnedResult=!1,lka("Resolver constructed for target "+(0,aka.uriToString)(e));let o=[];if(!(e.scheme===uio||e.scheme===dio)){this.error={code:XNn.Status.UNAVAILABLE,details:`Unrecognized scheme ${e.scheme} in IP resolver`,metadata:new cio.Metadata};return}let s=e.path.split(",");for(let i of s){let a=(0,aka.splitHostPort)(i);if(a===null){this.error={code:XNn.Status.UNAVAILABLE,details:`Failed to parse ${e.scheme} address ${i}`,metadata:new cio.Metadata};return}if(e.scheme===uio&&!(0,oka.isIPv4)(a.host)||e.scheme===dio&&!(0,oka.isIPv6)(a.host)){this.error={code:XNn.Status.UNAVAILABLE,details:`Failed to parse ${e.scheme} address ${i}`,metadata:new cio.Metadata};return}o.push({host:a.host,port:(r=a.port)!==null&&r!==void 0?r:Yfp})}this.endpoints=o.map((i)=>({addresses:[i]})),lka("Parsed "+e.scheme+" address list "+o.map(Kfp.subchannelAddressToString))}updateResolution(){if(!this.hasReturnedResult)this.hasReturnedResult=!0,process.nextTick(()=>{if(this.error)this.listener((0,ska.statusOrFromError)(this.error),{},null,"");else this.listener((0,ska.statusOrFromValue)(this.endpoints),{},null,"")})}destroy(){this.hasReturnedResult=!1}static getDefaultAuthority(e){return e.path.split(",")[0]}}function Jfp(){(0,ika.registerResolver)(uio,pio),(0,ika.registerResolver)(dio,pio)}});
export {cka};
