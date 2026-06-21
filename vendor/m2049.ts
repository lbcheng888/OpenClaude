// @ts-nocheck
import {X} from "../runtime.ts";
import {kMr} from "./m2048.ts";
var Jni=X((IXe)=>{Object.defineProperty(IXe,"__esModule",{value:!0});IXe.isCompatible=IXe._makeCompatibilityCheck=void 0;var wVu=kMr(),zni=/^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;function Yni(e){let t=new Set([e]),n=new Set,r=e.match(zni);if(!r)return()=>!1;let o={major:+r[1],minor:+r[2],patch:+r[3],prerelease:r[4]};if(o.prerelease!=null)return function(l){return l===e};function s(a){return n.add(a),!1}function i(a){return t.add(a),!0}return function(l){if(t.has(l))return!0;if(n.has(l))return!1;let c=l.match(zni);if(!c)return s(l);let u={major:+c[1],minor:+c[2],patch:+c[3],prerelease:c[4]};if(u.prerelease!=null)return s(l);if(o.major!==u.major)return s(l);if(o.major===0){if(o.minor===u.minor&&o.patch<=u.patch)return i(l);return s(l)}if(o.minor<=u.minor)return i(l);return s(l)}}IXe._makeCompatibilityCheck=Yni;IXe.isCompatible=Yni(wVu.VERSION)});
export {Jni};
