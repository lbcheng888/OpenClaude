// @ts-nocheck
import {SFe} from "./m1644.ts";
import {b} from "../runtime.ts";
import {yhn} from "./m1673.ts";
function oQe(e){if(SFe(e))return e.message;else{let t;try{if(typeof e==="object"&&e)t=JSON.stringify(e);else t=String(e)}catch(n){t="[unable to stringify input]"}return`Unknown error ${t}`}}
var FYs=b(()=>{yhn()});
export {oQe,FYs};
