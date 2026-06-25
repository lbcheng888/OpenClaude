// @ts-nocheck
import {Text} from "./m2433.ts";
import {sn,mc} from "./m237.ts";
import {Y8,gvn} from "./m2560.ts";
import {oy,B8} from "./m2385.ts";
import {Box} from "./m2432.ts";
import {_r,ui} from "./m2463.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function hJp(e,t){switch(e){case"grid":return 3*t+1;case"simple":return 3*t-1;case"minimal":case"plain":return HAo*(t-1)}}
function gJp(e){if(typeof e==="string"||typeof e==="number")return!0;if(ePe.isValidElement(e)&&e.type===ePe.Fragment)return!0;return!1}
function _Jp(e,t,n){if(!gJp(e))return e;return gb.jsx(Text,{dimColor:t.dim&&!n,bold:t.bold||n,children:e})}
function rml(e){return sn(Y8(e))}
function yJp(e,t,n,r,o){let s=e.length,i=e.map((c,u)=>{let d=n?rml(c.header):0;for(let p of t)d=Math.max(d,rml(p[u]));return d}),a=Array(s),l=[];for(let c=0;c<s;c++){let u=e[c].width;if(typeof u==="number")a[c]=u;else if(u&&"ratio"in u&&u.ratio!==void 0)l.push(c),a[c]=0;else if(u)a[c]=oy(i[c],u.min??0,u.max??1/0);else a[c]=i[c]}if(l.length>0){let c=a.reduce((p,m)=>p+m,0),u=Math.max(0,r-hJp(o,s)-c),d=l.reduce((p,m)=>p+(e[m].width.ratio??0),0);for(let p of l){let m=e[p].width,f=d>0?Math.floor(u*(m.ratio??0)/d):0;a[p]=oy(f,m.min??1,m.max??1/0)}}return a}
function TJp(e){let t=W8e.c(2),{box:n}=e;if(n==="grid"||n==="simple"){let o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=gb.jsx(Text,{dimColor:!0,children:" \u2502 "}),t[0]=o;else o=t[0];return o}let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=gb.jsx(Box,{width:HAo,flexShrink:0}),t[1]=r;else r=t[1];return r}
function oml(e){let t=W8e.c(3),{box:n,side:r}=e;if(n==="grid"){let o=r==="left"?"\u2502 ":" \u2502",s;if(t[0]!==o)s=gb.jsx(Text,{dimColor:!0,children:o}),t[0]=o,t[1]=s;else s=t[1];return s}if(n==="simple"){let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=gb.jsx(Text,{children:" "}),t[2]=o;else o=t[2];return o}return null}
function wAo(e){let t=W8e.c(19),{box:n,type:r,widths:o}=e;if(n==="minimal"){let p;if(t[0]!==o)p=o.map(bJp),t[0]=o,t[1]=p;else p=t[1];let m;if(t[2]!==p)m=gb.jsx(Box,{flexDirection:"row",children:p}),t[2]=p,t[3]=m;else m=t[3];return m}let s,i,a,l,c,u;if(t[4]!==n||t[5]!==r||t[6]!==o){u=Symbol.for("react.early_return_sentinel");e:{let p=o.map(SJp);if(n==="simple"){u=gb.jsx(Text,{dimColor:!0,children:p.join("\u253C")});break e}let[m,f,h]=r==="top"?["\u250C","\u252C","\u2510"]:r==="bottom"?["\u2514","\u2534","\u2518"]:["\u251C","\u253C","\u2524"];i=h,s=Text,a=!0,l=m,c=p.join(f)}t[4]=n,t[5]=r,t[6]=o,t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=c,t[12]=u}else s=t[7],i=t[8],a=t[9],l=t[10],c=t[11],u=t[12];if(u!==Symbol.for("react.early_return_sentinel"))return u;let d;if(t[13]!==s||t[14]!==i||t[15]!==a||t[16]!==l||t[17]!==c)d=gb.jsxs(s,{dimColor:a,children:[l,c,i]}),t[13]=s,t[14]=i,t[15]=a,t[16]=l,t[17]=c,t[18]=d;else d=t[18];return d}
function SJp(e){return"\u2500".repeat(e+2)}
function bJp(e,t){return gb.jsxs(kAo.Fragment,{children:[t>0&&gb.jsx(Box,{width:HAo,flexShrink:0}),gb.jsx(Text,{dimColor:!0,children:"\u2500".repeat(e)})]},t)}
function sml(e){let t=W8e.c(19),{cells:n,columns:r,widths:o,box:s,isHeader:i}=e,a;if(t[0]!==s)a=gb.jsx(oml,{box:s,side:"left"}),t[0]=s,t[1]=a;else a=t[1];let l;if(t[2]!==s||t[3]!==n||t[4]!==r||t[5]!==i||t[6]!==o){let d;if(t[8]!==s||t[9]!==n||t[10]!==i||t[11]!==o)d=(p,m)=>gb.jsxs(kAo.Fragment,{children:[m>0&&gb.jsx(TJp,{box:s}),gb.jsx(Box,{width:o[m]||void 0,flexShrink:0,justifyContent:fJp[p.align??"start"],children:_Jp(n[m],p,i)})]},m),t[8]=s,t[9]=n,t[10]=i,t[11]=o,t[12]=d;else d=t[12];l=r.map(d),t[2]=s,t[3]=n,t[4]=r,t[5]=i,t[6]=o,t[7]=l}else l=t[7];let c;if(t[13]!==s)c=gb.jsx(oml,{box:s,side:"right"}),t[13]=s,t[14]=c;else c=t[14];let u;if(t[15]!==a||t[16]!==l||t[17]!==c)u=gb.jsxs(Box,{flexDirection:"row",children:[a,l,c]}),t[15]=a,t[16]=l,t[17]=c,t[18]=u;else u=t[18];return u}
function EJp(e){let t=W8e.c(2),{children:n}=e,r;if(t[0]!==n)r=gb.jsx(gb.Fragment,{children:n}),t[0]=n,t[1]=r;else r=t[1];return r}
function CJp(e){let t=W8e.c(22),{box:n,columns:r,children:o,forceWidth:s}=e,i=n===void 0?"plain":n,{columns:a}=_r(),l=s??a,c,u,d,p,m,f,h;if(t[0]!==i||t[1]!==o||t[2]!==r||t[3]!==l){let T=ePe.Children.toArray(o).filter(ePe.isValidElement),y=T.map(vJp),S=r.some(RJp);h=yJp(r,y,S,l,i),c=Box,u="column",d=i==="grid"&&gb.jsx(wAo,{box:i,type:"top",widths:h}),p=S&&gb.jsx(sml,{cells:r.map(AJp),columns:r,widths:h,box:i,isHeader:!0}),m=S&&i!=="plain"&&gb.jsx(wAo,{box:i,type:"header",widths:h}),f=y.map((E,R)=>gb.jsx(sml,{cells:E,columns:r,widths:h,box:i,isHeader:!1},T[R].key??R)),t[0]=i,t[1]=o,t[2]=r,t[3]=l,t[4]=c,t[5]=u,t[6]=d,t[7]=p,t[8]=m,t[9]=f,t[10]=h}else c=t[4],u=t[5],d=t[6],p=t[7],m=t[8],f=t[9],h=t[10];let g;if(t[11]!==i||t[12]!==h)g=i==="grid"&&gb.jsx(wAo,{box:i,type:"bottom",widths:h}),t[11]=i,t[12]=h,t[13]=g;else g=t[13];let _;if(t[14]!==c||t[15]!==u||t[16]!==d||t[17]!==p||t[18]!==m||t[19]!==f||t[20]!==g)_=gb.jsxs(c,{flexDirection:u,children:[d,p,m,f,g]}),t[14]=c,t[15]=u,t[16]=d,t[17]=p,t[18]=m,t[19]=f,t[20]=g,t[21]=_;else _=t[21];return _}
function AJp(e){return e.header}
function RJp(e){return e.header!==void 0}
function vJp(e){return ePe.Children.toArray(e.props.children)}
var W8e,kAo,ePe,gb,fJp,HAo=2,bf;
var G8e=b(()=>{ui();B8();mc();je();gvn();W8e=x(tt(),1),kAo=x(et(),1),ePe=x(et(),1),gb=x(oe(),1),fJp={start:"flex-start",center:"center",end:"flex-end"};bf=Object.assign(CJp,{Row:EJp})});
export {hJp,gJp,_Jp,rml,yJp,TJp,oml,wAo,SJp,bJp,sml,EJp,CJp,AJp,RJp,vJp,W8e,kAo,ePe,gb,fJp,HAo,bf,G8e};
