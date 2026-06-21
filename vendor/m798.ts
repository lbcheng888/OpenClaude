// @ts-nocheck
import {X} from "../runtime.ts";
import {Tgr} from "./m796.ts";
import {Cis} from "./m797.ts";
import {Fbe} from "./m792.ts";
var wis=X((Sgr)=>{Object.defineProperty(Sgr,"__esModule",{value:!0});Sgr.createBufferedReadable=$eu;var Feu=require("stream"),vis=Tgr(),Vpe=Cis(),Ueu=Fbe();function $eu(e,t,n){if((0,Ueu.isReadableStream)(e))return(0,Vpe.createBufferedReadableStream)(e,t,n);let r=new Feu.Readable({read(){}}),o=!1,s=0,i=["",new vis.ByteArrayCollector((l)=>new Uint8Array(l)),new vis.ByteArrayCollector((l)=>Buffer.from(new Uint8Array(l)))],a=-1;return e.on("data",(l)=>{let c=(0,Vpe.modeOf)(l,!0);if(a!==c){if(a>=0)r.push((0,Vpe.flush)(i,a));a=c}if(a===-1){r.push(l);return}let u=(0,Vpe.sizeOf)(l);s+=u;let d=(0,Vpe.sizeOf)(i[a]);if(u>=t&&d===0)r.push(l);else{let p=(0,Vpe.merge)(i,a,l);if(!o&&s>t*2)o=!0,n?.warn(`@smithy/util-stream - stream chunk size ${u} is below threshold of ${t}, automatically buffering.`);if(p>=t)r.push((0,Vpe.flush)(i,a))}}),e.on("end",()=>{if(a!==-1){let l=(0,Vpe.flush)(i,a);if((0,Vpe.sizeOf)(l)>0)r.push(l)}r.push(null)}),r}});
export {wis};
