// @ts-nocheck
import {SFe,UPr,Ijs,Hjs} from "./m1644.ts";
import {b} from "../runtime.ts";
import {_Ht,ase} from "./m1645.ts";
function qPr(e){if(e instanceof x3)return!0;return SFe(e)&&e.name==="RestError"}
var Mqu,x3;
var WPr=b(()=>{UPr();Ijs();_Ht();Mqu=new ase;x3=class x3 extends Error{constructor(e,t={}){super(e);this.name="RestError",this.code=t.code,this.statusCode=t.statusCode,Object.defineProperty(this,"request",{value:t.request,enumerable:!1}),Object.defineProperty(this,"response",{value:t.response,enumerable:!1}),Object.defineProperty(this,Hjs,{value:()=>`RestError: ${this.message} 
 ${Mqu.sanitize(Object.assign(Object.assign({},this),{request:this.request,response:this.response}))}`,enumerable:!1}),Object.setPrototypeOf(this,x3.prototype)}};x3.REQUEST_SEND_ERROR="REQUEST_SEND_ERROR";x3.PARSE_ERROR="PARSE_ERROR"});
export {qPr,Mqu,x3,WPr};
