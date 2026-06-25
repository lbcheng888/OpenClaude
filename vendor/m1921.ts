// @ts-nocheck
import {L1r,bri} from "./m1917.ts";
import {N1r,vri} from "./m1919.ts";
import {B1r,Hri} from "./m1920.ts";
import {b,x} from "../runtime.ts";
async function U1r(){if(C_n.default.platform==="darwin"){let e=await L1r();return{name:await N1r(e),id:e}}if(C_n.default.platform==="linux"){let{stdout:e}=await bYu("xdg-mime",["query","default","x-scheme-handler/http"]),t=e.trim();return{name:EYu(t.replace(/.desktop$/,"").replace("-"," ")),id:t}}if(C_n.default.platform==="win32")return B1r();throw Error("Only macOS, Linux, and Windows are supported")}
var Iri,C_n,xri,bYu,EYu=(e)=>e.toLowerCase().replaceAll(/(?:^|\s|-)\S/g,(t)=>t.toUpperCase());
var Dri=b(()=>{bri();vri();Hri();Iri=require("util"),C_n=x(require("process")),xri=require("child_process"),bYu=Iri.promisify(xri.execFile)});
export {U1r,Iri,C_n,xri,bYu,EYu,Dri};
