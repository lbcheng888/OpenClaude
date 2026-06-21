// @ts-nocheck
import {Hh,GS} from "./m1631.ts";
import {bNe,e5s,ise} from "./m1624.ts";
import {b} from "../runtime.ts";
import {C5s} from "./m1633.ts";
function p0(e,t){if(!t.match(/^[0-9a-zA-Z-.]+$/)){let n=Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");throw e.info(Hh("",n)),n}}
function QYe(e,t,n){if(t)return p0(e,t),t;if(!n)n=bNe;if(n!==bNe)return"common";return"organizations"}
function kw(e){if(!e||e.length===0)return[];if(e.includes("*"))return e5s;return e}
var XD=b(()=>{ise();GS();C5s()});
export {p0,QYe,kw,XD};
