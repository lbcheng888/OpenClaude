// @ts-nocheck
import {Q} from "../runtime.ts";
var Dcs=Q((Rbr)=>{var xcs=(e)=>encodeURIComponent(e).replace(/[!'()*]/g,Bcu),Bcu=(e)=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`,Ucu=(e)=>e.split("/").map(xcs).join("/");Rbr.escapeUri=xcs;Rbr.escapeUriPath=Ucu});
export {Dcs};
