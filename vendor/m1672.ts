// @ts-nocheck
import {_hn,yOr,IYs} from "./m1671.ts";
import {b} from "../runtime.ts";
function DYs(e={}){let t=_hn(e.userAgentPrefix);return{name:N6u,async sendRequest(n,r){if(!n.headers.has(xYs))n.headers.set(xYs,await t);return r(n)}}}
var xYs,N6u="userAgentPolicy";
var PYs=b(()=>{yOr();xYs=IYs()});
export {DYs,xYs,N6u,PYs};
