// @ts-nocheck
import {b,x} from "../runtime.ts";
import {xi} from "./m2096.ts";
class Aaa{als=new Caa.AsyncLocalStorage;active(){return this.als.getStore()??Eaa.ROOT_CONTEXT}with(e,t,n,...r){let o=n==null?t:t.bind(n);return this.als.run(e,o,...r)}enterWith(e){this.als.enterWith(e)}bind(e,t){if(typeof t==="function"){let n=(...r)=>this.with(e,()=>t(...r));return Object.defineProperty(n,"length",{configurable:!0,enumerable:!1,writable:!1,value:t.length}),n}return t}enable(){return this}disable(){return this.als.disable(),this}}
var Eaa,Caa,Wge;
var $Xr=b(()=>{Eaa=x(xi(),1),Caa=require("async_hooks");Wge=new Aaa});
export {Aaa,Eaa,Caa,Wge,$Xr};
