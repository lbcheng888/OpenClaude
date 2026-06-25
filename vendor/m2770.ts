// @ts-nocheck
import {b} from "../runtime.ts";
import {Sge} from "./m2769.ts";
function Wke(e,t,n){return A5i.diff(e,t,n)}
function iNd(e,t){if(t.stripTrailingCr)e=e.replace(/\r\n/g,`
`);let n=[],r=e.split(/(\n|\r\n)/);if(!r[r.length-1])r.pop();for(let o=0;o<r.length;o++){let s=r[o];if(o%2&&!t.newlineIsToken)n[n.length-1]+=s;else n.push(s)}return n}
var C5i,A5i;
var tzr=b(()=>{C5i=class C5i extends Sge{constructor(){super(...arguments);this.tokenize=iNd}equals(e,t,n){if(n.ignoreWhitespace){if(!n.newlineIsToken||!e.includes(`
`))e=e.trim();if(!n.newlineIsToken||!t.includes(`
`))t=t.trim()}else if(n.ignoreNewlineAtEof&&!n.newlineIsToken){if(e.endsWith(`
`))e=e.slice(0,-1);if(t.endsWith(`
`))t=t.slice(0,-1)}return super.equals(e,t,n)}};A5i=new C5i});
export {Wke,iNd,C5i,A5i,tzr};
