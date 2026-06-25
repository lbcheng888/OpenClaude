// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function i2e(e,t){let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y),o=Math.max(e.x+e.width,t.x+t.width),s=Math.max(e.y+e.height,t.y+t.height);return{x:n,y:r,width:o-n,height:s-r}}
function oy(e,t,n){if(t!==void 0&&e<t)return t;if(n!==void 0&&e>n)return n;return e}
var B8=()=>{};
function aw(e,t){if(e===void 0)return;if(Number.isInteger(e))return;logForDebugging(`${t} should be an integer, got ${e}`,{level:"warn"})}
var rqr=b(()=>{qe()});
export {i2e,oy,B8,aw,rqr};
