// @ts-nocheck
import {b} from "../runtime.ts";
import {ywo,cxl} from "../src/session/4980_performHeapDump.ts";
import {dxl,uxl} from "./m4980.ts";
var wlm,pxl;
var mxl=b(()=>{wlm={type:"local",name:"heapdump",description:"Dump the JS heap to ~/Desktop",isHidden:!0,supportsNonInteractive:!0,fleetHostCall:async({setInfo:e,setError:t})=>{e("Writing heap dump\u2026");let{performHeapDump:n}=await Promise.resolve().then(() => (ywo(),cxl)),r=await n();if(r.success)e(`Heap dump written to ${r.heapPath}`);else t(`Couldn't write heap dump \u2014 ${r.error}`)},load:()=>Promise.resolve().then(() => (dxl(),uxl))},pxl=wlm});
export {wlm,pxl,mxl};
