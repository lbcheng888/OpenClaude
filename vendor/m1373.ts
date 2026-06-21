// @ts-nocheck
import {aFs,lFs,cFs} from "./m1372.ts";
import {b} from "../runtime.ts";
var uFs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),dFs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Kcn=(e)=>Object.assign(aFs(e),uFs(e)),Y0u,uwr=(e)=>Object.assign(lFs(e),dFs(e));
var pFs=b(()=>{cFs();Y0u=Kcn});
export {uFs,dFs,Kcn,Y0u,uwr,pFs};
