// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {BJn,bOo} from "./m5359.ts";
import {Mee,ab} from "../src/config/3178_path.ts";
import {ec,Dd} from "./m687.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function snc(e){let t=onc.c(20),{ideSelection:n,mcpClients:r,ideInstallationStatus:o}=e,{addNotification:s,removeNotification:i}=Ui(),{status:a,ideName:l}=BJn(r),c;if(t[0]!==o)c=o?Mee(o?.ideType):!1,t[0]=o,t[1]=c;else c=t[1];let u=c,d=o?.error||u,p=a==="connected"&&(n?.filePath||n?.text&&n.lineCount>0),m=a==="connected"&&!p,f=d&&!u&&!m&&!p,A=d&&u&&!m&&!p,h,g;if(t[2]!==s||t[3]!==l||t[4]!==a||t[5]!==i||t[6]!==f||t[7]!==A)h=()=>{if(ec())return;if(f||A||a!=="disconnected"||!l){i("ide-status-disconnected");return}s({key:"ide-status-disconnected",kind:"warning",text:`${l} disconnected`,color:"error",priority:"medium"})},g=[s,i,a,l,f,A],t[2]=s,t[3]=l,t[4]=a,t[5]=i,t[6]=f,t[7]=A,t[8]=h,t[9]=g;else h=t[8],g=t[9];GQn.useEffect(h,g);let _,y;if(t[10]!==s||t[11]!==i||t[12]!==A)_=()=>{if(ec())return;if(!A){i("ide-status-jetbrains-disconnected");return}s({key:"ide-status-jetbrains-disconnected",kind:"warning",text:"IDE plugin not connected \xB7 /status for info",priority:"medium"})},y=[s,i,A],t[10]=s,t[11]=i,t[12]=A,t[13]=_,t[14]=y;else _=t[13],y=t[14];GQn.useEffect(_,y);let T,S;if(t[15]!==s||t[16]!==i||t[17]!==f)T=()=>{if(ec())return;if(!f){i("ide-status-install-error");return}s({key:"ide-status-install-error",kind:"warning",text:"IDE extension install failed (see /status for info)",color:"error",priority:"medium"})},S=[s,i,f],t[15]=s,t[16]=i,t[17]=f,t[18]=T,t[19]=S;else T=t[18],S=t[19];GQn.useEffect(T,S)}
var onc,GQn;
var inc=b(()=>{Ld();ab();Dd();bOo();onc=M(rt(),1),GQn=M(Te(),1)});
export {snc,onc,GQn,inc};
