// @ts-nocheck
import {X} from "../runtime.ts";
import {Xee} from "./m3517.ts";
import {o3e} from "./m3531.ts";
var qTa=X((wto)=>{Object.defineProperty(wto,"__esModule",{value:!0});wto.setup=rop;var top=Xee(),nop=o3e();class $Ta{constructor(e,t,n){this.listener=t,this.hasReturnedResult=!1,this.endpoints=[];let r;if(e.authority==="")r="/"+e.path;else r=e.path;this.endpoints=[{addresses:[{path:r}]}]}updateResolution(){if(!this.hasReturnedResult)this.hasReturnedResult=!0,process.nextTick(this.listener,(0,nop.statusOrFromValue)(this.endpoints),{},null,"")}destroy(){this.hasReturnedResult=!1}static getDefaultAuthority(e){return"localhost"}}function rop(){(0,top.registerResolver)("unix",$Ta)}});
export {qTa};
