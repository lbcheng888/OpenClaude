// @ts-nocheck
import {Q} from "../runtime.ts";
import {Ybr} from "./m801.ts";
import {yps} from "./m802.ts";
import {bCe} from "./m797.ts";
var Sps=Q((Jbr)=>{Object.defineProperty(Jbr,"__esModule",{value:!0});Jbr.createBufferedReadable=rdu;var tdu=require("stream"),Tps=Ybr(),eme=yps(),ndu=bCe();function rdu(e,t,n){if((0,ndu.isReadableStream)(e))return(0,eme.createBufferedReadableStream)(e,t,n);let r=new tdu.Readable({read(){}}),o=!1,s=0,i=["",new Tps.ByteArrayCollector((l)=>new Uint8Array(l)),new Tps.ByteArrayCollector((l)=>Buffer.from(new Uint8Array(l)))],a=-1;return e.on("data",(l)=>{let c=(0,eme.modeOf)(l,!0);if(a!==c){if(a>=0)r.push((0,eme.flush)(i,a));a=c}if(a===-1){r.push(l);return}let u=(0,eme.sizeOf)(l);s+=u;let d=(0,eme.sizeOf)(i[a]);if(u>=t&&d===0)r.push(l);else{let p=(0,eme.merge)(i,a,l);if(!o&&s>t*2)o=!0,n?.warn(`@smithy/util-stream - stream chunk size ${u} is below threshold of ${t}, automatically buffering.`);if(p>=t)r.push((0,eme.flush)(i,a))}}),e.on("end",()=>{if(a!==-1){let l=(0,eme.flush)(i,a);if((0,eme.sizeOf)(l)>0)r.push(l)}r.push(null)}),r}});
export {Sps};
