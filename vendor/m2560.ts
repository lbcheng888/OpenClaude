// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Y8(e){if(typeof e==="string")return e;if(typeof e==="number")return String(e);if(!e)return"";if(Array.isArray(e))return e.map(Y8).join("");if(MMi.isValidElement(e))return Y8(e.props.children);return""}
var MMi;
var gvn=b(()=>{MMi=x(et(),1)});
export {Y8,MMi,gvn};
