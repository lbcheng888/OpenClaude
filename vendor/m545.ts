// @ts-nocheck
import {b,M} from "../runtime.ts";
var VKo,KKo,zKo;
var YKo=b(()=>{VKo=M(require("stream"));KKo=class KKo extends VKo.default.Transform{__transform(e,t,n){this.push(e),n()}_transform(e,t,n){if(e.length!==0){if(this._transform=this.__transform,e[0]!==120){let r=Buffer.alloc(2);r[0]=120,r[1]=156,this.push(r,t)}}this.__transform(e,t,n)}};zKo=KKo});
export {VKo,KKo,zKo,YKo};
