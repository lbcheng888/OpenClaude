// @ts-nocheck
import {X} from "../runtime.ts";
var Mcs=X((T_r)=>{var Lcs=(e)=>encodeURIComponent(e).replace(/[!'()*]/g,bou),bou=(e)=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`,Eou=(e)=>e.split("/").map(Lcs).join("/");T_r.escapeUri=Lcs;T_r.escapeUriPath=Eou});
export {Mcs};
