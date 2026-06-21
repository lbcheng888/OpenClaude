// @ts-nocheck
import {buildSystemPrompt,ope} from "./m236.ts";
import {tn,Hc} from "./m235.ts";
import {b} from "../runtime.ts";
function Vil(e,t){let n=Math.max(1,Math.floor(t)||1),r=t>0?buildSystemPrompt(e,n,{hard:!0,trim:!1}):e,o=[],s=0,i=-1,a=r.split(`
`);for(let l=0;l<a.length;l++){let c=a[l]??"";if(c.length===0){if(i=e.indexOf(`
`,i+1),i!==-1){let m=i;o.push(v8n({text:c,startOffset:m,isPrecededByNewline:C8n(e,m,l===0),endsWithNewline:!0}))}else{let m=e.length;o.push(v8n({text:c,startOffset:m,isPrecededByNewline:C8n(e,m,l===0),endsWithNewline:!1}))}continue}let u=e.indexOf(c,s);if(u===-1){let m=s;o.push(v8n({text:c,startOffset:m,isPrecededByNewline:C8n(e,m,l===0),endsWithNewline:!1})),s=m+c.length;continue}s=u+c.length;let d=u+c.length,p=d<e.length&&e[d]===`
`;if(p)i=d;o.push(v8n({text:c,startOffset:u,isPrecededByNewline:C8n(e,u,l===0),endsWithNewline:p}))}return Object.freeze({text:e,columns:n,lines:Object.freeze(o)})}
function b5p(e,t){let n=Yil(t,0,Math.max(0,e.lines.length-1));return e.lines[n]??{text:"",startOffset:0,isPrecededByNewline:!0,endsWithNewline:!1}}
function Kil(e,t){if(e.lines.length===0)return{line:0,column:0};let n=Yil(t,0,e.text.length);for(let s=0;s<e.lines.length;s++){let i=e.lines[s],a=e.lines[s+1];if(n>=i.startOffset&&(!a||n<a.startOffset)){let l=n-i.startOffset,c;if(i.isPrecededByNewline)c=Gil(i.text,l);else{let u=i.text.length-i.text.trimStart().length;if(l<u)c=0;else c=Gil(i.text.slice(u),l-u)}return{line:s,column:c}}}let r=e.lines.length-1,o=e.lines[r];return{line:r,column:tn(o.text)}}
function zil(e,t,n){if(e.lines.length===0)return 0;let r=b5p(e,t);if(r.text.length===0&&r.endsWithNewline)return r.startOffset;let o=r.isPrecededByNewline?0:r.text.length-r.text.trimStart().length,s=E5p(r.text.slice(o),Math.max(0,n))+o;return r.startOffset+s}
function Gil(e,t){if(t<=0)return 0;if(t>=e.length)return tn(e);return tn(e.slice(0,t))}
function E5p(e,t){if(t<=0||e.length===0)return 0;let n=0,r=0;for(let o of e){let s=tn(o);if(n+s>t)break;n+=s,r+=o.length}return r}
function C8n(e,t,n){if(n)return!0;return t>0&&e[t-1]===`
`}
function v8n(e){return Object.freeze(e)}
function Yil(e,t,n){return e<t?t:e>n?n:e}
var Jil=b(()=>{Hc();ope()});
export {Vil,b5p,Kil,zil,Gil,E5p,C8n,v8n,Yil,Jil};
