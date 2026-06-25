// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {Ner,$Fo} from "./m5392.ts";
import {Iee,uS} from "../src/config/3192_path.ts";
import {pl,Wu} from "./m438.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function Vuc(e){let t=Guc.c(20),{ideSelection:n,mcpClients:r,ideInstallationStatus:o}=e,{addNotification:s,removeNotification:i}=Ci(),{status:a,ideName:l}=Ner(r),c;if(t[0]!==o)c=o?Iee(o?.ideType):!1,t[0]=o,t[1]=c;else c=t[1];let u=c,d=o?.error||u,p=a==="connected"&&n?.source!=="diff"&&(n?.filePath||n?.text&&n.lineCount>0),m=a==="connected"&&!p,f=d&&!u&&!m&&!p,h=d&&u&&!m&&!p,g,_;if(t[2]!==s||t[3]!==l||t[4]!==a||t[5]!==i||t[6]!==f||t[7]!==h)g=()=>{if(pl())return;if(f||h||a!=="disconnected"||!l){i("ide-status-disconnected");return}s({key:"ide-status-disconnected",kind:"warning",text:`${l} disconnected`,color:"error",priority:"medium"})},_=[s,i,a,l,f,h],t[2]=s,t[3]=l,t[4]=a,t[5]=i,t[6]=f,t[7]=h,t[8]=g,t[9]=_;else g=t[8],_=t[9];jnr.useEffect(g,_);let T,y;if(t[10]!==s||t[11]!==i||t[12]!==h)T=()=>{if(pl())return;if(!h){i("ide-status-jetbrains-disconnected");return}s({key:"ide-status-jetbrains-disconnected",kind:"warning",text:"IDE plugin not connected \xB7 /status for info",priority:"medium"})},y=[s,i,h],t[10]=s,t[11]=i,t[12]=h,t[13]=T,t[14]=y;else T=t[13],y=t[14];jnr.useEffect(T,y);let S,E;if(t[15]!==s||t[16]!==i||t[17]!==f)S=()=>{if(pl())return;if(!f){i("ide-status-install-error");return}s({key:"ide-status-install-error",kind:"warning",text:"IDE extension install failed (see /status for info)",color:"error",priority:"medium"})},E=[s,i,f],t[15]=s,t[16]=i,t[17]=f,t[18]=S,t[19]=E;else S=t[18],E=t[19];jnr.useEffect(S,E)}
var Guc,jnr;
var Kuc=b(()=>{fd();uS();Wu();$Fo();Guc=x(tt(),1),jnr=x(et(),1)});
export {Vuc,Guc,jnr,Kuc};
