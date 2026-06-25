// @ts-nocheck
import {wQ,ahn} from "./m1648.ts";
import {ase,_Ht} from "./m1645.ts";
import {b} from "../runtime.ts";
function dOr(e={}){var t;let n=(t=e.logger)!==null&&t!==void 0?t:wQ.info,r=new ase({additionalAllowedHeaderNames:e.additionalAllowedHeaderNames,additionalAllowedQueryParameters:e.additionalAllowedQueryParameters});return{name:uOr,async sendRequest(o,s){if(!n.enabled)return s(o);n(`Request: ${r.sanitize(o)}`);let i=await s(o);return n(`Response status code: ${i.status}`),n(`Headers: ${r.sanitize(i.headers)}`),i}}}
var uOr="logPolicy";
var Zjs=b(()=>{ahn();_Ht()});
export {dOr,uOr,Zjs};
