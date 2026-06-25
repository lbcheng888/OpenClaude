// @ts-nocheck
import {C9e} from "./m3063.ts";
import {b,x} from "../runtime.ts";
import {k0n} from "./m3064.ts";
import {S0n,Zot} from "./m3034.ts";
import {T0n} from "./m3033.ts";
import {dZi} from "./m3067.ts";
import {E9e} from "./m3062.ts";
import {lHe} from "./m3039.ts";
import {Ige} from "./m3036.ts";
import {b1} from "./m3031.ts";
import {S9e} from "./m3037.ts";
import {X1t} from "./m3038.ts";
import {J1t,Xot,m0n,Qjr,zXi,f0n} from "./m3029.ts";
import {b9e} from "./m3040.ts";
import {T9e} from "./m3032.ts";
import {hYr} from "./m3057.ts";
function sst(e){return!C9e.isSeparator(e)&&!e.disabled}
function l6d(e){return e.map((t)=>{if(C9e.isSeparator(t))return t;if(typeof t==="string")return{value:t,name:t,short:t,disabled:!1};let n=t.name??String(t.value);return{value:t.value,name:n,description:t.description,short:t.short??n,disabled:t.disabled??!1}})}
var TYr,pZi,a6d,I0n;
var mZi=b(()=>{k0n();S0n();TYr=x(T0n(),1),pZi=x(dZi(),1),a6d={icon:{cursor:Zot.pointer},style:{disabled:(e)=>TYr.default.dim(`- ${e}`),description:(e)=>TYr.default.cyan(e)},helpMode:"auto"};I0n=E9e((e,t)=>{let{loop:n=!0,pageSize:r=7}=e,o=lHe(!0),s=Ige(a6d,e.theme),[i,a]=b1("idle"),l=S9e({status:i,theme:s}),c=lHe(),u=X1t(()=>l6d(e.choices),[e.choices]),d=X1t(()=>{let E=u.findIndex(sst),R=u.findLastIndex(sst);if(E<0)throw new J1t("[select prompt] No selectable choices. All choices are disabled.");return{first:E,last:R}},[u]),p=X1t(()=>{if(!("default"in e))return-1;return u.findIndex((E)=>sst(E)&&E.value===e.default)},[e.default,u]),[m,f]=b1(p===-1?d.first:p),h=u[m];b9e((E,R)=>{if(clearTimeout(c.current),Xot(E))a("done"),t(h.value);else if(m0n(E)||Qjr(E)){if(R.clearLine(0),n||m0n(E)&&m!==d.first||Qjr(E)&&m!==d.last){let w=m0n(E)?-1:1,H=m;do H=(H+w+u.length)%u.length;while(!sst(u[H]));f(H)}}else if(zXi(E)){R.clearLine(0);let w=Number(E.name)-1,H=u[w];if(H!=null&&sst(H))f(w)}else if(f0n(E))R.clearLine(0);else{let w=R.line.toLowerCase(),H=u.findIndex((k)=>{if(C9e.isSeparator(k)||!sst(k))return!1;return k.name.toLowerCase().startsWith(w)});if(H>=0)f(H);c.current=setTimeout(()=>{R.clearLine(0)},700)}}),T9e(()=>()=>{clearTimeout(c.current)},[]);let g=s.style.message(e.message,i),_="",T="";if(s.helpMode==="always"||s.helpMode==="auto"&&o.current)if(o.current=!1,u.length>r)T=`
${s.style.help("(Use arrow keys to reveal more choices)")}`;else _=s.style.help("(Use arrow keys)");let y=hYr({items:u,active:m,renderItem({item:E,isActive:R}){if(C9e.isSeparator(E))return` ${E.separator}`;if(E.disabled){let k=typeof E.disabled==="string"?E.disabled:"(disabled)";return s.style.disabled(`${E.name} ${k}`)}let w=R?s.style.highlight:(k)=>k,H=R?s.icon.cursor:" ";return w(`${H} ${E.name}`)},pageSize:r,loop:n});if(i==="done")return`${l} ${g} ${s.style.answer(h.short)}`;let S=h.description?`
${s.style.description(h.description)}`:"";return`${[l,g,_].filter(Boolean).join(" ")}
${y}${T}${S}${pZi.default.cursorHide}`})});
export {sst,l6d,TYr,pZi,a6d,I0n,mZi};
