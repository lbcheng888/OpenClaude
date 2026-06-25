// @ts-nocheck
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function b8t(e){let t=typeof e==="string"?Buffer.from(e,"utf8"):e,n=Buffer.allocUnsafe(M8e+t.length);return n.writeUInt32BE(t.length,0),n.writeUInt8(N8e,4),t.copy(n,M8e),n}
function gx(e){let t=Buffer.from(TeamDeleteToolName(e),"utf8"),n=Buffer.allocUnsafe(M8e+t.length);return n.writeUInt32BE(t.length,0),n.writeUInt8(T8t,4),t.copy(n,M8e),n}
function RVn(e,t){let n=Buffer.alloc(0),r=!1;return(o)=>{if(r)return;n=n.length===0?o:Buffer.concat([n,o]);while(n.length>=M8e){let s=n.readUInt32BE(0);if(s>Nft){r=!0,t(`frame too large (${s} > ${Nft})`);return}let i=M8e+s;if(n.length<i)return;let a=n.readUInt8(4),l=n.subarray(M8e,i);if(n=n.subarray(i),a===N8e)e({kind:N8e,payload:Buffer.from(l)});else if(a===T8t){let c;try{c=qt(l.toString("utf8"))}catch{r=!0,t("bad ctrl json");return}e({kind:T8t,ctrl:c})}else{r=!0,t(`unknown frame kind ${a}`);return}}}}
var N8e=0,T8t=1,S8t=262144,M8e=5,Nft=1048576,nue=1e4;
var F8e=b(()=>{tn()});
export {b8t,gx,RVn,N8e,T8t,S8t,M8e,Nft,nue,F8e};
