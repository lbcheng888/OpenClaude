// @ts-nocheck
import {Q} from "../runtime.ts";
import {vUr} from "./m2076.ts";
import {mci} from "./m2077.ts";
var wUr=Q((NTn)=>{Object.defineProperty(NTn,"__esModule",{value:!0});NTn.ProxyTracerProvider=void 0;var Nnd=vUr(),Fnd=mci(),Bnd=new Fnd.NoopTracerProvider;class fci{getTracer(e,t,n){var r;return(r=this.getDelegateTracer(e,t,n))!==null&&r!==void 0?r:new Nnd.ProxyTracer(this,e,t,n)}getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:Bnd}setDelegate(e){this._delegate=e}getDelegateTracer(e,t,n){var r;return(r=this._delegate)===null||r===void 0?void 0:r.getTracer(e,t,n)}}NTn.ProxyTracerProvider=fci});
export {wUr};
