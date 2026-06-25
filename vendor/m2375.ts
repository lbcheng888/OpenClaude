// @ts-nocheck
import {xve,iPt} from "./m2353.ts";
import {$T,p0} from "./m236.ts";
import {Q3,uO,fsModule} from "./m2277.ts";
import {utt} from "./m2373.ts";
import {sn,mc} from "./m237.ts";
import {hz} from "./m2367.ts";
import {QM} from "./m2366.ts";
import {phe} from "./m2368.ts";
import {b} from "../runtime.ts";
import {dtt} from "./m2374.ts";
function aHi(e){let t=xve(),n=[...t.feed(e),...t.flush()],r=[];for(let o of n){if(o.type==="text"){for(let{segment:i}of $T().segment(o.value))r.push({type:"char",value:i});continue}let s=o.value;if(s.charCodeAt(1)===Q3.CSI&&s.endsWith("m")){for(let i of utt(s))if(i.type==="ansi")r.push(i)}else if(s.startsWith("\x1B]8;")&&(s.endsWith(uO)||s.endsWith(iHi))){let i=s.endsWith(iHi)?s.slice(0,-2)+uO:s;r.push({type:"ansi",code:i,endCode:rgd})}}return r}
function ogd(e){return e.code===e.endCode}
function ptt(e){return e.filter((t)=>!ogd(t))}
function ZM(e,t,n){let r=aHi(e),o=[],s=0,i="",a=!1;for(let c of r){let u=c.type==="ansi"?0:sn(c.value);if(n!==void 0&&s>=n){if(c.type==="ansi"||u>0||!a)break}if(c.type==="ansi"){if(o.push(c),a)i+=c.code}else{if(!a&&s>=t){if(t>0&&u===0)continue;a=!0,o=ptt(hz(o)),i=QM(o)}if(a)i+=c.value;s+=u}}let l=ptt(hz(o));return i+=QM(phe(l)),i}
function lHi(e,t){let n=aHi(e),r=0,o=[],s="",i=!1,a=!1,l=[],c="",u=!1;for(let m of n){let f=m.type==="ansi"?0:sn(m.value);if(!a)if(r>=t&&(m.type==="ansi"||f>0||!i))a=!0;else if(m.type==="ansi"){if(o.push(m),i)s+=m.code}else{if(!i)i=!0,o=ptt(hz(o)),s=QM(o);s+=m.value}if(m.type==="ansi"){if(l.push(m),u)c+=m.code}else{if(!u&&r>=t){if(!(t>0&&f===0))u=!0,l=ptt(hz(l)),c=QM(l)}if(u)c+=m.value}if(m.type!=="ansi")r+=f}let d=ptt(hz(o));s+=QM(phe(d));let p=ptt(hz(l));return c+=QM(phe(p)),[s,c]}
var iHi="\x1B\\",rgd;
var Ove=b(()=>{dtt();mc();fsModule();iPt();p0();rgd=`\x1B]8;;${uO}`});
export {aHi,ogd,ptt,ZM,lHi,iHi,rgd,Ove};
