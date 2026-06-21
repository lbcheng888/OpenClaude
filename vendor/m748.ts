// @ts-nocheck
import {X} from "../runtime.ts";
var Brs=X((Jhr)=>{var Nrs=(e)=>encodeURIComponent(e).replace(/[!'()*]/g,EZc),EZc=(e)=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`,CZc=(e)=>e.split("/").map(Nrs).join("/");Jhr.escapeUri=Nrs;Jhr.escapeUriPath=CZc});
export {Brs};
