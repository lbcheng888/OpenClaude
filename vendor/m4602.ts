// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Tul(e){let t=_ul.homedir(),n=Pt(),r=e.startsWith(t)?"~"+e.slice(t.length):null,o=e.startsWith(n)?"./"+yul.relative(n,e):null;if(r&&o)return r.length<=o.length?r:o;return r||o||e}
var hKp,_ul,yul,gKp;
var Sul=b(()=>{ze();Go();hKp=M(rt(),1),_ul=require("os"),yul=require("path"),gKp=M(Te(),1)});
export {Tul,hKp,_ul,yul,gKp,Sul};
