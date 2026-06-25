// @ts-nocheck
import {WLs,GLs,VLs} from "./m1212.ts";
import {MLs,NLs,FLs} from "./m1210.ts";
import {b} from "../runtime.ts";
var KLs=(e,t)=>({applyToStack:(n)=>{n.addRelativeTo(WLs(e,t),GLs),n.add(MLs(),NLs)}});
var zLs=b(()=>{FLs();VLs()});
export {KLs,zLs};
