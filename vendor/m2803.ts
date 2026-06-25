// @ts-nocheck
import {b} from "../runtime.ts";
function tjr(e){}
function mWi(e){if(typeof e=="function")throw TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");let{onEvent:t=tjr,onError:n=tjr,onRetry:r=tjr,onComment:o}=e,s="",i=!0,a,l="",c="";function u(h){let g=i?h.replace(/^\xEF\xBB\xBF/,""):h,[_,T]=PFd(`${s}${g}`);for(let y of _)d(y);s=T,i=!1}function d(h){if(h===""){m();return}if(h.startsWith(":")){o&&o(h.slice(h.startsWith(": ")?2:1));return}let g=h.indexOf(":");if(g!==-1){let _=h.slice(0,g),T=h[g+1]===" "?2:1,y=h.slice(g+T);p(_,y,h);return}p(h,"",h)}function p(h,g,_){switch(h){case"event":c=g;break;case"data":l=`${l}${g}
`;break;case"id":a=g.includes("\x00")?void 0:g;break;case"retry":/^\d+$/.test(g)?r(parseInt(g,10)):n(new njr(`Invalid \`retry\` value: "${g}"`,{type:"invalid-retry",value:g,line:_}));break;default:n(new njr(`Unknown field "${h.length>20?`${h.slice(0,20)}\u2026`:h}"`,{type:"unknown-field",field:h,value:g,line:_}));break}}function m(){l.length>0&&t({id:a,event:c||void 0,data:l.endsWith(`
`)?l.slice(0,-1):l}),a=void 0,l="",c=""}function f(h={}){s&&h.consume&&d(s),i=!0,a=void 0,l="",c="",s=""}return{feed:u,reset:f}}
function PFd(e){let t=[],n="",r=0;for(;r<e.length;){let o=e.indexOf("\r",r),s=e.indexOf(`
`,r),i=-1;if(o!==-1&&s!==-1?i=Math.min(o,s):o!==-1?i=o:s!==-1&&(i=s),i===-1){n=e.slice(r);break}else{let a=e.slice(r,i);t.push(a),r=i+1,e[r-1]==="\r"&&e[r]===`
`&&r++}}return[t,n]}
var njr;
var fWi=b(()=>{njr=class njr extends Error{constructor(e,t){super(e),this.name="ParseError",this.type=t.type,this.field=t.field,this.value=t.value,this.line=t.line}}});
export {tjr,mWi,PFd,njr,fWi};
