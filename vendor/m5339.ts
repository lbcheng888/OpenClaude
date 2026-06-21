// @ts-nocheck
import {n5e,YPo,yJn,u6l,JPo} from "./m5338.ts";
import {zl,DUe} from "./m2521.ts";
import {Uu,dr} from "./m231.ts";
import {jV,yyt,xLe,KT,KI} from "./m234.ts";
import {b} from "../runtime.ts";
function r5e(e,t,n,r){let o=n5e(t,r.cursor,n);if(o.equals(r.cursor)&&!YPo(t))return;let s=QPo(r.cursor,o,t,e,n);if(s.from===s.to){if(e==="change"||e==="yank")r.setRegister("",!1);if(e==="change")r.enterInsert(s.from);return}VAt(e,s.from,s.to,r,s.linewise),r.recordChange({type:"operator",op:e,motion:t,count:n})}
function TJn(e,t,n,r,o){let s=o.cursor.findCharacter(n,t,r);if(s===null)return;let i=new zl(o.cursor.measuredText,s),a=WHm(o.cursor,i,t);VAt(e,a.from,a.to,o),o.setLastFind(t,n),o.recordChange({type:"operatorFind",op:e,find:t,char:n,count:r})}
function SJn(e,t,n,r,o){let s=yJn(o.text,o.cursor.offset,n,t==="inner");if(!s)return;VAt(e,s.start,s.end,o),o.recordChange({type:"operatorTextObj",op:e,objType:n,scope:t,count:r})}
function XPo(e,t,n){let r=n.text,o=r.split(`
`),s=Uu(r.slice(0,n.cursor.offset),`
`),i=Math.min(t,o.length-s),a=n.cursor.startOfLogicalLine().offset,l=a;for(let u=0;u<i;u++){let d=r.indexOf(`
`,l);l=d===-1?r.length:d+1}let c=r.slice(a,l);if(!c.endsWith(`
`))c=c+`
`;if(n.setRegister(c,!0),e==="yank")n.setOffset(a);else if(e==="delete"){let u=a,d=l;if(d===r.length&&u>0&&r[u-1]===`
`)u-=1;let p=r.slice(0,u)+r.slice(d);n.setText(p||"");let m=Math.max(0,p.length-(jV(p).length||1));n.setOffset(Math.min(u,m))}else if(e==="change")if(o.length===1)n.setText(""),n.enterInsert(0);else{let u=o.slice(0,s),d=o.slice(s+i),p=[...u,"",...d].join(`
`);n.setText(p),n.enterInsert(a)}n.recordChange({type:"operator",op:e,motion:e[0],count:t})}
function bJn(e,t){let n=t.cursor.offset;if(n>=t.text.length)return;let r=t.cursor;for(let a=0;a<e&&!r.isAtEnd();a++)r=r.right();let o=r.offset,s=t.text.slice(n,o),i=t.text.slice(0,n)+t.text.slice(o);t.setRegister(s,!1),t.setText(i),t.setOffset(ZPo(i,n)),t.recordChange({type:"x",count:e})}
function EJn(e,t,n){let r=n.cursor.offset,o=n.text;for(let s=0;s<t&&r<o.length;s++){let i=yyt(o.slice(r)).length||1;o=o.slice(0,r)+e+o.slice(r+i),r+=e.length}n.setText(o),n.setOffset(Math.max(0,r-e.length)),n.recordChange({type:"replace",char:e,count:t})}
function CJn(e,t){let n=t.cursor.offset;if(n>=t.text.length)return;let r=t.text,o=n,s=0;while(o<r.length&&s<e){let i=yyt(r.slice(o)),a=i.length,l=i===i.toUpperCase()?i.toLowerCase():i.toUpperCase();r=r.slice(0,o)+l+r.slice(o+a),o+=l.length,s++}t.setText(r),t.setOffset(o),t.recordChange({type:"toggleCase",count:e})}
function vJn(e,t){let r=t.text.split(`
`),{line:o}=t.cursor.getPosition();if(o>=r.length-1)return;let s=Math.min(e,r.length-o-1),i=r[o],a=i.length;for(let u=1;u<=s;u++){let d=(r[o+u]??"").trimStart();if(d.length>0){if(!i.endsWith(" ")&&i.length>0)i+=" ";i+=d}}let l=[...r.slice(0,o),i,...r.slice(o+s+1)],c=l.join(`
`);t.setText(c),t.setOffset(o5e(l,o)+a),t.recordChange({type:"join",count:e})}
function p6l(e,t,n){let r=n.getRegister();if(!r)return;let o=n.getRegisterIsLinewise(),s=o&&r.endsWith(`
`)?r.slice(0,-1):r;if(o){let a=n.text.split(`
`),{line:l}=n.cursor.getPosition(),c=e?l+1:l,u=s.split(`
`),d=[];for(let f=0;f<t;f++)d.push(...u);let p=[...a.slice(0,c),...d,...a.slice(c)],m=p.join(`
`);n.setText(m),n.setOffset(o5e(p,c))}else{let i=s.repeat(t),a=n.cursor.offset,l=n.text[a]===`
`&&(a===0||n.text[a-1]===`
`),c=e&&a<n.text.length&&!l?n.cursor.measuredText.nextOffset(a):a,u=n.text.slice(0,c)+i+n.text.slice(c),d=i.includes(`
`)?ZPo(u,c):c+i.length-(jV(i).length||1);n.setText(u),n.setOffset(d)}}
function wJn(e,t,n){let o=n.text.split(`
`),{line:s}=n.cursor.getPosition(),i=Math.min(t,o.length-s);eOo(o,s,s+i-1,e);let a=o.join(`
`),c=((o[s]??"").match(/^\s*/)?.[0]??"").length;n.setText(a),n.setOffset(o5e(o,s)+c),n.recordChange({type:"indent",dir:e,count:t})}
function dGt(e,t){let r=t.text.split(`
`),{line:o}=t.cursor.getPosition(),s=e==="below"?o+1:o,i=[...r.slice(0,s),"",...r.slice(s)],a=i.join(`
`);t.setText(a),t.enterInsert(o5e(i,s)),t.recordChange({type:"openLine",direction:e})}
function o5e(e,t){return e.slice(0,t).join(`
`).length+(t>0?1:0)}
function QPo(e,t,n,r,o){let s=Math.min(e.offset,t.offset),i=Math.max(e.offset,t.offset),a=!1;if(r==="change"&&(n==="w"||n==="W")){let l=e;for(let u=0;u<o-1;u++)l=n==="w"?l.nextVimWord():l.nextWORD();let c=n==="w"?l.endOfVimWord():l.endOfWORD();i=e.measuredText.nextOffset(c.offset)}else if(u6l(n)){a=!0;let l=e.text,c=l.indexOf(`
`,i);if(c===-1){if(i=l.length,s>0&&l[s-1]===`
`)s-=1}else i=c+1}else if(YPo(n)&&e.offset<=t.offset&&e.text[i]!==`
`)i=e.measuredText.nextOffset(i);return s=e.snapOutOfPlaceholder(s,"start"),i=e.snapOutOfPlaceholder(i,"end"),{from:s,to:i,linewise:a}}
function WHm(e,t,n){let r=Math.min(e.offset,t.offset),o=Math.max(e.offset,t.offset),s=e.measuredText.nextOffset(o);return{from:r,to:s}}
function VAt(e,t,n,r,o=!1){let s=r.text.slice(t,n);if(o&&!s.endsWith(`
`))s=s+`
`;if(r.setRegister(s,o),e==="yank")r.setOffset(t);else if(e==="delete"){let i=r.text.slice(0,t)+r.text.slice(n);r.setText(i),r.setOffset(ZPo(i,t))}else if(e==="change"){let i=r.text.slice(0,t)+r.text.slice(n);r.setText(i),r.enterInsert(t)}}
function ZPo(e,t){if(e[t]===`
`&&t>0&&e[t-1]!==`
`)return t-(jV(e.slice(0,t)).length||1);if(t>=e.length&&!e.endsWith(`
`))return Math.max(0,e.length-(jV(e).length||1));return t}
function m6l(e,t){if(t===0)return 0;let n=e.lastIndexOf(`
`,t-1);return n===-1?0:n+1}
function RJn(e,t){if(t){let n=Uu(e,`
`);return e.endsWith(`
`)?n:n+1}return xLe(e)}
function pGt(e,t,n){let r=e.text;if(n){let i=m6l(r,e.cursor.offset),a=i;for(let l=0;l<t;l++){let c=r.indexOf(`
`,a);if(c===-1){a=r.length;break}a=c+1}return{from:i,to:a}}let o=e.cursor.offset,s=o;for(let i=0;i<t&&s<r.length;i++)s=e.cursor.measuredText.nextOffset(s);return{from:o,to:s}}
function xJn(e,t,n){let r=Math.min(e,t.cursor.offset),o=Math.max(e,t.cursor.offset);if(!n)return{from:r,to:t.cursor.measuredText.nextOffset(o)};let s=t.text,i=m6l(s,r),a=s.indexOf(`
`,o),l=a===-1?s.length:a+1;return{from:i,to:l}}
function eOo(e,t,n,r){for(let s=t;s<=n;s++){let i=e[s]??"";if(r===">")e[s]="  "+i;else if(i.startsWith("  "))e[s]=i.slice(2);else if(i.startsWith("\t"))e[s]=i.slice(1);else{let a=0;while(a<i.length&&a<2&&/\s/.test(i[a]))a++;e[s]=i.slice(a)}}}
function f6l(e,t){let n=Math.min(e,t.cursor.offset),r=Math.max(e,t.cursor.offset),o=t.text,s=Uu(o.slice(0,n),`
`),i=Uu(o.slice(n,r),`
`)+1,a=o.split(`
`),l=Math.max(1,Math.min(i-1,a.length-s-1));if(s>=a.length-1)return;let c=a[s],u=c.length;for(let p=1;p<=l;p++){let m=(a[s+p]??"").trimStart();if(m.length>0){if(!c.endsWith(" ")&&c.length>0)c+=" ";c+=m}}let d=[...a.slice(0,s),c,...a.slice(s+l+1)];t.setText(d.join(`
`)),t.setOffset(o5e(d,s)+u),t.recordChange({type:"join",count:l})}
function A6l(e,t,n,r){let o=Math.min(n,r.cursor.offset),s=Math.max(n,r.cursor.offset),i=r.text,a=Uu(i.slice(0,o),`
`),l=a+Uu(i.slice(o,s),`
`),c=i.split(`
`);for(let m=0;m<t;m++)eOo(c,a,l,e);let u=c.join(`
`),p=((c[a]??"").match(/^\s*/)?.[0]??"").length;r.setText(u),r.setOffset(o5e(c,a)+p),r.recordChange({type:"visualIndent",dir:e,count:t,lines:l-a+1})}
function h6l(e,t,n,r){let o=r.text,s=o.split(`
`),i=Uu(o.slice(0,r.cursor.offset),`
`),a=Math.min(i+n-1,s.length-1);for(let u=0;u<t;u++)eOo(s,i,a,e);let l=s.join(`
`),c=((s[i]??"").match(/^\s*/)?.[0]??"").length;r.setText(l),r.setOffset(o5e(s,i)+c)}
function g6l(e,t,n,r,o){if(o&&e==="change"){let s=r.text.slice(t,n);if(!s.endsWith(`
`))s+=`
`;r.setRegister(s,!0);let i=r.text.slice(0,t),a=r.text.slice(n),l=a!=="";r.setText(i+(l?`
`:"")+a),r.enterInsert(t);return}if(o&&e==="delete"){let s=r.text.slice(t,n);if(!s.endsWith(`
`))s+=`
`;r.setRegister(s,!0);let i=t;if(n===r.text.length&&t>0&&r.text[t-1]===`
`)i-=1;let a=r.text.slice(0,i)+r.text.slice(n);r.setText(a);let l=Math.max(0,a.length-(jV(a).length||1));r.setOffset(Math.min(i,l));return}VAt(e,t,n,r,o)}
function _6l(e,t,n,r){let{from:o,to:s}=xJn(t,n,r),i=RJn(n.text.slice(o,s),r);if(g6l(e,o,s,n,r),e!=="yank")n.recordChange({type:"visualOp",op:e,span:i,linewise:r})}
function y6l(e,t,n,r){let{from:o,to:s}=pGt(r,t,n);if(o===s)return;g6l(e,o,s,r,n)}
function T6l(e,t,n,r){let{from:o,to:s}=pGt(r,e,t);if(o===s&&!t)return;let i=r.text.slice(o,s);if(t&&!i.endsWith(`
`))i+=`
`;r.setRegister(i,t);let a=r.text.slice(s),l=t&&a!==""?`
`+a:a,c=r.text.slice(0,o)+n+l;r.setText(c);let u=jV(n);r.setOffset(Math.max(o,o+n.length-(u.length||1)))}
function S6l(e,t,n,r){let o=r.text.slice(t,n),s="";for(let{segment:a}of KT().segment(o))s+=a===`
`?`
`:e;let i=r.text.slice(0,t)+s+r.text.slice(n);r.setText(i),r.setOffset(t)}
function b6l(e,t,n,r){let{from:o,to:s}=xJn(t,n,r),i=RJn(n.text.slice(o,s),r);S6l(e,o,s,n),n.recordChange({type:"visualReplace",char:e,span:i,linewise:r})}
function E6l(e,t,n,r){let{from:o,to:s}=pGt(r,t,n);if(o===s)return;S6l(e,o,s,r)}
function C6l(e,t,n,r){let o=r.text.slice(t,n),s="";for(let{segment:a}of KT().segment(o))if(e==="upper")s+=a.toUpperCase();else if(e==="lower")s+=a.toLowerCase();else s+=a===a.toUpperCase()?a.toLowerCase():a.toUpperCase();let i=r.text.slice(0,t)+s+r.text.slice(n);r.setText(i),r.setOffset(t)}
function v6l(e,t,n,r){let{from:o,to:s}=xJn(t,n,r),i=RJn(n.text.slice(o,s),r);C6l(e,o,s,n),n.recordChange({type:"visualCase",caseOp:e,span:i,linewise:r})}
function w6l(e,t,n,r){let{from:o,to:s}=pGt(r,t,n);if(o===s)return;C6l(e,o,s,r)}
function R6l(e,t,n){let r=t.getRegister();if(!r)return;let{from:o,to:s}=xJn(e,t,n),i=RJn(t.text.slice(o,s),n),a=k6l(r,o,s,t,n);t.recordChange({type:"visualPaste",content:a,span:i,linewise:n})}
function x6l(e,t,n,r){let{from:o,to:s}=pGt(r,t,n);if(o===s&&!n)return;k6l(e,o,s,r,n)}
function k6l(e,t,n,r,o){let s=r.text.slice(t,n).endsWith(`
`),i=e.endsWith(`
`)?e.slice(0,-1):e;if(s&&!i.endsWith(`
`))i+=`
`;let a=r.text.slice(t,n);if(o&&!a.endsWith(`
`))a+=`
`;r.setRegister(a,o);let l=r.text.slice(0,t)+i+r.text.slice(n);if(r.setText(l),o||i.endsWith(`
`))r.setOffset(t);else{let c=jV(i);r.setOffset(Math.max(t,t+i.length-(c.length||1)))}return i}
function H6l(e,t,n){let r=t===1?n.cursor.startOfLastLine():n.cursor.goToLine(t);if(r.equals(n.cursor))return;let o=QPo(n.cursor,r,"G",e,t);VAt(e,o.from,o.to,n,o.linewise),n.recordChange({type:"operator",op:e,motion:"G",count:t})}
function I6l(e,t,n){let r=t===1?n.cursor.startOfFirstLine():n.cursor.goToLine(t);if(r.equals(n.cursor))return;let o=QPo(n.cursor,r,"gg",e,t);VAt(e,o.from,o.to,n,o.linewise),n.recordChange({type:"operator",op:e,motion:"gg",count:t})}
var tOo=b(()=>{DUe();KI();dr();JPo()});
export {r5e,TJn,SJn,XPo,bJn,EJn,CJn,vJn,p6l,wJn,dGt,o5e,QPo,WHm,VAt,ZPo,m6l,RJn,pGt,xJn,eOo,f6l,A6l,h6l,g6l,_6l,y6l,T6l,S6l,b6l,E6l,C6l,v6l,w6l,R6l,x6l,k6l,H6l,I6l,tOo};
