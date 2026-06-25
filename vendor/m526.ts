// @ts-nocheck
import {b,x} from "../runtime.ts";
import {nZo,tZo} from "./m525.ts";
import {Vgr,Mnn} from "./m519.ts";
var oZo,Ygr="abcdefghijklmnopqrstuvwxyz",rZo="0123456789",sZo,$Wc=(e=16,t=sZo.ALPHA_DIGIT)=>{let n="",{length:r}=t,o=new Uint32Array(e);oZo.default.randomFillSync(o);for(let s=0;s<e;s++)n+=t[o[s]%r];return n},iZo;
var aZo=b(()=>{nZo();Vgr();oZo=x(require("crypto")),sZo={DIGIT:rZo,ALPHA:Ygr,ALPHA_DIGIT:Ygr+Ygr.toUpperCase()+rZo},iZo={isNode:!0,classes:{URLSearchParams:tZo,FormData:Mnn,Blob:typeof Blob<"u"&&Blob||null},ALPHABET:sZo,generateString:$Wc,protocols:["http","https","file","data"]}});
export {oZo,Ygr,rZo,sZo,$Wc,iZo,aZo};
