// @ts-nocheck
import {b} from "../runtime.ts";
class S1r{constructor(e,t,n){this.minExponentialBackoff=e,this.maxExponentialBackoff=t,this.exponentialDeltaBackoff=n}calculateDelay(e){if(e===0)return this.minExponentialBackoff;return Math.min(Math.pow(2,e-1)*this.exponentialDeltaBackoff,this.maxExponentialBackoff)}}
var Kni=b(()=>{/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {S1r,Kni};
