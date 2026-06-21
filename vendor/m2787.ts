// @ts-nocheck
import {b} from "../runtime.ts";
function iWr(e){}
function p9i(e){if(typeof e=="function")throw TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");let{onEvent:t=iWr,onError:n=iWr,onRetry:r=iWr,onComment:o}=e,s="",i=!0,a,l="",c="";function u(A){let h=i?A.replace(/^\xEF\xBB\xBF/,""):A,[g,_]=jkd(`${s}${h}`);for(let y of g)d(y);s=_,i=!1}function d(A){if(A===""){m();return}if(A.startsWith(":")){o&&o(A.slice(A.startsWith(": ")?2:1));return}let h=A.indexOf(":");if(h!==-1){let g=A.slice(0,h),_=A[h+1]===" "?2:1,y=A.slice(h+_);p(g,y,A);return}p(A,"",A)}function p(A,h,g){switch(A){case"event":c=h;break;case"data":l=`${l}${h}
`;break;case"id":a=h.includes("\x00")?void 0:h;break;case"retry":/^\d+$/.test(h)?r(parseInt(h,10)):n(new aWr(`Invalid \`retry\` value: "${h}"`,{type:"invalid-retry",value:h,line:g}));break;default:n(new aWr(`Unknown field "${A.length>20?`${A.slice(0,20)}\u2026`:A}"`,{type:"unknown-field",field:A,value:h,line:g}));break}}function m(){l.length>0&&t({id:a,event:c||void 0,data:l.endsWith(`
`)?l.slice(0,-1):l}),a=void 0,l="",c=""}function f(A={}){s&&A.consume&&d(s),i=!0,a=void 0,l="",c="",s=""}return{feed:u,reset:f}}
function jkd(e){let t=[],n="",r=0;for(;r<e.length;){let o=e.indexOf("\r",r),s=e.indexOf(`
`,r),i=-1;if(o!==-1&&s!==-1?i=Math.min(o,s):o!==-1?i=o:s!==-1&&(i=s),i===-1){n=e.slice(r);break}else{let a=e.slice(r,i);t.push(a),r=i+1,e[r-1]==="\r"&&e[r]===`
`&&r++}}return[t,n]}
var aWr;
var m9i=b(()=>{aWr=class aWr extends Error{constructor(e,t){super(e),this.name="ParseError",this.type=t.type,this.field=t.field,this.value=t.value,this.line=t.line}}});
export {iWr,p9i,jkd,aWr,m9i};
