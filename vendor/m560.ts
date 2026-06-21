// @ts-nocheck
import {s8,sbt,hMe} from "./m529.ts";
import {SR,soe} from "./m527.ts";
import {obt,hKo} from "./m528.ts";
import {Ten,imr} from "./m559.ts";
import {VVe,oen} from "./m525.ts";
import {b} from "../runtime.ts";
function amr(e){if(e.cancelToken)e.cancelToken.throwIfRequested();if(e.signal&&e.signal.aborted)throw new s8(null,e)}
function Sen(e){if(amr(e),e.headers=SR.from(e.headers),e.data=obt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1)e.headers.setContentType("application/x-www-form-urlencoded",!1);return Ten.getAdapter(e.adapter||VVe.adapter,e)(e).then(function(r){return amr(e),r.data=obt.call(e,e.transformResponse,r),r.headers=SR.from(r.headers),r},function(r){if(!sbt(r)){if(amr(e),r&&r.response)r.response.data=obt.call(e,e.transformResponse,r.response),r.response.headers=SR.from(r.response.headers)}return Promise.reject(r)})}
var Lzo=b(()=>{hKo();oen();hMe();soe();imr()});
export {amr,Sen,Lzo};
