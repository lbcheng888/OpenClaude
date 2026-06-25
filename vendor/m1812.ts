// @ts-nocheck
import {Q} from "../runtime.ts";
import {HQe} from "./m1805.ts";
import {xMr} from "./m1806.ts";
import {FMr} from "./m1810.ts";
import {BMr} from "./m1811.ts";
var RZs=Q((D8h,AZs)=>{var yGu=HQe().Buffer,SZs=xMr(),TGu=FMr(),SGu=require("stream"),bZs=BMr(),UMr=require("util");function EZs(e,t){return yGu.from(e,t).toString("base64").replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function bGu(e,t,n){n=n||"utf8";var r=EZs(bZs(e),"binary"),o=EZs(bZs(t),n);return UMr.format("%s.%s",r,o)}function CZs(e){var{header:t,payload:n}=e,r=e.secret||e.privateKey,o=e.encoding,s=TGu(t.alg),i=bGu(t,n,o),a=s.sign(i,r);return UMr.format("%s.%s",i,a)}function Kgn(e){var t=e.secret;if(t=t==null?e.privateKey:t,t=t==null?e.key:t,/^hs/i.test(e.header.alg)===!0&&t==null)throw TypeError("secret must be a string or buffer or a KeyObject");var n=new SZs(t);this.readable=!0,this.header=e.header,this.encoding=e.encoding,this.secret=this.privateKey=this.key=n,this.payload=new SZs(e.payload),this.secret.once("close",function(){if(!this.payload.writable&&this.readable)this.sign()}.bind(this)),this.payload.once("close",function(){if(!this.secret.writable&&this.readable)this.sign()}.bind(this))}UMr.inherits(Kgn,SGu);Kgn.prototype.sign=function(){try{var t=CZs({header:this.header,payload:this.payload.buffer,secret:this.secret.buffer,encoding:this.encoding});return this.emit("done",t),this.emit("data",t),this.emit("end"),this.readable=!1,t}catch(n){this.readable=!1,this.emit("error",n),this.emit("close")}};Kgn.sign=CZs;AZs.exports=Kgn});
export {RZs};
