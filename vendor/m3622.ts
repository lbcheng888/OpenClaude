// @ts-nocheck
import {Q} from "../runtime.ts";
import {Vee} from "./m3533.ts";
import {y4e} from "./m3547.ts";
var rka=Q((lio)=>{Object.defineProperty(lio,"__esModule",{value:!0});lio.setup=Vfp;var Wfp=Vee(),Gfp=y4e();class nka{constructor(e,t,n){this.listener=t,this.hasReturnedResult=!1,this.endpoints=[];let r;if(e.authority==="")r="/"+e.path;else r=e.path;this.endpoints=[{addresses:[{path:r}]}]}updateResolution(){if(!this.hasReturnedResult)this.hasReturnedResult=!0,process.nextTick(this.listener,(0,Gfp.statusOrFromValue)(this.endpoints),{},null,"")}destroy(){this.hasReturnedResult=!1}static getDefaultAuthority(e){return"localhost"}}function Vfp(){(0,Wfp.registerResolver)("unix",nka)}});
export {rka};
