// @ts-nocheck
import {K8e,UAo,GVn,Gml,$Ao} from "./m4553.ts";
import {vl,I2e} from "./m2532.ts";
import {nu,lr} from "./m233.ts";
import {fK,Kbt,bMe,$T,p0} from "./m236.ts";
import {b} from "../runtime.ts";
function z8e(e,t,n,r){let o=K8e(t,r.cursor,n);if(o.equals(r.cursor)&&!UAo(t))return;let s=WAo(r.cursor,o,t,e,n);if(s.from===s.to){if(e==="change"||e==="yank")r.setRegister("",!1);if(e==="change")r.enterInsert(s.from);return}jft(e,s.from,s.to,r,s.linewise),r.recordChange({type:"operator",op:e,motion:t,count:n})}
function VVn(e,t,n,r,o){let s=o.cursor.findCharacter(n,t,r);if(s===null)return;let i=new vl(o.cursor.measuredText,s),a=dXp(o.cursor,i,t);jft(e,a.from,a.to,o),o.setLastFind(t,n),o.recordChange({type:"operatorFind",op:e,find:t,char:n,count:r})}
function KVn(e,t,n,r,o){let s=GVn(o.text,o.cursor.offset,n,t==="inner");if(!s)return;jft(e,s.start,s.end,o),o.recordChange({type:"operatorTextObj",op:e,objType:n,scope:t,count:r})}
function qAo(e,t,n){let r=n.text,o=r.split(`
`),s=nu(r.slice(0,n.cursor.offset),`
`),i=Math.min(t,o.length-s),a=n.cursor.startOfLogicalLine().offset,l=a;for(let u=0;u<i;u++){let d=r.indexOf(`
`,l);l=d===-1?r.length:d+1}let c=r.slice(a,l);if(!c.endsWith(`
`))c=c+`
`;if(n.setRegister(c,!0),e==="yank")n.setOffset(a);else if(e==="delete"){let u=a,d=l;if(d===r.length&&u>0&&r[u-1]===`
`)u-=1;let p=r.slice(0,u)+r.slice(d);n.setText(p||"");let m=Math.max(0,p.length-(fK(p).length||1));n.setOffset(Math.min(u,m))}else if(e==="change")if(o.length===1)n.setText(""),n.enterInsert(0);else{let u=o.slice(0,s),d=o.slice(s+i),p=[...u,"",...d].join(`
`);n.setText(p),n.enterInsert(a)}n.recordChange({type:"operator",op:e,motion:e[0],count:t})}
function zVn(e,t){let n=t.cursor.offset;if(n>=t.text.length)return;let r=t.cursor;for(let a=0;a<e&&!r.isAtEnd();a++)r=r.right();let o=r.offset,s=t.text.slice(n,o),i=t.text.slice(0,n)+t.text.slice(o);t.setRegister(s,!1),t.setText(i),t.setOffset(GAo(i,n)),t.recordChange({type:"x",count:e})}
function jVn(e,t,n){let r=n.cursor.offset,o=n.text;for(let s=0;s<t&&r<o.length;s++){let i=Kbt(o.slice(r)).length||1;o=o.slice(0,r)+e+o.slice(r+i),r+=e.length}n.setText(o),n.setOffset(Math.max(0,r-e.length)),n.recordChange({type:"replace",char:e,count:t})}
function YVn(e,t){let n=t.cursor.offset;if(n>=t.text.length)return;let r=t.text,o=n,s=0;while(o<r.length&&s<e){let i=Kbt(r.slice(o)),a=i.length,l=i===i.toUpperCase()?i.toLowerCase():i.toUpperCase();r=r.slice(0,o)+l+r.slice(o+a),o+=l.length,s++}t.setText(r),t.setOffset(o),t.recordChange({type:"toggleCase",count:e})}
function JVn(e,t){let r=t.text.split(`
`),{line:o}=t.cursor.getPosition();if(o>=r.length-1)return;let s=Math.min(e,r.length-o-1),i=r[o],a=i.length;for(let u=1;u<=s;u++){let d=(r[o+u]??"").trimStart();if(d.length>0){if(!i.endsWith(" ")&&i.length>0)i+=" ";i+=d}}let l=[...r.slice(0,o),i,...r.slice(o+s+1)],c=l.join(`
`);t.setText(c),t.setOffset(j8e(l,o)+a),t.recordChange({type:"join",count:e})}
function Kml(e,t,n){let r=n.getRegister();if(!r)return;let o=n.getRegisterIsLinewise(),s=o&&r.endsWith(`
`)?r.slice(0,-1):r;if(o){let a=n.text.split(`
`),{line:l}=n.cursor.getPosition(),c=e?l+1:l,u=s.split(`
`),d=[];for(let f=0;f<t;f++)d.push(...u);let p=[...a.slice(0,c),...d,...a.slice(c)],m=p.join(`
`);n.setText(m),n.setOffset(j8e(p,c))}else{let i=s.repeat(t),a=n.cursor.offset,l=n.text[a]===`
`&&(a===0||n.text[a-1]===`
`),c=e&&a<n.text.length&&!l?n.cursor.measuredText.nextOffset(a):a,u=n.text.slice(0,c)+i+n.text.slice(c),d=i.includes(`
`)?GAo(u,c):c+i.length-(fK(i).length||1);n.setText(u),n.setOffset(d)}}
function XVn(e,t,n){let o=n.text.split(`
`),{line:s}=n.cursor.getPosition(),i=Math.min(t,o.length-s);VAo(o,s,s+i-1,e);let a=o.join(`
`),c=((o[s]??"").match(/^\s*/)?.[0]??"").length;n.setText(a),n.setOffset(j8e(o,s)+c),n.recordChange({type:"indent",dir:e,count:t})}
function U8t(e,t){let r=t.text.split(`
`),{line:o}=t.cursor.getPosition(),s=e==="below"?o+1:o,i=[...r.slice(0,s),"",...r.slice(s)],a=i.join(`
`);t.setText(a),t.enterInsert(j8e(i,s)),t.recordChange({type:"openLine",direction:e})}
function j8e(e,t){return e.slice(0,t).join(`
`).length+(t>0?1:0)}
function WAo(e,t,n,r,o){let s=Math.min(e.offset,t.offset),i=Math.max(e.offset,t.offset),a=!1;if(r==="change"&&(n==="w"||n==="W")){let l=e;for(let u=0;u<o-1;u++)l=n==="w"?l.nextVimWord():l.nextWORD();let c=n==="w"?l.endOfVimWord():l.endOfWORD();i=e.measuredText.nextOffset(c.offset)}else if(Gml(n)){a=!0;let l=e.text,c=l.indexOf(`
`,i);if(c===-1){if(i=l.length,s>0&&l[s-1]===`
`)s-=1}else i=c+1}else if(UAo(n)&&e.offset<=t.offset&&e.text[i]!==`
`)i=e.measuredText.nextOffset(i);return s=e.snapOutOfPlaceholder(s,"start"),i=e.snapOutOfPlaceholder(i,"end"),{from:s,to:i,linewise:a}}
function dXp(e,t,n){let r=Math.min(e.offset,t.offset),o=Math.max(e.offset,t.offset),s=e.measuredText.nextOffset(o);return{from:r,to:s}}
function jft(e,t,n,r,o=!1){let s=r.text.slice(t,n);if(o&&!s.endsWith(`
`))s=s+`
`;if(r.setRegister(s,o),e==="yank")r.setOffset(t);else if(e==="delete"){let i=r.text.slice(0,t)+r.text.slice(n);r.setText(i),r.setOffset(GAo(i,t))}else if(e==="change"){let i=r.text.slice(0,t)+r.text.slice(n);r.setText(i),r.enterInsert(t)}}
function GAo(e,t){if(e[t]===`
`&&t>0&&e[t-1]!==`
`)return t-(fK(e.slice(0,t)).length||1);if(t>=e.length&&!e.endsWith(`
`))return Math.max(0,e.length-(fK(e).length||1));return t}
function zml(e,t){if(t===0)return 0;let n=e.lastIndexOf(`
`,t-1);return n===-1?0:n+1}
function QVn(e,t){if(t){let n=nu(e,`
`);return e.endsWith(`
`)?n:n+1}return bMe(e)}
function $8t(e,t,n){let r=e.text;if(n){let i=zml(r,e.cursor.offset),a=i;for(let l=0;l<t;l++){let c=r.indexOf(`
`,a);if(c===-1){a=r.length;break}a=c+1}return{from:i,to:a}}let o=e.cursor.offset,s=o;for(let i=0;i<t&&s<r.length;i++)s=e.cursor.measuredText.nextOffset(s);return{from:o,to:s}}
function ZVn(e,t,n){let r=Math.min(e,t.cursor.offset),o=Math.max(e,t.cursor.offset);if(!n)return{from:r,to:t.cursor.measuredText.nextOffset(o)};let s=t.text,i=zml(s,r),a=s.indexOf(`
`,o),l=a===-1?s.length:a+1;return{from:i,to:l}}
function VAo(e,t,n,r){for(let s=t;s<=n;s++){let i=e[s]??"";if(r===">")e[s]="  "+i;else if(i.startsWith("  "))e[s]=i.slice(2);else if(i.startsWith("\t"))e[s]=i.slice(1);else{let a=0;while(a<i.length&&a<2&&/\s/.test(i[a]))a++;e[s]=i.slice(a)}}}
function jml(e,t){let n=Math.min(e,t.cursor.offset),r=Math.max(e,t.cursor.offset),o=t.text,s=nu(o.slice(0,n),`
`),i=nu(o.slice(n,r),`
`)+1,a=o.split(`
`),l=Math.max(1,Math.min(i-1,a.length-s-1));if(s>=a.length-1)return;let c=a[s],u=c.length;for(let p=1;p<=l;p++){let m=(a[s+p]??"").trimStart();if(m.length>0){if(!c.endsWith(" ")&&c.length>0)c+=" ";c+=m}}let d=[...a.slice(0,s),c,...a.slice(s+l+1)];t.setText(d.join(`
`)),t.setOffset(j8e(d,s)+u),t.recordChange({type:"join",count:l})}
function Yml(e,t,n,r){let o=Math.min(n,r.cursor.offset),s=Math.max(n,r.cursor.offset),i=r.text,a=nu(i.slice(0,o),`
`),l=a+nu(i.slice(o,s),`
`),c=i.split(`
`);for(let m=0;m<t;m++)VAo(c,a,l,e);let u=c.join(`
`),p=((c[a]??"").match(/^\s*/)?.[0]??"").length;r.setText(u),r.setOffset(j8e(c,a)+p),r.recordChange({type:"visualIndent",dir:e,count:t,lines:l-a+1})}
function Jml(e,t,n,r){let o=r.text,s=o.split(`
`),i=nu(o.slice(0,r.cursor.offset),`
`),a=Math.min(i+n-1,s.length-1);for(let u=0;u<t;u++)VAo(s,i,a,e);let l=s.join(`
`),c=((s[i]??"").match(/^\s*/)?.[0]??"").length;r.setText(l),r.setOffset(j8e(s,i)+c)}
function Xml(e,t,n,r,o){if(o&&e==="change"){let s=r.text.slice(t,n);if(!s.endsWith(`
`))s+=`
`;r.setRegister(s,!0);let i=r.text.slice(0,t),a=r.text.slice(n),l=a!=="";r.setText(i+(l?`
`:"")+a),r.enterInsert(t);return}if(o&&e==="delete"){let s=r.text.slice(t,n);if(!s.endsWith(`
`))s+=`
`;r.setRegister(s,!0);let i=t;if(n===r.text.length&&t>0&&r.text[t-1]===`
`)i-=1;let a=r.text.slice(0,i)+r.text.slice(n);r.setText(a);let l=Math.max(0,a.length-(fK(a).length||1));r.setOffset(Math.min(i,l));return}jft(e,t,n,r,o)}
function Qml(e,t,n,r){let{from:o,to:s}=ZVn(t,n,r),i=QVn(n.text.slice(o,s),r);if(Xml(e,o,s,n,r),e!=="yank")n.recordChange({type:"visualOp",op:e,span:i,linewise:r})}
function Zml(e,t,n,r){let{from:o,to:s}=$8t(r,t,n);if(o===s)return;Xml(e,o,s,r,n)}
function efl(e,t,n,r){let{from:o,to:s}=$8t(r,e,t);if(o===s&&!t)return;let i=r.text.slice(o,s);if(t&&!i.endsWith(`
`))i+=`
`;r.setRegister(i,t);let a=r.text.slice(s),l=t&&a!==""?`
`+a:a,c=r.text.slice(0,o)+n+l;r.setText(c);let u=fK(n);r.setOffset(Math.max(o,o+n.length-(u.length||1)))}
function tfl(e,t,n,r){let o=r.text.slice(t,n),s="";for(let{segment:a}of $T().segment(o))s+=a===`
`?`
`:e;let i=r.text.slice(0,t)+s+r.text.slice(n);r.setText(i),r.setOffset(t)}
function nfl(e,t,n,r){let{from:o,to:s}=ZVn(t,n,r),i=QVn(n.text.slice(o,s),r);tfl(e,o,s,n),n.recordChange({type:"visualReplace",char:e,span:i,linewise:r})}
function rfl(e,t,n,r){let{from:o,to:s}=$8t(r,t,n);if(o===s)return;tfl(e,o,s,r)}
function ofl(e,t,n,r){let o=r.text.slice(t,n),s="";for(let{segment:a}of $T().segment(o))if(e==="upper")s+=a.toUpperCase();else if(e==="lower")s+=a.toLowerCase();else s+=a===a.toUpperCase()?a.toLowerCase():a.toUpperCase();let i=r.text.slice(0,t)+s+r.text.slice(n);r.setText(i),r.setOffset(t)}
function sfl(e,t,n,r){let{from:o,to:s}=ZVn(t,n,r),i=QVn(n.text.slice(o,s),r);ofl(e,o,s,n),n.recordChange({type:"visualCase",caseOp:e,span:i,linewise:r})}
function ifl(e,t,n,r){let{from:o,to:s}=$8t(r,t,n);if(o===s)return;ofl(e,o,s,r)}
function afl(e,t,n){let r=t.getRegister();if(!r)return;let{from:o,to:s}=ZVn(e,t,n),i=QVn(t.text.slice(o,s),n),a=cfl(r,o,s,t,n);t.recordChange({type:"visualPaste",content:a,span:i,linewise:n})}
function lfl(e,t,n,r){let{from:o,to:s}=$8t(r,t,n);if(o===s&&!n)return;cfl(e,o,s,r,n)}
function cfl(e,t,n,r,o){let s=r.text.slice(t,n).endsWith(`
`),i=e.endsWith(`
`)?e.slice(0,-1):e;if(s&&!i.endsWith(`
`))i+=`
`;let a=r.text.slice(t,n);if(o&&!a.endsWith(`
`))a+=`
`;r.setRegister(a,o);let l=r.text.slice(0,t)+i+r.text.slice(n);if(r.setText(l),o||i.endsWith(`
`))r.setOffset(t);else{let c=fK(i);r.setOffset(Math.max(t,t+i.length-(c.length||1)))}return i}
function ufl(e,t,n){let r=t===1?n.cursor.startOfLastLine():n.cursor.goToLine(t);if(r.equals(n.cursor))return;let o=WAo(n.cursor,r,"G",e,t);jft(e,o.from,o.to,n,o.linewise),n.recordChange({type:"operator",op:e,motion:"G",count:t})}
function dfl(e,t,n){let r=t===1?n.cursor.startOfFirstLine():n.cursor.goToLine(t);if(r.equals(n.cursor))return;let o=WAo(n.cursor,r,"gg",e,t);jft(e,o.from,o.to,n,o.linewise),n.recordChange({type:"operator",op:e,motion:"gg",count:t})}
var KAo=b(()=>{I2e();p0();lr();$Ao()});
export {z8e,VVn,KVn,qAo,zVn,jVn,YVn,JVn,Kml,XVn,U8t,j8e,WAo,dXp,jft,GAo,zml,QVn,$8t,ZVn,VAo,jml,Yml,Jml,Xml,Qml,Zml,efl,tfl,nfl,rfl,ofl,sfl,ifl,afl,lfl,cfl,ufl,dfl,KAo};
