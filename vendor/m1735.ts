// @ts-nocheck
import {jo,x0} from "./m1726.ts";
import {clientInfoEmptyError,clientInfoDecodingError,uI} from "./m1725.ts";
import {Kme,Co,dC} from "./m1722.ts";
import {b} from "../runtime.ts";
function hQe(e,t){if(!e)throw jo(clientInfoEmptyError);try{let n=t(e);return JSON.parse(n)}catch(n){throw jo(clientInfoDecodingError)}}
function hse(e){if(!e)throw jo(clientInfoDecodingError);let t=e.split(Kme.CLIENT_INFO_SEPARATOR,2);return{uid:t[0],utid:t.length<2?Co.EMPTY_STRING:t[1]}}
var gQe=b(()=>{x0();dC();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {hQe,hse,gQe};
