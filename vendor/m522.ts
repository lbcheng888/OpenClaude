// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {JQo,XQo} from "./m521.ts";
import {b} from "../runtime.ts";
function UWc(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}
function l1e(e,t,n){if(!t)return e;let r=n&&n.encode||UWc,o=rr.isFunction(n)?{serialize:n}:n,s=o&&o.serialize,i;if(s)i=s(t,o);else i=rr.isURLSearchParams(t)?t.toString():new JQo(t,o).toString(r);if(i){let a=e.indexOf("#");if(a!==-1)e=e.slice(0,a);e+=(e.indexOf("?")===-1?"?":"&")+i}return e}
var Nnn=b(()=>{oC();XQo()});
export {UWc,l1e,Nnn};
