// @ts-nocheck
import {DN,ppe} from "./m238.ts";
import {sn,mc} from "./m237.ts";
import {b} from "../runtime.ts";
function Mml(e,t){let n=Math.max(1,Math.floor(t)||1),r=t>0?DN(e,n,{hard:!0,trim:!1}):e,o=[],s=0,i=-1,a=r.split(`
`);for(let l=0;l<a.length;l++){let c=a[l]??"";if(c.length===0){if(i=e.indexOf(`
`,i+1),i!==-1){let m=i;o.push(WVn({text:c,startOffset:m,isPrecededByNewline:qVn(e,m,l===0),endsWithNewline:!0}))}else{let m=e.length;o.push(WVn({text:c,startOffset:m,isPrecededByNewline:qVn(e,m,l===0),endsWithNewline:!1}))}continue}let u=e.indexOf(c,s);if(u===-1){let m=s;o.push(WVn({text:c,startOffset:m,isPrecededByNewline:qVn(e,m,l===0),endsWithNewline:!1})),s=m+c.length;continue}s=u+c.length;let d=u+c.length,p=d<e.length&&e[d]===`
`;if(p)i=d;o.push(WVn({text:c,startOffset:u,isPrecededByNewline:qVn(e,u,l===0),endsWithNewline:p}))}return Object.freeze({text:e,columns:n,lines:Object.freeze(o)})}
function rXp(e,t){let n=Bml(t,0,Math.max(0,e.lines.length-1));return e.lines[n]??{text:"",startOffset:0,isPrecededByNewline:!0,endsWithNewline:!1}}
function Nml(e,t){if(e.lines.length===0)return{line:0,column:0};let n=Bml(t,0,e.text.length);for(let s=0;s<e.lines.length;s++){let i=e.lines[s],a=e.lines[s+1];if(n>=i.startOffset&&(!a||n<a.startOffset)){let l=n-i.startOffset,c;if(i.isPrecededByNewline)c=Lml(i.text,l);else{let u=i.text.length-i.text.trimStart().length;if(l<u)c=0;else c=Lml(i.text.slice(u),l-u)}return{line:s,column:c}}}let r=e.lines.length-1,o=e.lines[r];return{line:r,column:sn(o.text)}}
function Fml(e,t,n){if(e.lines.length===0)return 0;let r=rXp(e,t);if(r.text.length===0&&r.endsWithNewline)return r.startOffset;let o=r.isPrecededByNewline?0:r.text.length-r.text.trimStart().length,s=oXp(r.text.slice(o),Math.max(0,n))+o;return r.startOffset+s}
function Lml(e,t){if(t<=0)return 0;if(t>=e.length)return sn(e);return sn(e.slice(0,t))}
function oXp(e,t){if(t<=0||e.length===0)return 0;let n=0,r=0;for(let o of e){let s=sn(o);if(n+s>t)break;n+=s,r+=o.length}return r}
function qVn(e,t,n){if(n)return!0;return t>0&&e[t-1]===`
`}
function WVn(e){return Object.freeze(e)}
function Bml(e,t,n){return e<t?t:e>n?n:e}
var Uml=b(()=>{mc();ppe()});
export {Mml,rXp,Nml,Fml,Lml,oXp,qVn,WVn,Bml,Uml};
