// @ts-nocheck
import {Co,dC} from "./m1722.ts";
import {jo,x0} from "./m1726.ts";
import {noCryptoObject,invalidState,uI} from "./m1725.ts";
import {b} from "../runtime.ts";
class hgn{static setRequestState(e,t,n){let r=hgn.generateLibraryState(e,n);return t?`${r}${Co.RESOURCE_DELIM}${t}`:r}static generateLibraryState(e,t){if(!e)throw jo(noCryptoObject);let n={id:e.createNewGuid()};if(t)n.meta=t;let r=JSON.stringify(n);return e.base64Encode(r)}static parseRequestState(e,t){if(!e)throw jo(noCryptoObject);if(!t)throw jo(invalidState);try{let n=t.split(Co.RESOURCE_DELIM),r=n[0],o=n.length>1?n.slice(1).join(Co.RESOURCE_DELIM):Co.EMPTY_STRING,s=e.base64Decode(r),i=JSON.parse(s);return{userRequestState:o||Co.EMPTY_STRING,libraryState:i}}catch(n){throw jo(invalidState)}}}
var QXs=b(()=>{dC();x0();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {hgn,QXs};
