// @ts-nocheck
import {Q} from "../runtime.ts";
import {g8s} from "./m1476.ts";
import {y8s} from "./m1477.ts";
var S8s=Q((cwh,UAe)=>{var kXe=g8s(),{toPromise:Jmn,toSync:Xmn,toSyncOptions:Vxr}=y8s();async function T8s(e,t){let n=await Jmn(kXe.lock)(e,t);return Jmn(n)}function d3u(e,t){let n=Xmn(kXe.lock)(e,Vxr(t));return Xmn(n)}function p3u(e,t){return Jmn(kXe.unlock)(e,t)}function m3u(e,t){return Xmn(kXe.unlock)(e,Vxr(t))}function f3u(e,t){return Jmn(kXe.check)(e,t)}function h3u(e,t){return Xmn(kXe.check)(e,Vxr(t))}UAe.exports=T8s;UAe.exports.lock=T8s;UAe.exports.unlock=p3u;UAe.exports.lockSync=d3u;UAe.exports.unlockSync=m3u;UAe.exports.check=f3u;UAe.exports.checkSync=h3u});
export {S8s};
