// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function N0o(e){let t=JLl.c(24),{depCheck:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=Yt(),t[0]=r;else r=t[0];let s=r==="macos",i;if(t[1]!==n.errors)i=n.errors.some(J_m),t[1]=n.errors,t[2]=i;else i=t[2];let a=i,l;if(t[3]!==n.errors)l=n.errors.some(Y_m),t[3]=n.errors,t[4]=l;else l=t[4];let c=l,u;if(t[5]!==n.errors)u=n.errors.some(j_m),t[5]=n.errors,t[6]=u;else u=t[6];let d=u,p=n.warnings.length>0,m;if(t[7]!==c||t[8]!==n.errors||t[9]!==a||t[10]!==p||t[11]!==d){let f=n.errors.filter(z_m),h=s?"brew install ripgrep":"apt install ripgrep",g;if(t[13]===Symbol.for("react.memo_cache_sentinel"))g=s&&T_.jsx(Box,{flexDirection:"column",children:T_.jsxs(Text,{children:["seatbelt: ",T_.jsx(Text,{color:"success",children:"built-in (macOS)"})]})}),t[13]=g;else g=t[13];let _,T;if(t[14]!==a)_=T_.jsxs(Text,{children:["ripgrep (rg):"," ",a?T_.jsx(Text,{color:"error",children:"not found"}):T_.jsx(Text,{color:"success",children:"found"})]}),T=a&&T_.jsxs(Text,{dimColor:!0,children:["  ","\xB7 ",h]}),t[14]=a,t[15]=_,t[16]=T;else _=t[15],T=t[16];let y;if(t[17]!==_||t[18]!==T)y=T_.jsxs(Box,{flexDirection:"column",children:[_,T]}),t[17]=_,t[18]=T,t[19]=y;else y=t[19];let S;if(t[20]!==c||t[21]!==p||t[22]!==d)S=!s&&T_.jsxs(T_.Fragment,{children:[T_.jsxs(Box,{flexDirection:"column",children:[T_.jsxs(Text,{children:["bubblewrap (bwrap):"," ",c?T_.jsx(Text,{color:"error",children:"not installed"}):T_.jsx(Text,{color:"success",children:"installed"})]}),c&&T_.jsxs(Text,{dimColor:!0,children:["  ","\xB7 apt install bubblewrap"]})]}),T_.jsxs(Box,{flexDirection:"column",children:[T_.jsxs(Text,{children:["socat:"," ",d?T_.jsx(Text,{color:"error",children:"not installed"}):T_.jsx(Text,{color:"success",children:"installed"})]}),d&&T_.jsxs(Text,{dimColor:!0,children:["  ","\xB7 apt install socat"]})]}),T_.jsxs(Box,{flexDirection:"column",children:[T_.jsxs(Text,{children:["seccomp filter:"," ",p?T_.jsx(Text,{color:"warning",children:"not installed"}):T_.jsx(Text,{color:"success",children:"installed"}),p&&T_.jsx(Text,{dimColor:!0,children:" (required to block unix domain sockets)"})]}),p&&T_.jsxs(Box,{flexDirection:"column",children:[T_.jsxs(Text,{dimColor:!0,children:["  ","\xB7 npm install -g @anthropic-ai/sandbox-runtime"]}),T_.jsxs(Text,{dimColor:!0,children:["  ","\xB7 or copy vendor/seccomp/* from sandbox-runtime and set"]}),T_.jsxs(Text,{dimColor:!0,children:["    ","sandbox.seccomp.bpfPath and applyPath in settings.json"]})]})]})]}),t[20]=c,t[21]=p,t[22]=d,t[23]=S;else S=t[23];m=T_.jsxs(Box,{flexDirection:"column",gap:1,children:[g,y,S,f.map(K_m)]}),t[7]=c,t[8]=n.errors,t[9]=a,t[10]=p,t[11]=d,t[12]=m}else m=t[12];return m}
function K_m(e){return T_.jsx(Text,{color:"error",children:e},e)}
function z_m(e){return!e.includes("ripgrep")&&!e.includes("bwrap")&&!e.includes("socat")}
function j_m(e){return e.includes("socat")}
function Y_m(e){return e.includes("bwrap")}
function J_m(e){return e.includes("ripgrep")}
var JLl,T_;
var XLl=b(()=>{je();Es();JLl=x(tt(),1),T_=x(oe(),1)});
export {N0o,K_m,z_m,j_m,Y_m,J_m,JLl,T_,XLl};
