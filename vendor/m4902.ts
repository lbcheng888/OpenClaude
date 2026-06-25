// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {b0l,E0l} from "../src/agent/4902_recursive.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Or,ss} from "./m2553.ts";
import {the,oz} from "./m2254.ts";
import {Text} from "./m2433.ts";
import {at,Wo} from "./m2557.ts";
import {bn,Is} from "./m2565.ts";
import {Box} from "./m2432.ts";
import {ga,rh} from "./m2550.ts";
import {Ba,I_} from "./m2584.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Bjn(e){let t=C0l.c(49),{script:n,defaultName:r,onDone:o}=e,{columns:s}=_r(),[i,a]=NWe.useState(r),[l,c]=NWe.useState(r.length),[u,d]=NWe.useState("project"),[p,m]=NWe.useState(!1),[f,h]=NWe.useState(null),[g,_]=NWe.useState(null),T;if(t[0]===Symbol.for("react.memo_cache_sentinel"))T=()=>{h(null),_(null)},t[0]=T;else T=t[0];let y=T,S;if(t[1]===Symbol.for("react.memo_cache_sentinel"))S=(ce)=>{a(ce),y()},t[1]=S;else S=t[1];let E=S,R;if(t[2]!==f||t[3]!==i||t[4]!==o||t[5]!==p||t[6]!==u||t[7]!==n)R=()=>{if(p)return;let ce=i.trim();if(!ce)return;m(!0),_(null),b0l({name:ce,scope:u,script:n,overwrite:f!==null,cwd:isTmuxControlMode()}).then((Se)=>{o(`Dynamic workflow saved to ${Se.path}. Invoke as /${Se.name} or Workflow({name: "${Se.name}"}) in future sessions.`)}).catch((Se)=>{let ie=Se instanceof Error?Se.message:String(Se);if(ie.includes("already exists")){let ae=ie.match(/at (.+?)\. /);h(ae?.[1]??"(unknown path)")}else _(ie);m(!1)})},t[2]=f,t[3]=i,t[4]=o,t[5]=p,t[6]=u,t[7]=n,t[8]=R;else R=t[8];let w=R,H;if(t[9]!==o)H=()=>o(),t[9]=o,t[10]=H;else H=t[10];let k=H,I;if(t[11]===Symbol.for("react.memo_cache_sentinel"))I={context:"Settings",isActive:!0},t[11]=I;else I=t[11];Or("confirm:no",k,I);let D;if(t[12]===Symbol.for("react.memo_cache_sentinel"))D=(ce)=>{if(ce.key==="tab")ce.preventDefault(),d(dfm),y()},t[12]=D;else D=t[12];let O=D,L;if(t[13]!==i)L=the(i.trim()||"workflow"),t[13]=i,t[14]=L;else L=t[14];let P=L,M=u==="project"?`.claude/workflows/${P}.js`:`~/.claude/workflows/${P}.js`,B=u==="project"?"Project":"User",N;if(t[15]!==B||t[16]!==M)N=kx.jsxs(Text,{dimColor:!0,children:[B," scope \xB7 ",M]}),t[15]=B,t[16]=M,t[17]=N;else N=t[17];let F=f?"overwrite":"save",V;if(t[18]!==F)V=kx.jsx(at,{chord:"enter",action:F}),t[18]=F,t[19]=V;else V=t[19];let G,z;if(t[20]===Symbol.for("react.memo_cache_sentinel"))G=kx.jsx(at,{chord:"tab",action:"toggle scope"}),z=kx.jsx(at,{chord:"escape",action:"cancel"}),t[20]=G,t[21]=z;else G=t[20],z=t[21];let J;if(t[22]!==V)J=kx.jsxs(bn,{children:[V,G,z]}),t[22]=V,t[23]=J;else J=t[23];let K;if(t[24]===Symbol.for("react.memo_cache_sentinel"))K=kx.jsx(Text,{children:"Save as:"}),t[24]=K;else K=t[24];let j;if(t[25]===Symbol.for("react.memo_cache_sentinel"))j=kx.jsx(Text,{children:">"}),t[25]=j;else j=t[25];let X=!p,ee=!p,te;if(t[26]!==s||t[27]!==l||t[28]!==w||t[29]!==i||t[30]!==X||t[31]!==ee)te=kx.jsxs(Box,{flexDirection:"row",gap:1,marginTop:1,children:[j,kx.jsx(ga,{value:i,onChange:E,onSubmit:w,focus:X,showCursor:ee,columns:s,cursorOffset:l,onChangeCursorOffset:c})]}),t[26]=s,t[27]=l,t[28]=w,t[29]=i,t[30]=X,t[31]=ee,t[32]=te;else te=t[32];let ne;if(t[33]!==f)ne=f&&kx.jsx(Box,{marginTop:1,children:kx.jsxs(Text,{color:"warning",children:[f," already exists. Press Enter again to overwrite, or change the name."]})}),t[33]=f,t[34]=ne;else ne=t[34];let se;if(t[35]!==g)se=g&&kx.jsx(Box,{marginTop:1,children:kx.jsx(Ba,{error:g})}),t[35]=g,t[36]=se;else se=t[36];let re;if(t[37]!==p)re=p&&kx.jsx(Box,{marginTop:1,children:kx.jsx(Text,{dimColor:!0,children:"Saving\u2026"})}),t[37]=p,t[38]=re;else re=t[38];let ue;if(t[39]!==te||t[40]!==ne||t[41]!==se||t[42]!==re)ue=kx.jsxs(Box,{flexDirection:"column",children:[K,te,ne,se,re]}),t[39]=te,t[40]=ne,t[41]=se,t[42]=re,t[43]=ue;else ue=t[43];let le;if(t[44]!==k||t[45]!==J||t[46]!==ue||t[47]!==N)le=kx.jsx(Box,{flexDirection:"column",tabIndex:0,autoFocus:!0,onKeyDown:O,children:kx.jsx(preInitQueue,{title:"Save dynamic workflow",subtitle:N,onCancel:k,color:"permission",isCancelActive:!1,inputGuide:J,children:ue})}),t[44]=k,t[45]=J,t[46]=ue,t[47]=N,t[48]=le;else le=t[48];return le}
function dfm(e){return e==="project"?"user":"project"}
var C0l,NWe,kx;
var IIo=b(()=>{ui();je();ss();E0l();oz();Po();Is();di();I_();Wo();rh();C0l=x(tt(),1),NWe=x(et(),1),kx=x(oe(),1)});
export {Bjn,dfm,C0l,NWe,kx,IIo};
