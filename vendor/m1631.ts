// @ts-nocheck
import {b} from "../runtime.ts";
import {ENe,pCe} from "./m1630.ts";
function Spn(e){return e.reduce((t,n)=>{if(process.env[n])t.assigned.push(n);else t.missing.push(n);return t},{missing:[],assigned:[]})}
function d0(e){return`SUCCESS. Scopes: ${Array.isArray(e)?e.join(", "):e}.`}
function Hh(e,t){let n="ERROR.";if(e===null||e===void 0?void 0:e.length)n+=` Scopes: ${Array.isArray(e)?e.join(", "):e}.`;return`${n} Error message: ${typeof t==="string"?t:t.message}.`}
function b5s(e,t,n=logger){let r=t?`${t.fullTitle} ${e}`:e;function o(l){n.info(`${r} =>`,l)}function s(l){n.warning(`${r} =>`,l)}function i(l){n.verbose(`${r} =>`,l)}function a(l){n.error(`${r} =>`,l)}return{title:e,fullTitle:r,info:o,warning:s,verbose:i,error:a}}
function hm(e,t=logger){let n=b5s(e,void 0,t);return Object.assign(Object.assign({},n),{parent:t,getToken:b5s("=> getToken()",n,t)})}
var logger;
var GS=b(()=>{ENe();logger=pCe("identity")});
export {Spn,d0,Hh,b5s,hm,logger,GS};
