// @ts-nocheck
import {j1r,pmi} from "./m2161.ts";
import {d_n,q1r} from "./m2160.ts";
import {b} from "../runtime.ts";
class p_n{getLogger(e,t,n){var r;return(r=this._getDelegateLogger(e,t,n))!==null&&r!==void 0?r:new j1r(this,e,t,n)}_getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:d_n}_setDelegate(e){this._delegate=e}_getDelegateLogger(e,t,n){var r;return(r=this._delegate)===null||r===void 0?void 0:r.getLogger(e,t,n)}}
var mmi=b(()=>{q1r();pmi()});
export {p_n,mmi};
