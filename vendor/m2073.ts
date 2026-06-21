// @ts-nocheck
import {X} from "../runtime.ts";
import {ZMr} from "./m2071.ts";
import {_ri} from "./m2072.ts";
var e1r=X((ogn)=>{Object.defineProperty(ogn,"__esModule",{value:!0});ogn.ProxyTracerProvider=void 0;var _7u=ZMr(),y7u=_ri(),T7u=new y7u.NoopTracerProvider;class yri{getTracer(e,t,n){var r;return(r=this.getDelegateTracer(e,t,n))!==null&&r!==void 0?r:new _7u.ProxyTracer(this,e,t,n)}getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:T7u}setDelegate(e){this._delegate=e}getDelegateTracer(e,t,n){var r;return(r=this._delegate)===null||r===void 0?void 0:r.getTracer(e,t,n)}}ogn.ProxyTracerProvider=yri});
export {e1r};
