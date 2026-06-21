// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {Z7o,eKo} from "./m515.ts";
import {b} from "../runtime.ts";
function PUc(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}
function AMe(e,t,n){if(!t)return e;let r=n&&n.encode||PUc,o=er.isFunction(n)?{serialize:n}:n,s=o&&o.serialize,i;if(s)i=s(t,o);else i=er.isURLSearchParams(t)?t.toString():new Z7o(t,o).toString(r);if(i){let a=e.indexOf("#");if(a!==-1)e=e.slice(0,a);e+=(e.indexOf("?")===-1?"?":"&")+i}return e}
var nen=b(()=>{ZE();eKo()});
export {PUc,AMe,nen};
