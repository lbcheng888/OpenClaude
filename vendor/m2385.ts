// @ts-nocheck
import {X} from "../runtime.ts";
var mCi=X((fsh,pCi)=>{var Nid=/[|\\{}()[\]^$+*?.-]/g;pCi.exports=(e)=>{if(typeof e!=="string")throw TypeError("Expected a string");return e.replace(Nid,"\\$&")}});
export {mCi};
