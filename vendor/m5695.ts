// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {vpc,wpc,Kzt} from "./m5673.ts";
import {dd,Xl} from "../src/config/0651_maxBytes.ts";
import {Box} from "./m2432.ts";
import {Ba,I_} from "./m2584.ts";
import {Text} from "./m2433.ts";
import {gd,xw} from "../src/tui/3853_mode.ts";
import {hr} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var Xmc={};
ft(Xmc,{TeleportRepoMismatchDialog:()=>TeleportRepoMismatchDialog});
function TeleportRepoMismatchDialog(e){let t=Jmc.c(18),{targetRepo:n,initialPaths:r,onSelectPath:o,onCancel:s}=e,[i,a]=Trr.useState(r),[l,c]=Trr.useState(null),[u,d]=Trr.useState(!1),p;if(t[0]!==i||t[1]!==s||t[2]!==o||t[3]!==n)p=async(T)=>{if(T==="cancel"){s();return}if(d(!0),c(null),await vpc(T,n)){o(T);return}wpc(n,T);let S=i.filter((E)=>E!==T);a(S),d(!1),c(`${dd(T)} no longer contains the correct repository. Select another path.`)},t[0]=i,t[1]=s,t[2]=o,t[3]=n,t[4]=p;else p=t[4];let m=p,f;if(t[5]!==i){let T;if(t[7]===Symbol.for("react.memo_cache_sentinel"))T={label:"Cancel",value:"cancel"},t[7]=T;else T=t[7];f=[...i.map(ZKm),T],t[5]=i,t[6]=f}else f=t[6];let h=f,g;if(t[8]!==i.length||t[9]!==l||t[10]!==m||t[11]!==h||t[12]!==n||t[13]!==u)g=i.length>0?CP.jsxs(CP.Fragment,{children:[CP.jsxs(Box,{flexDirection:"column",gap:1,children:[CP.jsx(Ba,{error:l}),CP.jsxs(Text,{children:["Open Claude Code in ",CP.jsx(Text,{bold:!0,children:n}),":"]})]}),u?CP.jsxs(Box,{children:[CP.jsx(gd,{}),CP.jsx(Text,{children:" Validating repository\u2026"})]}):CP.jsx(hr,{options:h,onChange:(T)=>void m(T)})]}):CP.jsxs(Box,{flexDirection:"column",gap:1,children:[CP.jsx(Ba,{error:l}),CP.jsxs(Text,{dimColor:!0,children:["Run claude --teleport from a checkout of ",n]})]}),t[8]=i.length,t[9]=l,t[10]=m,t[11]=h,t[12]=n,t[13]=u,t[14]=g;else g=t[14];let _;if(t[15]!==s||t[16]!==g)_=CP.jsx(preInitQueue,{title:"Teleport to Repo",onCancel:s,color:"background",children:g}),t[15]=s,t[16]=g,t[17]=_;else _=t[17];return _}
function ZKm(e){return{label:CP.jsxs(Text,{children:["Use ",CP.jsx(Text,{bold:!0,children:dd(e)})]}),value:e}}
var Jmc,Trr,CP;
var Qmc=b(()=>{je();Xl();Kzt();TS();di();I_();xw();Jmc=x(tt(),1),Trr=x(et(),1),CP=x(oe(),1)});
export {Xmc,TeleportRepoMismatchDialog,ZKm,Jmc,Trr,CP,Qmc};
