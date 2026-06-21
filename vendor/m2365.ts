// @ts-nocheck
import {Vve,DIt} from "./m2343.ts";
import {KT,KI} from "./m234.ts";
import {I4,KO,hZ} from "./m2267.ts";
import {uZe} from "./m2363.ts";
import {tn,Hc} from "./m235.ts";
import {UK} from "./m2357.ts";
import {F1} from "./m2356.ts";
import {nAe} from "./m2358.ts";
import {b} from "../runtime.ts";
import {dZe} from "./m2364.ts";
function Xbi(e){let t=Vve(),n=[...t.feed(e),...t.flush()],r=[];for(let o of n){if(o.type==="text"){for(let{segment:i}of KT().segment(o.value))r.push({type:"char",value:i});continue}let s=o.value;if(s.charCodeAt(1)===I4.CSI&&s.endsWith("m")){for(let i of uZe(s))if(i.type==="ansi")r.push(i)}else if(s.startsWith("\x1B]8;")&&(s.endsWith(KO)||s.endsWith(Jbi))){let i=s.endsWith(Jbi)?s.slice(0,-2)+KO:s;r.push({type:"ansi",code:i,endCode:Dsd})}}return r}
function Psd(e){return e.code===e.endCode}
function pZe(e){return e.filter((t)=>!Psd(t))}
function U1(e,t,n){let r=Xbi(e),o=[],s=0,i="",a=!1;for(let c of r){let u=c.type==="ansi"?0:tn(c.value);if(n!==void 0&&s>=n){if(c.type==="ansi"||u>0||!a)break}if(c.type==="ansi"){if(o.push(c),a)i+=c.code}else{if(!a&&s>=t){if(t>0&&u===0)continue;a=!0,o=pZe(UK(o)),i=F1(o)}if(a)i+=c.value;s+=u}}let l=pZe(UK(o));return i+=F1(nAe(l)),i}
function Qbi(e,t){let n=Xbi(e),r=0,o=[],s="",i=!1,a=!1,l=[],c="",u=!1;for(let m of n){let f=m.type==="ansi"?0:tn(m.value);if(!a)if(r>=t&&(m.type==="ansi"||f>0||!i))a=!0;else if(m.type==="ansi"){if(o.push(m),i)s+=m.code}else{if(!i)i=!0,o=pZe(UK(o)),s=F1(o);s+=m.value}if(m.type==="ansi"){if(l.push(m),u)c+=m.code}else{if(!u&&r>=t){if(!(t>0&&f===0))u=!0,l=pZe(UK(l)),c=F1(l)}if(u)c+=m.value}if(m.type!=="ansi")r+=f}let d=pZe(UK(o));s+=F1(nAe(d));let p=pZe(UK(l));return c+=F1(nAe(p)),[s,c]}
var Jbi="\x1B\\",Dsd;
var Yve=b(()=>{dZe();Hc();hZ();DIt();KI();Dsd=`\x1B]8;;${KO}`});
export {Xbi,Psd,pZe,U1,Qbi,Jbi,Dsd,Yve};
