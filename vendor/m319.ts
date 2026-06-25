// @ts-nocheck
import {config} from "./m255.ts";
import {b} from "../runtime.ts";
import {NP} from "./m307.ts";
function fDc(e){config({customError:e})}
function hDc(){return config().customError}
var cmr;
var iKo=b(()=>{NP();cmr={invalid_type:"invalid_type",too_big:"too_big",too_small:"too_small",invalid_format:"invalid_format",not_multiple_of:"not_multiple_of",unrecognized_keys:"unrecognized_keys",invalid_union:"invalid_union",invalid_key:"invalid_key",invalid_element:"invalid_element",invalid_value:"invalid_value",custom:"custom"}});
export {fDc,hDc,cmr,iKo};
