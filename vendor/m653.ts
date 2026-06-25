// @ts-nocheck
import {Q} from "../runtime.ts";
import {ios} from "./m651.ts";
import {dos} from "./m652.ts";
var mos=Q((Z0f,pos)=>{var Q0f=require("fs"),Qrn;if(global.TESTING_WINDOWS)Qrn=ios();else Qrn=dos();pos.exports=Uyr;Uyr.sync=isu;function Uyr(e,t,n){if(typeof t==="function")n=t,t={};if(!n){if(typeof Promise!=="function")throw TypeError("callback not provided");return new Promise(function(r,o){Uyr(e,t||{},function(s,i){if(s)o(s);else r(i)})})}Qrn(e,t||{},function(r,o){if(r){if(r.code==="EACCES"||t&&t.ignoreErrors)r=null,o=!1}n(r,o)})}function isu(e,t){try{return Qrn.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;else throw n}}});
export {mos};
