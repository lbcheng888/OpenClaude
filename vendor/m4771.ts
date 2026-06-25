// @ts-nocheck
import {Q} from "../runtime.ts";
import {Ght} from "./m4757.ts";
import {Sko} from "./m4765.ts";
var RAl=Q((OrS,AAl)=>{var EAl=!0,CAl=require("zlib");if(!CAl.deflateSync)EAl=!1;var zam=Ght(),jam=Sko();AAl.exports=function(e,t){if(!EAl)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let r=new jam(t||{}),o=[];if(o.push(Buffer.from(zam.PNG_SIGNATURE)),o.push(r.packIHDR(e.width,e.height)),e.gamma)o.push(r.packGAMA(e.gamma));let s=r.filterData(e.data,e.width,e.height),i=CAl.deflateSync(s,r.getDeflateOptions());if(s=null,!i||!i.length)throw Error("bad png - invalid compressed data response");return o.push(r.packIDAT(i)),o.push(r.packIEND()),Buffer.concat(o)}});
export {RAl};
