// @ts-nocheck
import {$ve,E5} from "../src/config/2288_level.ts";
import {kK,Ive} from "./m2262.ts";
import {b} from "../runtime.ts";
function No(e,t,n="foreground"){return(r)=>{if(!e)return r;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return $ve(r,e,n);return $ve(r,kK(t)[e],n)}}
var lwe=b(()=>{E5();Ive()});
export {No,lwe};
