// @ts-nocheck
import {_i,hp} from "../src/session/1460_promise.ts";
import {b} from "../runtime.ts";
import {Ekl,bkl} from "./m5011.ts";
import {vkl,Ckl} from "./m5012.ts";
function wkl(){return _i()?"Detach from this background session (it keeps running)":"Exit the CLI"}
var MVn,Ocm,Rkl,Nwo;
var NVn=b(()=>{hp();MVn=["exit","quit",":q",":q!",":wq",":wq!"];Ocm={type:"local-jsx",name:"exit",aliases:["quit"],get description(){return wkl()},immediate:!0,requires:{ink:!0},fleetHostCall:async({exit:e})=>e(),load:()=>Promise.resolve().then(() => (Ekl(),bkl))},Rkl={type:"local",name:"exit",supportsNonInteractive:!0,get description(){return wkl()},load:()=>Promise.resolve().then(() => (vkl(),Ckl))},Nwo=Ocm});
export {wkl,MVn,Ocm,Rkl,Nwo,NVn};
