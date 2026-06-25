// @ts-nocheck
import {Q} from "../runtime.ts";
import {mAl} from "./m4767.ts";
import {bko} from "./m4768.ts";
import {_Al} from "./m4769.ts";
import {gko} from "./m4759.ts";
import {_ko} from "./m4760.ts";
import {yko} from "./m4761.ts";
var bAl=Q((PrS,SAl)=>{var yAl=!0,TAl=require("zlib"),$am=mAl();if(!TAl.deflateSync)yAl=!1;var qam=bko(),Wam=_Al(),Gam=gko(),Vam=_ko(),Kam=yko();SAl.exports=function(e,t){if(!yAl)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let n;function r(S){n=S}let o;function s(S){o=S}function i(S){o.transColor=S}function a(S){o.palette=S}function l(){o.alpha=!0}let c;function u(S){c=S}let d=[];function p(S){d.push(S)}let m=new qam(e);if(new Gam(t,{read:m.read.bind(m),error:r,metadata:s,gamma:u,palette:a,transColor:i,inflateData:p,simpleTransparency:l}).start(),m.process(),n)throw n;let h=Buffer.concat(d);d.length=0;let g;if(o.interlace)g=TAl.inflateSync(h);else{let E=((o.width*o.bpp*o.depth+7>>3)+1)*o.height;g=$am(h,{chunkSize:E,maxLength:E})}if(h=null,!g||!g.length)throw Error("bad png - invalid inflate data response");let _=Wam.process(g,o);h=null;let T=Vam.dataToBitMap(_,o);_=null;let y=Kam(T,o);return o.data=y,o.gamma=c||0,o}});
export {bAl};
