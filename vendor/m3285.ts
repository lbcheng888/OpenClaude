// @ts-nocheck
import {r3,Rf} from "./m465.ts";
import {b} from "../runtime.ts";
import {v5,Lv} from "./m643.ts";
import {yma,heo} from "./m3284.ts";
async function TXd(e){if(!e||e.includes("/")||e.includes("\\"))return null;if(e.includes(".."))return null;if(e.startsWith("-")&&e!=="-")return null;if(r3()&&Rf())return null;try{let t=await import(`@withfig/autocomplete/build/${e}.js`);return t.default||t}catch{return null}}
var aIe;
var geo=b(()=>{v5();yma();aIe=Lv(async(e)=>heo.find((n)=>n.name===e)||await TXd(e)||null,(e)=>e)});
export {TXd,aIe,geo};
