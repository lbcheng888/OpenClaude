// @ts-nocheck
import {config} from "./m253.ts";
import {b} from "../runtime.ts";
import {isLocalAgentTask} from "./m305.ts";
function uEc(e){config({customError:e})}
function dEc(){return config().customError}
var Mlr;
var d6o=b(()=>{isLocalAgentTask();Mlr={invalid_type:"invalid_type",too_big:"too_big",too_small:"too_small",invalid_format:"invalid_format",not_multiple_of:"not_multiple_of",unrecognized_keys:"unrecognized_keys",invalid_union:"invalid_union",invalid_key:"invalid_key",invalid_element:"invalid_element",invalid_value:"invalid_value",custom:"custom"}});
export {uEc,dEc,Mlr,d6o};
