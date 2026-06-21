// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Ds,Iu} from "./m643.ts";
import {MD,ws} from "./m228.ts";
import {Wvn,qAe} from "./m2676.ts";
var Lja={};
isFullscreenWithTTY(Lja,{readFileForRemote:()=>readFileForRemote,REMOTE_READ_MAX_BYTES:()=>REMOTE_READ_MAX_BYTES});
async function readFileForRemote(e,t,n,r="utf-8"){let o=Ds(e);for(let a of MD(o))if(!Wvn(a,n,"read").allowed)throw Error(`read denied: ${e}`);let s=Math.min(t&&t>0?t:lDp,REMOTE_READ_MAX_BYTES),i=await Oja.open(o,"r");try{let a=Buffer.alloc(s+1),{bytesRead:l}=await i.read(a,0,s+1,0),c=l>s;return{contents:a.subarray(0,Math.min(l,s)).toString(r==="base64"?"base64":"utf-8"),absPath:o,...c&&{truncated:c},...r==="base64"&&{encoding:r}}}finally{await i.close()}}
var Oja,lDp=1e6,REMOTE_READ_MAX_BYTES=1e7;
var J9t=b(()=>{ws();Iu();qAe();Oja=require("fs/promises")});
export {Lja,readFileForRemote,Oja,lDp,REMOTE_READ_MAX_BYTES,J9t};
