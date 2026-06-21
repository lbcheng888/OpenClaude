// @ts-nocheck
import {X} from "../runtime.ts";
import {Dmt} from "./m4725.ts";
import {tEo} from "./m4733.ts";
var khl=X((I5y,xhl)=>{var whl=!0,Rhl=require("zlib");if(!Rhl.deflateSync)whl=!1;var OQp=Dmt(),LQp=tEo();xhl.exports=function(e,t){if(!whl)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let r=new LQp(t||{}),o=[];if(o.push(Buffer.from(OQp.PNG_SIGNATURE)),o.push(r.packIHDR(e.width,e.height)),e.gamma)o.push(r.packGAMA(e.gamma));let s=r.filterData(e.data,e.width,e.height),i=Rhl.deflateSync(s,r.getDeflateOptions());if(s=null,!i||!i.length)throw Error("bad png - invalid compressed data response");return o.push(r.packIDAT(i)),o.push(r.packIEND()),Buffer.concat(o)}});
export {khl};
