// @ts-nocheck
import {Q} from "../runtime.ts";
import {zps} from "./m818.ts";
import {bCe} from "./m797.ts";
var Jps=Q((iEr)=>{Object.defineProperty(iEr,"__esModule",{value:!0});iEr.splitStream=Xdu;var jps=require("stream"),Jdu=zps(),Yps=bCe();async function Xdu(e){if((0,Yps.isReadableStream)(e)||(0,Yps.isBlob)(e))return(0,Jdu.splitStream)(e);let t=new jps.PassThrough,n=new jps.PassThrough;return e.pipe(t),e.pipe(n),[t,n]}});
export {Jps};
