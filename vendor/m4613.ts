// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {My,pE} from "./m2548.ts";
import {Or,Ts} from "./m2542.ts";
import {xA,jH} from "./m2566.ts";
import {ju,wk} from "../src/tui/2564_current.ts";
import {wf,_I,$P} from "./m4515.ts";
import {qul,jul} from "./m4612.ts";
import {iSo,Lul} from "./m4609.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Link} from "./m2427.ts";
import {Wu,lS} from "./m2571.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Gul(e){let t=Wul.c(44),{onClose:n,commands:r}=e,o=mr(),{rows:s,columns:i}=My(o),a=s,l=o.rows>=BKp,c;if(t[0]!==n)c=()=>n("Help dialog dismissed",{display:"system"}),t[0]=n,t[1]=c;else c=t[1];let u=c,d;if(t[2]===Symbol.for("react.memo_cache_sentinel"))d={context:"Help"},t[2]=d;else d=t[2];Or("help:dismiss",u,d);let p=xA(u),m=ju("help:dismiss","Help","esc"),f=FKp,A;if(t[3]!==r){let P;if(t[5]===Symbol.for("react.memo_cache_sentinel"))P=(L)=>f(L)&&!L.isHidden,t[5]=P;else P=t[5];A=r.filter(P),t[3]=r,t[4]=A}else A=t[4];let h=A,g;if(t[6]===Symbol.for("react.memo_cache_sentinel"))g=[],t[6]=g;else g=t[6];let _=g,y;if(t[7]!==r){let P;if(t[9]===Symbol.for("react.memo_cache_sentinel"))P=(L)=>!f(L)&&!L.isHidden,t[9]=P;else P=t[9];y=r.filter(P),t[7]=r,t[8]=y}else y=t[8];let T=y,S;if(t[10]===Symbol.for("react.memo_cache_sentinel"))S=Kf.createElement(wf,{key:"general",id:"general",title:"General"},Kf.createElement(qul,null)),t[10]=S;else S=t[10];let v;if(t[11]!==h||t[12]!==u||t[13]!==i||t[14]!==T||t[15]!==a){v=[S];let P;if(t[17]!==h||t[18]!==u||t[19]!==i||t[20]!==a)P=Kf.createElement(wf,{key:"commands",id:"commands",title:"Commands"},Kf.createElement(iSo,{commands:h,maxHeight:a,columns:i,title:"Browse default commands",onCancel:u})),t[17]=h,t[18]=u,t[19]=i,t[20]=a,t[21]=P;else P=t[21];v.push(P);let L;if(t[22]!==u||t[23]!==i||t[24]!==T||t[25]!==a)L=Kf.createElement(wf,{key:"custom",id:"custom",title:"Custom commands"},Kf.createElement(iSo,{commands:T,maxHeight:a,columns:i,title:"Browse custom commands",emptyMessage:"No custom commands found",onCancel:u})),t[22]=u,t[23]=i,t[24]=T,t[25]=a,t[26]=L;else L=t[26];v.push(L),t[11]=h,t[12]=u,t[13]=i,t[14]=T,t[15]=a,t[16]=v}else v=t[16];let R;if(t[31]!==v)R=Kf.createElement(_I,{title:"Help",color:"professionalBlue",defaultTab:"general"},v),t[31]=v,t[32]=R;else R=t[32];let k;if(t[33]===Symbol.for("react.memo_cache_sentinel"))k=Kf.createElement(Box,{marginTop:1,flexShrink:0},Kf.createElement(Text,null,"For more help:"," ",Kf.createElement(Link,{url:"https://code.claude.com/docs/en/overview"}))),t[33]=k;else k=t[33];let x;if(t[34]!==l)x=l&&Kf.createElement(Box,{marginTop:1,flexShrink:0},Kf.createElement(Text,{dimColor:!0},"Something else? Use /feedback to report bugs or request features.")),t[34]=l,t[35]=x;else x=t[35];let H;if(t[36]!==m||t[37]!==p.keyName||t[38]!==p.pending)H=Kf.createElement(Box,{marginTop:1,flexShrink:0},Kf.createElement(Text,{dimColor:!0},p.pending?Kf.createElement(Kf.Fragment,null,"Press ",p.keyName," again to exit"):Kf.createElement(Text,{italic:!0},m," to cancel"))),t[36]=m,t[37]=p.keyName,t[38]=p.pending,t[39]=H;else H=t[39];let I;if(t[40]!==H||t[41]!==R||t[42]!==x)I=Kf.createElement(Box,{flexDirection:"column"},Kf.createElement(Wu,{color:"professionalBlue"},R,k,x,H)),t[40]=H,t[41]=R,t[42]=x,t[43]=I;else I=t[43];return I}
function FKp(e){return e.type!=="prompt"||e.source==="builtin"||e.source==="bundled"}
var Wul,Kf,BKp=44;
var Vul=b(()=>{jH();wk();pE();ki();ze();Ts();lS();$P();Lul();jul();Wul=M(rt(),1),Kf=M(Te(),1)});
export {Gul,FKp,Wul,Kf,BKp,Vul};
