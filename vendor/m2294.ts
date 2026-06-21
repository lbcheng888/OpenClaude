// @ts-nocheck
import {X} from "../runtime.ts";
var bIt=X((Wth,nTi)=>{var Wtd=typeof process==="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};nTi.exports=Wtd});
export {bIt};
