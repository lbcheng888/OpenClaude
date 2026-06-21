// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Xi} from "./m2091.ts";
class vea{als=new Cea.AsyncLocalStorage;active(){return this.als.getStore()??Eea.ROOT_CONTEXT}with(e,t,n,...r){let o=n==null?t:t.bind(n);return this.als.run(e,o,...r)}enterWith(e){this.als.enterWith(e)}bind(e,t){if(typeof t==="function"){let n=(...r)=>this.with(e,()=>t(...r));return Object.defineProperty(n,"length",{configurable:!0,enumerable:!1,writable:!1,value:t.length}),n}return t}enable(){return this}disable(){return this.als.disable(),this}}
var Eea,Cea,Ihe;
var lKr=b(()=>{Eea=M(Xi(),1),Cea=require("async_hooks");Ihe=new vea});
export {vea,Eea,Cea,Ihe,lKr};
