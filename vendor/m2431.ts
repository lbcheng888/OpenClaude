// @ts-nocheck
import {wve,N8} from "../src/config/2299_level.ts";
import {sz,hve} from "./m2271.ts";
import {b} from "../runtime.ts";
function color(e,t,n="foreground"){return(r)=>{if(!e)return r;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return wve(r,e,n);return wve(r,sz(t)[e],n)}}
var Kve=b(()=>{N8();hve()});
export {color,Kve};
