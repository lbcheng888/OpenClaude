// @ts-nocheck
import {sPr,wXs} from "./m1912.ts";
import {aPr,IXs} from "./m1914.ts";
import {cPr,OXs} from "./m1915.ts";
import {b,M} from "../runtime.ts";
async function uPr(){if($fn.default.platform==="darwin"){let e=await sPr();return{name:await aPr(e),id:e}}if($fn.default.platform==="linux"){let{stdout:e}=await n6u("xdg-mime",["query","default","x-scheme-handler/http"]),t=e.trim();return{name:r6u(t.replace(/.desktop$/,"").replace("-"," ")),id:t}}if($fn.default.platform==="win32")return cPr();throw Error("Only macOS, Linux, and Windows are supported")}
var LXs,$fn,MXs,n6u,r6u=(e)=>e.toLowerCase().replaceAll(/(?:^|\s|-)\S/g,(t)=>t.toUpperCase());
var NXs=b(()=>{wXs();IXs();OXs();LXs=require("util"),$fn=M(require("process")),MXs=require("child_process"),n6u=LXs.promisify(MXs.execFile)});
export {uPr,LXs,$fn,MXs,n6u,r6u,NXs};
