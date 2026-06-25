// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {hs,Tu} from "./m649.ts";
import {d0,ps} from "./m230.ts";
import {Pkn,tge} from "./m2687.ts";
var EVl={};
ft(EVl,{readFileForRemote:()=>readFileForRemote,REMOTE_READ_MAX_BYTES:()=>REMOTE_READ_MAX_BYTES});
async function readFileForRemote(e,t,n,r="utf-8"){let o=hs(e);for(let a of d0(o))if(!Pkn(a,n,"read").allowed)throw Error(`read denied: ${e}`);let s=Math.min(t&&t>0?t:kLm,REMOTE_READ_MAX_BYTES),i=await bVl.open(o,"r");try{let a=Buffer.alloc(s+1),{bytesRead:l}=await i.read(a,0,s+1,0),c=l>s;return{contents:a.subarray(0,Math.min(l,s)).toString(r==="base64"?"base64":"utf-8"),absPath:o,...c&&{truncated:c},...r==="base64"&&{encoding:r}}}finally{await i.close()}}
var bVl,kLm=1e6,REMOTE_READ_MAX_BYTES=1e7;
var s7t=b(()=>{ps();Tu();tge();bVl=require("fs/promises")});
export {EVl,readFileForRemote,bVl,kLm,REMOTE_READ_MAX_BYTES,s7t};
