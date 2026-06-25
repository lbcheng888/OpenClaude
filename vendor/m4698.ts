// @ts-nocheck
import {nt} from "./m127.ts";
import {T0e,G$t} from "./m3833.ts";
import {b,x} from "../runtime.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Tom(e,t,n,r){let o={};for(let s of e){let i=n[s],l=((t[s]??"").split(/\r\n|\r|\n/,1)[0]??"").trim();if(l===""){if(i?.sensitive===!0&&r?.[s]!==void 0)continue;if(i?.type==="number")continue;if(i?.required!==!0&&r?.[s]===void 0)continue}if(i?.type==="number"){let c=Number(l);o[s]=Number.isNaN(c)?l:c}else if(i?.type==="boolean")o[s]=nt(l);else o[s]=l}return o}
function vWt(e){let t=mbl.c(24),{title:n,subtitle:r,configSchema:o,initialValues:s,onSave:i,onCancel:a}=e,l;if(t[0]!==o)l=Object.keys(o),t[0]=o,t[1]=l;else l=t[1];let c=l,u;if(t[2]!==o||t[3]!==c||t[4]!==s)u=()=>{let T={};for(let y of c){let S=o[y]?.sensitive===!0?void 0:s?.[y];T[y]=S===void 0?"":String(S)}return T},t[2]=o,t[3]=c,t[4]=s,t[5]=u;else u=t[5];let[d,p]=fbl.useState(u),m;if(t[6]!==o||t[7]!==c||t[8]!==s)m=c.map((T)=>{let y=o[T],S=y?.sensitive===!0,E=S&&s?.[T]!==void 0;return{type:"text",key:T,label:y?.title||T,required:y?.required===!0&&!E,mask:S?"*":void 0,placeholder:E?"(unchanged)":void 0,hint:()=>y?.description}}),t[6]=o,t[7]=c,t[8]=s,t[9]=m;else m=t[9];let f=m;if(c.length===0)return null;let h;if(t[10]===Symbol.for("react.memo_cache_sentinel"))h=(T,y)=>p((S)=>({...S,[T]:y})),t[10]=h;else h=t[10];let g;if(t[11]!==o||t[12]!==c||t[13]!==s||t[14]!==i||t[15]!==d)g=()=>i(Tom(c,d,o,s)),t[11]=o,t[12]=c,t[13]=s,t[14]=i,t[15]=d,t[16]=g;else g=t[16];let _;if(t[17]!==f||t[18]!==a||t[19]!==r||t[20]!==g||t[21]!==n||t[22]!==d)_=hbl.jsx(T0e,{title:n,subtitle:r,fields:f,values:d,onChange:h,onSubmit:g,onCancel:a,submitLabel:"Save configuration"}),t[17]=f,t[18]=a,t[19]=r,t[20]=g,t[21]=n,t[22]=d,t[23]=_;else _=t[23];return _}
var mbl,fbl,hbl;
var awo=b(()=>{G$t();dn();mbl=x(tt(),1),fbl=x(et(),1),hbl=x(oe(),1)});
export {Tom,vWt,mbl,fbl,hbl,awo};
