// @ts-nocheck
import {b} from "../runtime.ts";
import {TLl,yLl} from "./m5004.ts";
var I_m,SYn;
var SLl=b(()=>{I_m={type:"local",name:"reload-plugins",description:"Activate pending plugin changes in the current session",argumentHint:"[--force]",supportsNonInteractive:!1,thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (TLl(),yLl))},SYn=I_m});
export {I_m,SYn,SLl};
