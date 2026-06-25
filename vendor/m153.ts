// @ts-nocheck
import {b} from "../runtime.ts";
import {Qde,ma,Xr} from "./m137.ts";
import {hlr,sXt,flr} from "./m152.ts";
var rbt,cMe;
var iXt=b(()=>{Qde();hlr();cMe=class cMe extends Promise{constructor(e,t,n=sXt){super((r)=>{r(null)});this.responsePromise=t,this.parseResponse=n,rbt.set(this,void 0),ma(this,rbt,e,"f")}_thenUnwrap(e){return new cMe(Xr(this,rbt,"f"),this.responsePromise,async(t,n)=>flr(e(await this.parseResponse(t,n),n),n.response))}asResponse(){return this.responsePromise.then((e)=>e.response)}async withResponse(){let[e,t]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:t,request_id:t.headers.get("request-id")}}parse(){if(!this.parsedPromise)this.parsedPromise=this.responsePromise.then((e)=>this.parseResponse(Xr(this,rbt,"f"),e));return this.parsedPromise}then(e,t){return this.parse().then(e,t)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}};rbt=new WeakMap});
export {rbt,cMe,iXt};
