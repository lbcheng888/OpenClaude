// @ts-nocheck
import {b5,xAt,c1e} from "./m535.ts";
import {Iv,roe} from "./m533.ts";
import {IAt,mZo} from "./m534.ts";
import {trn,L_r} from "./m565.ts";
import {Gze,Bnn} from "./m531.ts";
import {b} from "../runtime.ts";
function M_r(e){if(e.cancelToken)e.cancelToken.throwIfRequested();if(e.signal&&e.signal.aborted)throw new b5(null,e)}
function nrn(e){if(M_r(e),e.headers=Iv.from(e.headers),e.data=IAt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1)e.headers.setContentType("application/x-www-form-urlencoded",!1);return trn.getAdapter(e.adapter||Gze.adapter,e)(e).then(function(r){return M_r(e),r.data=IAt.call(e,e.transformResponse,r),r.headers=Iv.from(r.headers),r},function(r){if(!xAt(r)){if(M_r(e),r&&r.response)r.response.data=IAt.call(e,e.transformResponse,r.response),r.response.headers=Iv.from(r.response.headers)}return Promise.reject(r)})}
var Des=b(()=>{mZo();Bnn();c1e();roe();L_r()});
export {M_r,nrn,Des};
