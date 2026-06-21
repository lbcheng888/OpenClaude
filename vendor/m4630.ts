// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {useTheme} from "./m2274.ts";
import {Wo,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {cR,gJ} from "./m4537.ts";
import {Text} from "./m2423.ts";
import {No} from "./m2421.ts";
import {Pa,rh} from "./m2539.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $dl(e){let t=Udl.c(42),{useExistingSecret:n,secretName:r,onToggleUseExistingSecret:o,onSecretNameChange:s,onSubmit:i}=e,[a,l]=MC.useState(0),c=mr(),[u]=useTheme(),d;if(t[0]!==o)d=()=>o(!0),t[0]=o,t[1]=d;else d=t[1];let p=d,m;if(t[2]!==o)m=()=>o(!1),t[2]=o,t[3]=m;else m=t[3];let f=m,A;if(t[4]!==f||t[5]!==p||t[6]!==i)A={"confirm:previous":p,"confirm:next":f,"confirm:yes":i},t[4]=f,t[5]=p,t[6]=i,t[7]=A;else A=t[7];let h;if(t[8]!==n)h={context:"Confirmation",isActive:n},t[8]=n,t[9]=h;else h=t[9];Wo(A,h);let g;if(t[10]!==f||t[11]!==p)g={"confirm:previous":p,"confirm:next":f},t[10]=f,t[11]=p,t[12]=g;else g=t[12];let _=!n,y;if(t[13]!==_)y={context:"Confirmation",isActive:_},t[13]=_,t[14]=y;else y=t[14];Wo(g,y);let T;if(t[15]===Symbol.for("react.memo_cache_sentinel"))T=MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(cR,{subtitle:"Setup API key secret"},"Install GitHub App")),t[15]=T;else T=t[15];let S;if(t[16]===Symbol.for("react.memo_cache_sentinel"))S=MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(Text,{color:"warning"},"ANTHROPIC_API_KEY already exists in repository secrets!")),t[16]=S;else S=t[16];let v;if(t[17]===Symbol.for("react.memo_cache_sentinel"))v=MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(Text,null,"Would you like to:")),t[17]=v;else v=t[17];let R;if(t[18]!==u||t[19]!==n)R=n?No("success",u)("> "):"  ",t[18]=u,t[19]=n,t[20]=R;else R=t[20];let k;if(t[21]!==R)k=MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(Text,null,R,"Use the existing API key")),t[21]=R,t[22]=k;else k=t[22];let x;if(t[23]!==u||t[24]!==n)x=!n?No("success",u)("> "):"  ",t[23]=u,t[24]=n,t[25]=x;else x=t[25];let H;if(t[26]!==x)H=MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(Text,null,x,"Create a new secret with a different name")),t[26]=x,t[27]=H;else H=t[27];let I;if(t[28]!==a||t[29]!==s||t[30]!==i||t[31]!==r||t[32]!==c||t[33]!==n)I=!n&&MC.default.createElement(MC.default.Fragment,null,MC.default.createElement(Box,{marginBottom:1},MC.default.createElement(Text,null,"Enter new secret name (alphanumeric with underscores):")),MC.default.createElement(Pa,{value:r,onChange:s,onSubmit:i,focus:!0,placeholder:"e.g., CLAUDE_API_KEY",columns:c.columns,cursorOffset:a,onChangeCursorOffset:l,showCursor:!0})),t[28]=a,t[29]=s,t[30]=i,t[31]=r,t[32]=c,t[33]=n,t[34]=I;else I=t[34];let P;if(t[35]!==k||t[36]!==H||t[37]!==I)P=MC.default.createElement(Box,{flexDirection:"column",borderStyle:"round",paddingX:1},T,S,v,k,H,I),t[35]=k,t[36]=H,t[37]=I,t[38]=P;else P=t[38];let L;if(t[39]===Symbol.for("react.memo_cache_sentinel"))L=MC.default.createElement(Box,{marginLeft:3},MC.default.createElement(Text,{dimColor:!0},MC.default.createElement(Tn,null,MC.default.createElement(at,{chord:["up","down"],action:"select"}),MC.default.createElement(at,{chord:"enter",action:"continue"})))),t[39]=L;else L=t[39];let D;if(t[40]!==P)D=MC.default.createElement(MC.default.Fragment,null,P,L),t[40]=P,t[41]=D;else D=t[41];return D}
var Udl,MC;
var qdl=b(()=>{zs();gJ();rs();rh();ki();ze();Ts();Udl=M(rt(),1),MC=M(Te(),1)});
export {$dl,Udl,MC,qdl};
