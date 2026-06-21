// @ts-nocheck
import {F3,_A} from "./m459.ts";
import {b} from "../runtime.ts";
import {u8,CR} from "./m637.ts";
import {pia,DYr} from "./m3268.ts";
async function Djd(e){if(!e||e.includes("/")||e.includes("\\"))return null;if(e.includes(".."))return null;if(e.startsWith("-")&&e!=="-")return null;if(F3()&&_A())return null;try{let t=await import(`@withfig/autocomplete/build/${e}.js`);return t.default||t}catch{return null}}
var Tke;
var PYr=b(()=>{u8();pia();Tke=CR(async(e)=>DYr.find((n)=>n.name===e)||await Djd(e)||null,(e)=>e)});
export {Djd,Tke,PYr};
