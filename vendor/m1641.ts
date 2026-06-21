// @ts-nocheck
import {CNe,uHr,L5s,O5s} from "./m1639.ts";
import {b} from "../runtime.ts";
import {Wwt,lse} from "./m1640.ts";
function pHr(e){if(e instanceof p4)return!0;return CNe(e)&&e.name==="RestError"}
var g1u,p4;
var mHr=b(()=>{uHr();L5s();Wwt();g1u=new lse;p4=class p4 extends Error{constructor(e,t={}){super(e);this.name="RestError",this.code=t.code,this.statusCode=t.statusCode,Object.defineProperty(this,"request",{value:t.request,enumerable:!1}),Object.defineProperty(this,"response",{value:t.response,enumerable:!1}),Object.defineProperty(this,O5s,{value:()=>`RestError: ${this.message} 
 ${g1u.sanitize(Object.assign(Object.assign({},this),{request:this.request,response:this.response}))}`,enumerable:!1}),Object.setPrototypeOf(this,p4.prototype)}};p4.REQUEST_SEND_ERROR="REQUEST_SEND_ERROR";p4.PARSE_ERROR="PARSE_ERROR"});
export {pHr,g1u,p4,mHr};
