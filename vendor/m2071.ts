// @ts-nocheck
import {X} from "../runtime.ts";
import {QMr} from "./m2070.ts";
var ZMr=X((ngn)=>{Object.defineProperty(ngn,"__esModule",{value:!0});ngn.ProxyTracer=void 0;var A7u=QMr(),h7u=new A7u.NoopTracer;class hri{constructor(e,t,n,r){this._provider=e,this.name=t,this.version=n,this.options=r}startSpan(e,t,n){return this._getTracer().startSpan(e,t,n)}startActiveSpan(e,t,n,r){let o=this._getTracer();return Reflect.apply(o.startActiveSpan,o,arguments)}_getTracer(){if(this._delegate)return this._delegate;let e=this._provider.getDelegateTracer(this.name,this.version,this.options);if(!e)return h7u;return this._delegate=e,this._delegate}}ngn.ProxyTracer=hri});
export {ZMr};
