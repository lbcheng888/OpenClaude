// @ts-nocheck
import {Q} from "../runtime.ts";
import {RUr} from "./m2075.ts";
var vUr=Q((LTn)=>{Object.defineProperty(LTn,"__esModule",{value:!0});LTn.ProxyTracer=void 0;var Ond=RUr(),Lnd=new Ond.NoopTracer;class dci{constructor(e,t,n,r){this._provider=e,this.name=t,this.version=n,this.options=r}startSpan(e,t,n){return this._getTracer().startSpan(e,t,n)}startActiveSpan(e,t,n,r){let o=this._getTracer();return Reflect.apply(o.startActiveSpan,o,arguments)}_getTracer(){if(this._delegate)return this._delegate;let e=this._provider.getDelegateTracer(this.name,this.version,this.options);if(!e)return Lnd;return this._delegate=e,this._delegate}}LTn.ProxyTracer=dci});
export {vUr};
