// @ts-nocheck
import {b} from "../runtime.ts";
import {Wde,Ia,Yr} from "./m135.ts";
import {Urr,wzt,Frr} from "./m150.ts";
var k_t,ALe;
var Rzt=b(()=>{Wde();Urr();ALe=class ALe extends Promise{constructor(e,t,n=wzt){super((r)=>{r(null)});this.responsePromise=t,this.parseResponse=n,k_t.set(this,void 0),Ia(this,k_t,e,"f")}_thenUnwrap(e){return new ALe(Yr(this,k_t,"f"),this.responsePromise,async(t,n)=>Frr(e(await this.parseResponse(t,n),n),n.response))}asResponse(){return this.responsePromise.then((e)=>e.response)}async withResponse(){let[e,t]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:t,request_id:t.headers.get("request-id")}}parse(){if(!this.parsedPromise)this.parsedPromise=this.responsePromise.then((e)=>this.parseResponse(Yr(this,k_t,"f"),e));return this.parsedPromise}then(e,t){return this.parse().then(e,t)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}};k_t=new WeakMap});
export {k_t,ALe,Rzt};
