// @ts-nocheck
import {Q} from "../runtime.ts";
import {yf} from "./m3525.ts";
var u2t=Q((bso)=>{Object.defineProperty(bso,"__esModule",{value:!0});bso.restrictControlPlaneStatusCode=Udp;var kle=yf(),Bdp=[kle.Status.OK,kle.Status.INVALID_ARGUMENT,kle.Status.NOT_FOUND,kle.Status.ALREADY_EXISTS,kle.Status.FAILED_PRECONDITION,kle.Status.ABORTED,kle.Status.OUT_OF_RANGE,kle.Status.DATA_LOSS];function Udp(e,t){if(Bdp.includes(e))return{code:kle.Status.INTERNAL,details:`Invalid status from control plane: ${e} ${kle.Status[e]} ${t}`};else return{code:e,details:t}}});
export {u2t};
