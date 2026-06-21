// @ts-nocheck
import {st} from "./m5.ts";
import {IHe,fUt} from "./m3815.ts";
import {b,M} from "../runtime.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function gYp(e,t,n,r){let o={};for(let s of e){let i=n[s],l=((t[s]??"").split(/\r\n|\r|\n/,1)[0]??"").trim();if(l===""){if(i?.sensitive===!0&&r?.[s]!==void 0)continue;if(i?.type==="number")continue;if(i?.required!==!0&&r?.[s]===void 0)continue}if(i?.type==="number"){let c=Number(l);o[s]=Number.isNaN(c)?l:c}else if(i?.type==="boolean")o[s]=st(l);else o[s]=l}return o}
function sjt(e){let t=Eml.c(24),{title:n,subtitle:r,configSchema:o,initialValues:s,onSave:i,onCancel:a}=e,l;if(t[0]!==o)l=Object.keys(o),t[0]=o,t[1]=l;else l=t[1];let c=l,u;if(t[2]!==o||t[3]!==c||t[4]!==s)u=()=>{let _={};for(let y of c){let T=o[y]?.sensitive===!0?void 0:s?.[y];_[y]=T===void 0?"":String(T)}return _},t[2]=o,t[3]=c,t[4]=s,t[5]=u;else u=t[5];let[d,p]=J5n.useState(u),m;if(t[6]!==o||t[7]!==c||t[8]!==s)m=c.map((_)=>{let y=o[_],T=y?.sensitive===!0,S=T&&s?.[_]!==void 0;return{type:"text",key:_,label:y?.title||_,required:y?.required===!0&&!S,mask:T?"*":void 0,placeholder:S?"(unchanged)":void 0,hint:()=>y?.description}}),t[6]=o,t[7]=c,t[8]=s,t[9]=m;else m=t[9];let f=m;if(c.length===0)return null;let A;if(t[10]===Symbol.for("react.memo_cache_sentinel"))A=(_,y)=>p((T)=>({...T,[_]:y})),t[10]=A;else A=t[10];let h;if(t[11]!==o||t[12]!==c||t[13]!==s||t[14]!==i||t[15]!==d)h=()=>i(gYp(c,d,o,s)),t[11]=o,t[12]=c,t[13]=s,t[14]=i,t[15]=d,t[16]=h;else h=t[16];let g;if(t[17]!==f||t[18]!==a||t[19]!==r||t[20]!==h||t[21]!==n||t[22]!==d)g=J5n.default.createElement(IHe,{title:n,subtitle:r,fields:f,values:d,onChange:A,onSubmit:h,onCancel:a,submitLabel:"Save configuration"}),t[17]=f,t[18]=a,t[19]=r,t[20]=h,t[21]=n,t[22]=d,t[23]=g;else g=t[23];return g}
var Eml,J5n;
var KSo=b(()=>{fUt();sn();Eml=M(rt(),1),J5n=M(Te(),1)});
export {gYp,sjt,Eml,J5n,KSo};
