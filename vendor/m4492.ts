// @ts-nocheck
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function zqt(e){let t=typeof e==="string"?Buffer.from(e,"utf8"):e,n=Buffer.allocUnsafe(cje+t.length);return n.writeUInt32BE(t.length,0),n.writeUInt8(uje,4),t.copy(n,cje),n}
function FP(e){let t=Buffer.from(Le(e),"utf8"),n=Buffer.allocUnsafe(cje+t.length);return n.writeUInt32BE(t.length,0),n.writeUInt8(Vqt,4),t.copy(n,cje),n}
function s8n(e,t){let n=Buffer.alloc(0),r=!1;return(o)=>{if(r)return;n=n.length===0?o:Buffer.concat([n,o]);while(n.length>=cje){let s=n.readUInt32BE(0);if(s>Mpt){r=!0,t(`frame too large (${s} > ${Mpt})`);return}let i=cje+s;if(n.length<i)return;let a=n.readUInt8(4),l=n.subarray(cje,i);if(n=n.subarray(i),a===uje)e({kind:uje,payload:Buffer.from(l)});else if(a===Vqt){let c;try{c=qt(l.toString("utf8"))}catch{r=!0,t("bad ctrl json");return}e({kind:Vqt,ctrl:c})}else{r=!0,t(`unknown frame kind ${a}`);return}}}}
var uje=0,Vqt=1,Kqt=262144,cje=5,Mpt=1048576,iue=1e4;
var dje=b(()=>{Xt()});
export {zqt,FP,s8n,uje,Vqt,Kqt,cje,Mpt,iue,dje};
