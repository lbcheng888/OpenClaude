// @ts-nocheck
import {Text} from "./m2423.ts";
import {tn,Hc} from "./m235.ts";
import {L5,kEn} from "./m2549.ts";
import {ny,v5} from "./m2375.ts";
import {Box} from "./m2422.ts";
import {mr,ki} from "./m2453.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function O8p(e,t){switch(e){case"grid":return 3*t+1;case"simple":return 3*t-1;case"minimal":case"plain":return Lyo*(t-1)}}
function L8p(e){if(typeof e==="string"||typeof e==="number")return!0;if(jh.isValidElement(e)&&e.type===jh.Fragment)return!0;return!1}
function M8p(e,t,n){if(!L8p(e))return e;return jh.default.createElement(Text,{dimColor:t.dim&&!n,bold:t.bold||n},e)}
function Ail(e){return tn(L5(e))}
function N8p(e,t,n,r,o){let s=e.length,i=e.map((c,u)=>{let d=n?Ail(c.header):0;for(let p of t)d=Math.max(d,Ail(p[u]));return d}),a=Array(s),l=[];for(let c=0;c<s;c++){let u=e[c].width;if(typeof u==="number")a[c]=u;else if(u&&"ratio"in u&&u.ratio!==void 0)l.push(c),a[c]=0;else if(u)a[c]=ny(i[c],u.min??0,u.max??1/0);else a[c]=i[c]}if(l.length>0){let c=a.reduce((p,m)=>p+m,0),u=Math.max(0,r-O8p(o,s)-c),d=l.reduce((p,m)=>p+(e[m].width.ratio??0),0);for(let p of l){let m=e[p].width,f=d>0?Math.floor(u*(m.ratio??0)/d):0;a[p]=ny(f,m.min??1,m.max??1/0)}}return a}
function B8p(e){let t=Aje.c(2),{box:n}=e;if(n==="grid"||n==="simple"){let o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=jh.default.createElement(Text,{dimColor:!0}," \u2502 "),t[0]=o;else o=t[0];return o}let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=jh.default.createElement(Box,{width:Lyo,flexShrink:0}),t[1]=r;else r=t[1];return r}
function hil(e){let t=Aje.c(3),{box:n,side:r}=e;if(n==="grid"){let o=r==="left"?"\u2502 ":" \u2502",s;if(t[0]!==o)s=jh.default.createElement(Text,{dimColor:!0},o),t[0]=o,t[1]=s;else s=t[1];return s}if(n==="simple"){let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=jh.default.createElement(Text,null," "),t[2]=o;else o=t[2];return o}return null}
function Oyo(e){let t=Aje.c(19),{box:n,type:r,widths:o}=e;if(n==="minimal"){let p;if(t[0]!==o)p=o.map(U8p),t[0]=o,t[1]=p;else p=t[1];let m;if(t[2]!==p)m=jh.default.createElement(Box,{flexDirection:"row"},p),t[2]=p,t[3]=m;else m=t[3];return m}let s,i,a,l,c,u;if(t[4]!==n||t[5]!==r||t[6]!==o){u=Symbol.for("react.early_return_sentinel");e:{let p=o.map(F8p);if(n==="simple"){u=jh.default.createElement(Text,{dimColor:!0},p.join("\u253C"));break e}let[m,f,A]=r==="top"?["\u250C","\u252C","\u2510"]:r==="bottom"?["\u2514","\u2534","\u2518"]:["\u251C","\u253C","\u2524"];i=A,s=Text,a=!0,l=m,c=p.join(f)}t[4]=n,t[5]=r,t[6]=o,t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=c,t[12]=u}else s=t[7],i=t[8],a=t[9],l=t[10],c=t[11],u=t[12];if(u!==Symbol.for("react.early_return_sentinel"))return u;let d;if(t[13]!==s||t[14]!==i||t[15]!==a||t[16]!==l||t[17]!==c)d=jh.default.createElement(s,{dimColor:a},l,c,i),t[13]=s,t[14]=i,t[15]=a,t[16]=l,t[17]=c,t[18]=d;else d=t[18];return d}
function F8p(e){return"\u2500".repeat(e+2)}
function U8p(e,t){return jh.default.createElement(jh.default.Fragment,{key:t},t>0&&jh.default.createElement(Box,{width:Lyo,flexShrink:0}),jh.default.createElement(Text,{dimColor:!0},"\u2500".repeat(e)))}
function gil(e){let t=Aje.c(19),{cells:n,columns:r,widths:o,box:s,isHeader:i}=e,a;if(t[0]!==s)a=jh.default.createElement(hil,{box:s,side:"left"}),t[0]=s,t[1]=a;else a=t[1];let l;if(t[2]!==s||t[3]!==n||t[4]!==r||t[5]!==i||t[6]!==o){let d;if(t[8]!==s||t[9]!==n||t[10]!==i||t[11]!==o)d=(p,m)=>jh.default.createElement(jh.default.Fragment,{key:m},m>0&&jh.default.createElement(B8p,{box:s}),jh.default.createElement(Box,{width:o[m]||void 0,flexShrink:0,justifyContent:P8p[p.align??"start"]},M8p(n[m],p,i))),t[8]=s,t[9]=n,t[10]=i,t[11]=o,t[12]=d;else d=t[12];l=r.map(d),t[2]=s,t[3]=n,t[4]=r,t[5]=i,t[6]=o,t[7]=l}else l=t[7];let c;if(t[13]!==s)c=jh.default.createElement(hil,{box:s,side:"right"}),t[13]=s,t[14]=c;else c=t[14];let u;if(t[15]!==a||t[16]!==l||t[17]!==c)u=jh.default.createElement(Box,{flexDirection:"row"},a,l,c),t[15]=a,t[16]=l,t[17]=c,t[18]=u;else u=t[18];return u}
function $8p(e){let t=Aje.c(2),{children:n}=e,r;if(t[0]!==n)r=jh.default.createElement(jh.default.Fragment,null,n),t[0]=n,t[1]=r;else r=t[1];return r}
function q8p(e){let t=Aje.c(22),{box:n,columns:r,children:o,forceWidth:s}=e,i=n===void 0?"plain":n,{columns:a}=mr(),l=s??a,c,u,d,p,m,f,A;if(t[0]!==i||t[1]!==o||t[2]!==r||t[3]!==l){let _=jh.Children.toArray(o).filter(jh.isValidElement),y=_.map(G8p),T=r.some(W8p);A=N8p(r,y,T,l,i),c=Box,u="column",d=i==="grid"&&jh.default.createElement(Oyo,{box:i,type:"top",widths:A}),p=T&&jh.default.createElement(gil,{cells:r.map(j8p),columns:r,widths:A,box:i,isHeader:!0}),m=T&&i!=="plain"&&jh.default.createElement(Oyo,{box:i,type:"header",widths:A}),f=y.map((S,v)=>jh.default.createElement(gil,{key:_[v].key??v,cells:S,columns:r,widths:A,box:i,isHeader:!1})),t[0]=i,t[1]=o,t[2]=r,t[3]=l,t[4]=c,t[5]=u,t[6]=d,t[7]=p,t[8]=m,t[9]=f,t[10]=A}else c=t[4],u=t[5],d=t[6],p=t[7],m=t[8],f=t[9],A=t[10];let h;if(t[11]!==i||t[12]!==A)h=i==="grid"&&jh.default.createElement(Oyo,{box:i,type:"bottom",widths:A}),t[11]=i,t[12]=A,t[13]=h;else h=t[13];let g;if(t[14]!==c||t[15]!==u||t[16]!==d||t[17]!==p||t[18]!==m||t[19]!==f||t[20]!==h)g=jh.default.createElement(c,{flexDirection:u},d,p,m,f,h),t[14]=c,t[15]=u,t[16]=d,t[17]=p,t[18]=m,t[19]=f,t[20]=h,t[21]=g;else g=t[21];return g}
function j8p(e){return e.header}
function W8p(e){return e.header!==void 0}
function G8p(e){return jh.Children.toArray(e.props.children)}
var Aje,jh,P8p,Lyo=2,cA;
var hje=b(()=>{ki();v5();Hc();ze();kEn();Aje=M(rt(),1),jh=M(Te(),1),P8p={start:"flex-start",center:"center",end:"flex-end"};cA=Object.assign(q8p,{Row:$8p})});
export {O8p,L8p,M8p,Ail,N8p,B8p,hil,Oyo,F8p,U8p,gil,$8p,q8p,j8p,W8p,G8p,Aje,jh,P8p,Lyo,cA,hje};
