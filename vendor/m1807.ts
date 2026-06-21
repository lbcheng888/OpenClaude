// @ts-nocheck
import {X} from "../runtime.ts";
import {IJe} from "./m1800.ts";
import {tDr} from "./m1801.ts";
import {lDr} from "./m1805.ts";
import {cDr} from "./m1806.ts";
var HKs=X((uNA,kKs)=>{var ZUu=IJe().Buffer,vKs=tDr(),e2u=lDr(),t2u=require("stream"),wKs=cDr(),uDr=require("util");function RKs(e,t){return ZUu.from(e,t).toString("base64").replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function n2u(e,t,n){n=n||"utf8";var r=RKs(wKs(e),"binary"),o=RKs(wKs(t),n);return uDr.format("%s.%s",r,o)}function xKs(e){var{header:t,payload:n}=e,r=e.secret||e.privateKey,o=e.encoding,s=e2u(t.alg),i=n2u(t,n,o),a=s.sign(i,r);return uDr.format("%s.%s",i,a)}function ufn(e){var t=e.secret;if(t=t==null?e.privateKey:t,t=t==null?e.key:t,/^hs/i.test(e.header.alg)===!0&&t==null)throw TypeError("secret must be a string or buffer or a KeyObject");var n=new vKs(t);this.readable=!0,this.header=e.header,this.encoding=e.encoding,this.secret=this.privateKey=this.key=n,this.payload=new vKs(e.payload),this.secret.once("close",function(){if(!this.payload.writable&&this.readable)this.sign()}.bind(this)),this.payload.once("close",function(){if(!this.secret.writable&&this.readable)this.sign()}.bind(this))}uDr.inherits(ufn,t2u);ufn.prototype.sign=function(){try{var t=xKs({header:this.header,payload:this.payload.buffer,secret:this.secret.buffer,encoding:this.encoding});return this.emit("done",t),this.emit("data",t),this.emit("end"),this.readable=!1,t}catch(n){this.readable=!1,this.emit("error",n),this.emit("close")}};ufn.sign=xKs;kKs.exports=ufn});
export {HKs};
