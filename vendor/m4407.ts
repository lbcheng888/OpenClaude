// @ts-nocheck
import {b} from "../runtime.ts";
var RU;
var C6n=b(()=>{RU=class RU extends Error{originalModel;fallbackModel;reason;originalError;constructor(e,t,n="overloaded",r){super(`Model fallback triggered: ${e} -> ${t}`);this.originalModel=e;this.fallbackModel=t;this.reason=n;this.originalError=r;this.name="FallbackTriggeredError"}}});
export {RU,C6n};
