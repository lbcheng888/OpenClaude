// @ts-nocheck
import {b,x} from "../runtime.ts";
var WZo,GZo,VZo;
var KZo=b(()=>{WZo=x(require("stream"));GZo=class GZo extends WZo.default.Transform{__transform(e,t,n){this.push(e),n()}_transform(e,t,n){if(e.length!==0){if(this._transform=this.__transform,e[0]!==120){let r=Buffer.alloc(2);r[0]=120,r[1]=156,this.push(r,t)}}this.__transform(e,t,n)}};VZo=GZo});
export {WZo,GZo,VZo,KZo};
