// @ts-nocheck
import {b,M} from "../runtime.ts";
import {sKo,oKo} from "./m519.ts";
import {hpr,ten} from "./m513.ts";
var aKo,Tpr="abcdefghijklmnopqrstuvwxyz",iKo="0123456789",lKo,OUc=(e=16,t=lKo.ALPHA_DIGIT)=>{let n="",{length:r}=t,o=new Uint32Array(e);aKo.default.randomFillSync(o);for(let s=0;s<e;s++)n+=t[o[s]%r];return n},cKo;
var uKo=b(()=>{sKo();hpr();aKo=M(require("crypto")),lKo={DIGIT:iKo,ALPHA:Tpr,ALPHA_DIGIT:Tpr+Tpr.toUpperCase()+iKo},cKo={isNode:!0,classes:{URLSearchParams:oKo,FormData:ten,Blob:typeof Blob<"u"&&Blob||null},ALPHABET:lKo,generateString:OUc,protocols:["http","https","file","data"]}});
export {aKo,Tpr,iKo,lKo,OUc,cKo,uKo};
