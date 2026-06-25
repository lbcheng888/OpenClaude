// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {useTheme} from "./m2285.ts";
import {Oo,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {qE,BG} from "./m4563.ts";
import {Text} from "./m2433.ts";
import {color} from "./m2431.ts";
import {ga,rh} from "./m2550.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function RTl(e){let t=CTl.c(42),{useExistingSecret:n,secretName:r,onToggleUseExistingSecret:o,onSecretNameChange:s,onSubmit:i}=e,[a,l]=ATl.useState(0),c=_r(),[u]=useTheme(),d;if(t[0]!==o)d=()=>o(!0),t[0]=o,t[1]=d;else d=t[1];let p=d,m;if(t[2]!==o)m=()=>o(!1),t[2]=o,t[3]=m;else m=t[3];let f=m,h;if(t[4]!==f||t[5]!==p||t[6]!==i)h={"confirm:previous":p,"confirm:next":f,"confirm:yes":i},t[4]=f,t[5]=p,t[6]=i,t[7]=h;else h=t[7];let g;if(t[8]!==n)g={context:"Confirmation",isActive:n},t[8]=n,t[9]=g;else g=t[9];Oo(h,g);let _;if(t[10]!==f||t[11]!==p)_={"confirm:previous":p,"confirm:next":f},t[10]=f,t[11]=p,t[12]=_;else _=t[12];let T=!n,y;if(t[13]!==T)y={context:"Confirmation",isActive:T},t[13]=T,t[14]=y;else y=t[14];Oo(_,y);let S;if(t[15]===Symbol.for("react.memo_cache_sentinel"))S=UC.jsx(Box,{marginBottom:1,children:UC.jsx(qE,{subtitle:"Setup API key secret",children:"Install GitHub App"})}),t[15]=S;else S=t[15];let E;if(t[16]===Symbol.for("react.memo_cache_sentinel"))E=UC.jsx(Box,{marginBottom:1,children:UC.jsx(Text,{color:"warning",children:"ANTHROPIC_API_KEY already exists in repository secrets!"})}),t[16]=E;else E=t[16];let R;if(t[17]===Symbol.for("react.memo_cache_sentinel"))R=UC.jsx(Box,{marginBottom:1,children:UC.jsx(Text,{children:"Would you like to:"})}),t[17]=R;else R=t[17];let w;if(t[18]!==u||t[19]!==n)w=n?color("success",u)("> "):"  ",t[18]=u,t[19]=n,t[20]=w;else w=t[20];let H;if(t[21]!==w)H=UC.jsx(Box,{marginBottom:1,children:UC.jsxs(Text,{children:[w,"Use the existing API key"]})}),t[21]=w,t[22]=H;else H=t[22];let k;if(t[23]!==u||t[24]!==n)k=!n?color("success",u)("> "):"  ",t[23]=u,t[24]=n,t[25]=k;else k=t[25];let I;if(t[26]!==k)I=UC.jsx(Box,{marginBottom:1,children:UC.jsxs(Text,{children:[k,"Create a new secret with a different name"]})}),t[26]=k,t[27]=I;else I=t[27];let D;if(t[28]!==a||t[29]!==s||t[30]!==i||t[31]!==r||t[32]!==c||t[33]!==n)D=!n&&UC.jsxs(UC.Fragment,{children:[UC.jsx(Box,{marginBottom:1,children:UC.jsx(Text,{children:"Enter new secret name (alphanumeric with underscores):"})}),UC.jsx(ga,{value:r,onChange:s,onSubmit:i,focus:!0,placeholder:"e.g., CLAUDE_API_KEY",columns:c.columns,cursorOffset:a,onChangeCursorOffset:l,showCursor:!0})]}),t[28]=a,t[29]=s,t[30]=i,t[31]=r,t[32]=c,t[33]=n,t[34]=D;else D=t[34];let O;if(t[35]!==H||t[36]!==I||t[37]!==D)O=UC.jsxs(Box,{flexDirection:"column",borderStyle:"round",paddingX:1,children:[S,E,R,H,I,D]}),t[35]=H,t[36]=I,t[37]=D,t[38]=O;else O=t[38];let L;if(t[39]===Symbol.for("react.memo_cache_sentinel"))L=UC.jsx(Box,{marginLeft:3,children:UC.jsx(Text,{dimColor:!0,children:UC.jsxs(bn,{children:[UC.jsx(at,{chord:["up","down"],action:"select"}),UC.jsx(at,{chord:"enter",action:"continue"})]})})}),t[39]=L;else L=t[39];let P;if(t[40]!==O)P=UC.jsxs(UC.Fragment,{children:[O,L]}),t[40]=O,t[41]=P;else P=t[41];return P}
var CTl,ATl,UC;
var vTl=b(()=>{Is();BG();Wo();rh();ui();je();ss();CTl=x(tt(),1),ATl=x(et(),1),UC=x(oe(),1)});
export {RTl,CTl,ATl,UC,vTl};
