// @ts-nocheck
import {X} from "../runtime.ts";
import {cQo} from "./m645.ts";
import {fQo} from "./m646.ts";
var hQo=X((Dyf,AQo)=>{var Iyf=require("fs"),gtn;if(global.TESTING_WINDOWS)gtn=cQo();else gtn=fQo();AQo.exports=dfr;dfr.sync=jzc;function dfr(e,t,n){if(typeof t==="function")n=t,t={};if(!n){if(typeof Promise!=="function")throw TypeError("callback not provided");return new Promise(function(r,o){dfr(e,t||{},function(s,i){if(s)o(s);else r(i)})})}gtn(e,t||{},function(r,o){if(r){if(r.code==="EACCES"||t&&t.ignoreErrors)r=null,o=!1}n(r,o)})}function jzc(e,t){try{return gtn.sync(e,t||{})}catch(n){if(t&&t.ignoreErrors||n.code==="EACCES")return!1;else throw n}}});
export {hQo};
