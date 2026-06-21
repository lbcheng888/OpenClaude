// @ts-nocheck
import {X} from "../runtime.ts";
var xis=X((bgr)=>{Object.defineProperty(bgr,"__esModule",{value:!0});bgr.headStream=Weu;async function Weu(e,t){let n=0,r=[],o=e.getReader(),s=!1;while(!s){let{done:l,value:c}=await o.read();if(c)r.push(c),n+=c?.byteLength??0;if(n>=t)break;s=l}o.releaseLock();let i=new Uint8Array(Math.min(t,n)),a=0;for(let l of r){if(l.byteLength>i.byteLength-a){i.set(l.subarray(0,i.byteLength-a),a);break}else i.set(l,a);a+=l.length}return i}});
export {xis};
