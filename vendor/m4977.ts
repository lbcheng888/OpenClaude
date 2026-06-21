// @ts-nocheck
import {b} from "../runtime.ts";
import {nxl,txl} from "./m4976.ts";
var Tlm,kVn;
var rxl=b(()=>{Tlm={type:"local",name:"reload-skills",description:"Pick up skills added or changed on disk during this session",supportsNonInteractive:!0,thinClientDispatch:"post-text",load:()=>Promise.resolve().then(() => (nxl(),txl))},kVn=Tlm});
export {Tlm,kVn,rxl};
