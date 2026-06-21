// @ts-nocheck
import {X} from "../runtime.ts";
import {S9s} from "./m1471.ts";
import {E9s} from "./m1472.ts";
var v9s=X(($fA,rCe)=>{var HYe=S9s(),{toPromise:fdn,toSync:Adn,toSyncOptions:Axr}=E9s();async function C9s(e,t){let n=await fdn(HYe.lock)(e,t);return fdn(n)}function VOu(e,t){let n=Adn(HYe.lock)(e,Axr(t));return Adn(n)}function KOu(e,t){return fdn(HYe.unlock)(e,t)}function zOu(e,t){return Adn(HYe.unlock)(e,Axr(t))}function YOu(e,t){return fdn(HYe.check)(e,t)}function JOu(e,t){return Adn(HYe.check)(e,Axr(t))}rCe.exports=C9s;rCe.exports.lock=C9s;rCe.exports.unlock=KOu;rCe.exports.lockSync=VOu;rCe.exports.unlockSync=zOu;rCe.exports.check=YOu;rCe.exports.checkSync=JOu});
export {v9s};
