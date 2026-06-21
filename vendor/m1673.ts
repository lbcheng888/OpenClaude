// @ts-nocheck
import {CNe} from "./m1639.ts";
import {b} from "../runtime.ts";
import {Mpn} from "./m1668.ts";
function iJe(e){if(CNe(e))return e.message;else{let t;try{if(typeof e==="object"&&e)t=JSON.stringify(e);else t=String(e)}catch(n){t="[unable to stringify input]"}return`Unknown error ${t}`}}
var jWs=b(()=>{Mpn()});
export {iJe,jWs};
