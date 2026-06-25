// @ts-nocheck
import {Ws,vd} from "../src/session/1465_promise.ts";
import {b} from "../runtime.ts";
import {GMl,qMl} from "./m5041.ts";
import {KMl,VMl} from "./m5042.ts";
function zMl(){return Ws()?"Detach from this background session (it keeps running)":"Exit the CLI"}
var kYn,Kym,jMl,Y0o;
var HYn=b(()=>{vd();kYn=["exit","quit",":q",":q!",":wq",":wq!"];Kym={type:"local-jsx",name:"exit",aliases:["quit"],get description(){return zMl()},immediate:!0,requires:{ink:!0},fleetHostCall:async({exit:e})=>e(),load:()=>Promise.resolve().then(() => (GMl(),qMl))},jMl={type:"local",name:"exit",supportsNonInteractive:!0,get description(){return zMl()},load:()=>Promise.resolve().then(() => (KMl(),VMl))},Y0o=Kym});
export {zMl,kYn,Kym,jMl,Y0o,HYn};
