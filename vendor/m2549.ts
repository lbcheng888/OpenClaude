// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function L5(e){if(typeof e==="string")return e;if(typeof e==="number")return String(e);if(!e)return"";if(Array.isArray(e))return e.map(L5).join("");if(dIi.default.isValidElement(e))return L5(e.props.children);return""}
var dIi;
var kEn=b(()=>{dIi=M(Te(),1)});
export {L5,dIi,kEn};
