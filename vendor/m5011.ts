// @ts-nocheck
import {b} from "../runtime.ts";
import {D0o,HLl} from "../src/session/5010_performHeapDump.ts";
import {xLl,ILl} from "./m5010.ts";
var F_m,DLl;
var PLl=b(()=>{F_m={type:"local",name:"heapdump",description:"Dump the JS heap to ~/Desktop",isHidden:!0,supportsNonInteractive:!0,fleetHostCall:async({setInfo:e,setError:t})=>{e("Writing heap dump\u2026");let{performHeapDump:n}=await Promise.resolve().then(() => (D0o(),HLl)),r=await n();if(r.success)e(`Heap dump written to ${r.heapPath}`);else t(`Couldn't write heap dump \u2014 ${r.error}`)},load:()=>Promise.resolve().then(() => (xLl(),ILl))},DLl=F_m});
export {F_m,DLl,PLl};
