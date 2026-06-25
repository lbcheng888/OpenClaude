// @ts-nocheck
import {b5,c1e} from "./m535.ts";
import {b} from "../runtime.ts";
class N_r{constructor(e){if(typeof e!=="function")throw TypeError("executor must be a function.");let t;this.promise=new Promise(function(o){t=o});let n=this;this.promise.then((r)=>{if(!n._listeners)return;let o=n._listeners.length;while(o-- >0)n._listeners[o](r);n._listeners=null}),this.promise.then=(r)=>{let o,s=new Promise((i)=>{n.subscribe(i),o=i}).then(r);return s.cancel=function(){n.unsubscribe(o)},s},e(function(o,s,i){if(n.reason)return;n.reason=new b5(o,s,i),t(n.reason)})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}if(this._listeners)this._listeners.push(e);else this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);if(t!==-1)this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=(n)=>{e.abort(n)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new N_r(function(r){e=r}),cancel:e}}}
var Mes;
var Nes=b(()=>{c1e();Mes=N_r});
export {N_r,Mes,Nes};
