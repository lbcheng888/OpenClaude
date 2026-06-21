// @ts-nocheck
import {Ho,aC} from "./m1717.ts";
import {ls,m0} from "./m1721.ts";
import {noCryptoObject,invalidState,LH} from "./m1720.ts";
import {b} from "../runtime.ts";
class Pmn{static setRequestState(e,t,n){let r=Pmn.generateLibraryState(e,n);return t?`${r}${Ho.RESOURCE_DELIM}${t}`:r}static generateLibraryState(e,t){if(!e)throw ls(noCryptoObject);let n={id:e.createNewGuid()};if(t)n.meta=t;let r=JSON.stringify(n);return e.base64Encode(r)}static parseRequestState(e,t){if(!e)throw ls(noCryptoObject);if(!t)throw ls(invalidState);try{let n=t.split(Ho.RESOURCE_DELIM),r=n[0],o=n.length>1?n.slice(1).join(Ho.RESOURCE_DELIM):Ho.EMPTY_STRING,s=e.base64Decode(r),i=JSON.parse(s);return{userRequestState:o||Ho.EMPTY_STRING,libraryState:i}}catch(n){throw ls(invalidState)}}}
var r7s=b(()=>{aC();m0();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Pmn,r7s};
