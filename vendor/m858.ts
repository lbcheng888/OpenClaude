// @ts-nocheck
import {Q} from "../runtime.ts";
var Ihs=Q((YEr)=>{var Hhs=(e)=>encodeURIComponent(e).replace(/[!'()*]/g,Ffu),Ffu=(e)=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`,Bfu=(e)=>e.split("/").map(Hhs).join("/");YEr.escapeUri=Hhs;YEr.escapeUriPath=Bfu});
export {Ihs};
