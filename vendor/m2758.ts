// @ts-nocheck
import {b} from "../runtime.ts";
import {ahe} from "./m2757.ts";
function rxe(e,t,n){return P2i.diff(e,t,n)}
function Txd(e,t){if(t.stripTrailingCr)e=e.replace(/\r\n/g,`
`);let n=[],r=e.split(/(\n|\r\n)/);if(!r[r.length-1])r.pop();for(let o=0;o<r.length;o++){let s=r[o];if(o%2&&!t.newlineIsToken)n[n.length-1]+=s;else n.push(s)}return n}
var D2i,P2i;
var b5r=b(()=>{D2i=class D2i extends ahe{constructor(){super(...arguments);this.tokenize=Txd}equals(e,t,n){if(n.ignoreWhitespace){if(!n.newlineIsToken||!e.includes(`
`))e=e.trim();if(!n.newlineIsToken||!t.includes(`
`))t=t.trim()}else if(n.ignoreNewlineAtEof&&!n.newlineIsToken){if(e.endsWith(`
`))e=e.slice(0,-1);if(t.endsWith(`
`))t=t.slice(0,-1)}return super.equals(e,t,n)}};P2i=new D2i});
export {rxe,Txd,D2i,P2i,b5r};
