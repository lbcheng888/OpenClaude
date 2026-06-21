// @ts-nocheck
import {X} from "../runtime.ts";
import {aA} from "./m3509.ts";
var OBt=X((Feo)=>{Object.defineProperty(Feo,"__esModule",{value:!0});Feo.restrictControlPlaneStatusCode=Qep;var kle=aA(),Xep=[kle.Status.OK,kle.Status.INVALID_ARGUMENT,kle.Status.NOT_FOUND,kle.Status.ALREADY_EXISTS,kle.Status.FAILED_PRECONDITION,kle.Status.ABORTED,kle.Status.OUT_OF_RANGE,kle.Status.DATA_LOSS];function Qep(e,t){if(Xep.includes(e))return{code:kle.Status.INTERNAL,details:`Invalid status from control plane: ${e} ${kle.Status[e]} ${t}`};else return{code:e,details:t}}});
export {OBt};
