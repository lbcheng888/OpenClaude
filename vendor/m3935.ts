// @ts-nocheck
import {useIsScreenReaderEnabled,dwe} from "./m2434.ts";
import {VK,F4} from "./m2416.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function sct(){let e=useIsScreenReaderEnabled(),t=VK();return AMa.useCallback(()=>{if(!e)return;let n=Date.now();if(n-fMa<OSp)return;fMa=n,t.notifyBell()},[e,t])}
var AMa,fMa=0,OSp=500,hMa=5000;
var hUn=b(()=>{dwe();F4();AMa=M(Te(),1)});
export {sct,AMa,fMa,OSp,hMa,hUn};
