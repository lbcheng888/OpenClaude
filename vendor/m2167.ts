// @ts-nocheck
import {g2r,aTi} from "./m2166.ts";
import {GSn,h2r} from "./m2165.ts";
import {b} from "../runtime.ts";
class VSn{getLogger(e,t,n){var r;return(r=this._getDelegateLogger(e,t,n))!==null&&r!==void 0?r:new g2r(this,e,t,n)}_getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:GSn}_setDelegate(e){this._delegate=e}_getDelegateLogger(e,t,n){var r;return(r=this._delegate)===null||r===void 0?void 0:r.getLogger(e,t,n)}}
var lTi=b(()=>{h2r();aTi()});
export {VSn,lTi};
