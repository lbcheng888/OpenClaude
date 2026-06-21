// @ts-nocheck
import {ls,m0} from "./m1721.ts";
import {clientInfoEmptyError,clientInfoDecodingError,LH} from "./m1720.ts";
import {Nme,Ho,aC} from "./m1717.ts";
import {b} from "../runtime.ts";
function gJe(e,t){if(!e)throw ls(clientInfoEmptyError);try{let n=t(e);return JSON.parse(n)}catch(n){throw ls(clientInfoDecodingError)}}
function hse(e){if(!e)throw ls(clientInfoDecodingError);let t=e.split(Nme.CLIENT_INFO_SEPARATOR,2);return{uid:t[0],utid:t.length<2?Ho.EMPTY_STRING:t[1]}}
var _Je=b(()=>{m0();aC();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {gJe,hse,_Je};
