// @ts-nocheck
import {b} from "../runtime.ts";
function iMt(e,t){if(t==="*")return!0;let n;try{n=new URL(e)}catch{return!1}let r=t.replaceAll("*",Rrt),o=!1,s;try{s=new URL(r)}catch{let u=r.replace(new RegExp(`:${Rrt}(?=[/?#]|$)`),":0");if(u!==r)try{s=new URL(u),o=!0}catch{}}if(!s){let u=`${n.protocol}//${n.host}${n.pathname}${n.search}`,d=t.replace(/[.+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`^${d.replaceAll("*","[^/]*")}$`).test(u)}if(s.protocol!==`${Rrt}:`&&s.protocol!==n.protocol)return!1;let i=n.hostname.replace(/\.$/,"").toLowerCase(),l=s.hostname.replace(/\.$/,"").toLowerCase().replaceAll(Rrt,"*").replace(/[.+?^${}()|[\]\\]/g,"\\$&").replaceAll("*","[^/]*");if(!new RegExp(`^${l}$`).test(i))return!1;if(s.port===""&&s.hostname.includes(Rrt))o=!0;if(!o&&s.port!==n.port)return!1;if((s.pathname==="/"||s.pathname==="")&&s.search===""&&!r.endsWith("/"))return!0;let c=(s.pathname+s.search).replaceAll(Rrt,"*").replace(/[.+?^${}()|[\]\\]/g,"\\$&").replaceAll("*",".*");return new RegExp(`^${c}$`).test(n.pathname+n.search)}
var lQi,Rrt;
var h7r=b(()=>{lQi=require("crypto"),Rrt=`zzwildcard${lQi.randomBytes(8).toString("hex")}zz`});
export {iMt,lQi,Rrt,h7r};
