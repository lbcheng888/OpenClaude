// @ts-nocheck
import {X} from "../runtime.ts";
import {ghl} from "./m4735.ts";
import {nEo} from "./m4736.ts";
import {Shl} from "./m4737.ts";
import {Xbo} from "./m4727.ts";
import {Qbo} from "./m4728.ts";
import {Zbo} from "./m4729.ts";
var vhl=X((H5y,Chl)=>{var bhl=!0,Ehl=require("zlib"),xQp=ghl();if(!Ehl.deflateSync)bhl=!1;var kQp=nEo(),HQp=Shl(),IQp=Xbo(),DQp=Qbo(),PQp=Zbo();Chl.exports=function(e,t){if(!bhl)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let n;function r(T){n=T}let o;function s(T){o=T}function i(T){o.transColor=T}function a(T){o.palette=T}function l(){o.alpha=!0}let c;function u(T){c=T}let d=[];function p(T){d.push(T)}let m=new kQp(e);if(new IQp(t,{read:m.read.bind(m),error:r,metadata:s,gamma:u,palette:a,transColor:i,inflateData:p,simpleTransparency:l}).start(),m.process(),n)throw n;let A=Buffer.concat(d);d.length=0;let h;if(o.interlace)h=Ehl.inflateSync(A);else{let S=((o.width*o.bpp*o.depth+7>>3)+1)*o.height;h=xQp(A,{chunkSize:S,maxLength:S})}if(A=null,!h||!h.length)throw Error("bad png - invalid inflate data response");let g=HQp.process(h,o);A=null;let _=DQp.dataToBitMap(g,o);g=null;let y=PQp(_,o);return o.data=y,o.gamma=c||0,o}});
export {vhl};
