// @ts-nocheck
import {T$e} from "./m3053.ts";
import {b,M} from "../runtime.ts";
import {Fxn} from "./m3054.ts";
import {Ixn,Ynt} from "./m3024.ts";
import {Hxn} from "./m3023.ts";
import {_7i} from "./m3057.ts";
import {y$e} from "./m3052.ts";
import {Txe} from "./m3029.ts";
import {yhe} from "./m3026.ts";
import {lN} from "./m3021.ts";
import {g$e} from "./m3027.ts";
import {ELt} from "./m3028.ts";
import {bLt,Knt,Cxn,gGr,eVi,vxn} from "./m3019.ts";
import {_$e} from "./m3030.ts";
import {h$e} from "./m3022.ts";
import {OGr} from "./m3047.ts";
function trt(e){return!T$e.isSeparator(e)&&!e.disabled}
function R1d(e){return e.map((t)=>{if(T$e.isSeparator(t))return t;if(typeof t==="string")return{value:t,name:t,short:t,disabled:!1};let n=t.name??String(t.value);return{value:t.value,name:n,description:t.description,short:t.short??n,disabled:t.disabled??!1}})}
var BGr,y7i,w1d,$xn;
var T7i=b(()=>{Fxn();Ixn();BGr=M(Hxn(),1),y7i=M(_7i(),1),w1d={icon:{cursor:Ynt.pointer},style:{disabled:(e)=>BGr.default.dim(`- ${e}`),description:(e)=>BGr.default.cyan(e)},helpMode:"auto"};$xn=y$e((e,t)=>{let{loop:n=!0,pageSize:r=7}=e,o=Txe(!0),s=yhe(w1d,e.theme),[i,a]=lN("idle"),l=g$e({status:i,theme:s}),c=Txe(),u=ELt(()=>R1d(e.choices),[e.choices]),d=ELt(()=>{let S=u.findIndex(trt),v=u.findLastIndex(trt);if(S<0)throw new bLt("[select prompt] No selectable choices. All choices are disabled.");return{first:S,last:v}},[u]),p=ELt(()=>{if(!("default"in e))return-1;return u.findIndex((S)=>trt(S)&&S.value===e.default)},[e.default,u]),[m,f]=lN(p===-1?d.first:p),A=u[m];_$e((S,v)=>{if(clearTimeout(c.current),Knt(S))a("done"),t(A.value);else if(Cxn(S)||gGr(S)){if(v.clearLine(0),n||Cxn(S)&&m!==d.first||gGr(S)&&m!==d.last){let R=Cxn(S)?-1:1,k=m;do k=(k+R+u.length)%u.length;while(!trt(u[k]));f(k)}}else if(eVi(S)){v.clearLine(0);let R=Number(S.name)-1,k=u[R];if(k!=null&&trt(k))f(R)}else if(vxn(S))v.clearLine(0);else{let R=v.line.toLowerCase(),k=u.findIndex((x)=>{if(T$e.isSeparator(x)||!trt(x))return!1;return x.name.toLowerCase().startsWith(R)});if(k>=0)f(k);c.current=setTimeout(()=>{v.clearLine(0)},700)}}),h$e(()=>()=>{clearTimeout(c.current)},[]);let h=s.style.message(e.message,i),g="",_="";if(s.helpMode==="always"||s.helpMode==="auto"&&o.current)if(o.current=!1,u.length>r)_=`
${s.style.help("(Use arrow keys to reveal more choices)")}`;else g=s.style.help("(Use arrow keys)");let y=OGr({items:u,active:m,renderItem({item:S,isActive:v}){if(T$e.isSeparator(S))return` ${S.separator}`;if(S.disabled){let x=typeof S.disabled==="string"?S.disabled:"(disabled)";return s.style.disabled(`${S.name} ${x}`)}let R=v?s.style.highlight:(x)=>x,k=v?s.icon.cursor:" ";return R(`${k} ${S.name}`)},pageSize:r,loop:n});if(i==="done")return`${l} ${h} ${s.style.answer(A.short)}`;let T=A.description?`
${s.style.description(A.description)}`:"";return`${[l,h,g].filter(Boolean).join(" ")}
${y}${_}${T}${y7i.default.cursorHide}`})});
export {trt,R1d,BGr,y7i,w1d,$xn,T7i};
