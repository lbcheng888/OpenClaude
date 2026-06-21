// @ts-nocheck
import {b} from "../runtime.ts";
function s5n(e,t){let n=new Scl.StringDecoder("utf8"),r="",o=!1,s=(a)=>{if(o)return;r+=typeof a==="string"?a:n.write(a);let l;while((l=r.indexOf(`
`))>=0){let c=r.slice(0,l);if(r=r.slice(l+1),c)t(c)}if(r.length>h7p){if(o=!0,r="","destroy"in e)e.destroy()}},i=()=>{if(o)return;if(r+=n.end(),r)t(r),r=""};return e.on("data",s),e.on("end",i),e.on("close",i),()=>{e.off("data",s),e.off("end",i),e.off("close",i)}}
var Scl,h7p=1048576;
var MTo=b(()=>{Scl=require("string_decoder")});
export {s5n,Scl,h7p,MTo};
