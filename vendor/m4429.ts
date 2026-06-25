// @ts-nocheck
import {b} from "../runtime.ts";
var rN;
var WWn=b(()=>{rN=class rN extends Error{originalModel;fallbackModel;reason;originalError;constructor(e,t,n="overloaded",r){super(`Model fallback triggered: ${e} -> ${t}`);this.originalModel=e;this.fallbackModel=t;this.reason=n;this.originalError=r;this.name="FallbackTriggeredError"}}});
export {rN,WWn};
