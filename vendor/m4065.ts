// @ts-nocheck
import {FR,ZQ} from "./m2215.ts";
import {O3n,umo} from "./m4057.ts";
import {isAgentSwarmsEnabled,lb} from "../src/config/3314_isAgentSwarmsEnabled.ts";
import {k3n,w4a,H3n} from "./m4049.ts";
import {v1e,aoe,C1e,xv,bc,Ud} from "./m615.ts";
import {fqa,mqa} from "./m4063.ts";
import {oo,b,x} from "../runtime.ts";
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {L4a,N4a} from "./m4053.ts";
import {q4a,W4a} from "./m4055.ts";
import {J$,Lw} from "./m4308.ts";
import {Yn,Pl} from "./m2465.ts";
import {dce,hdt} from "./m3994.ts";
import {I3n,cmo} from "./m4051.ts";
import {B4a,U4a} from "./m4054.ts";
import {V4a,K4a} from "./m4056.ts";
import {H4a,I4a} from "./m4050.ts";
import {cqa,uqa} from "./m4062.ts";
import {_qa,gqa} from "./m4064.ts";
import {iqa,aqa} from "../src/config/4062_addMargin.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function W6e(e){let t=Tqa.c(50),{addMargin:n,param:r,verbose:o,planContent:s,isTranscriptMode:i,timestamp:a}=e;if(typeof r.text!=="string"||!r.text||r.text.trim()===FR)return null;if(s){let c;if(t[0]!==n||t[1]!==s)c=Y$.jsx(O3n,{addMargin:n,planContent:s}),t[0]=n,t[1]=s,t[2]=c;else c=t[2];return c}if(isAgentSwarmsEnabled()&&k3n(r.text)){let c;if(t[3]!==n||t[4]!==i||t[5]!==r||t[6]!==o)c=Y$.jsx(w4a,{addMargin:n,param:r,verbose:o,isTranscriptMode:i}),t[3]=n,t[4]=i,t[5]=r,t[6]=o,t[7]=c;else c=t[7];return c}if(r.text.startsWith(v1e)||r.text.startsWith(ZQ)&&r.text.startsWith(v1e,r.text.indexOf(`
`)+1)){let c;if(t[8]===Symbol.for("react.memo_cache_sentinel"))c=(fqa(),oo(mqa)),t[8]=c;else c=t[8];let{UserChannelMessage:u}=c,d;if(t[9]!==n||t[10]!==r)d=Y$.jsx(u,{addMargin:n,param:r}),t[9]=n,t[10]=r,t[11]=d;else d=t[11];return d}if(fl(r.text,aoe))return null;if(r.text.includes(`<${C1e}>`))return null;if(r.text.startsWith("<bash-stdout")||r.text.startsWith("<bash-stderr")){let c;if(t[16]!==r.text||t[17]!==o)c=Y$.jsx(L4a,{content:r.text,verbose:o}),t[16]=r.text,t[17]=o,t[18]=c;else c=t[18];return c}if(r.text.startsWith("<local-command-stdout")||r.text.startsWith("<local-command-stderr")){let c;if(t[19]!==r.text)c=Y$.jsx(q4a,{content:r.text}),t[19]=r.text,t[20]=c;else c=t[20];return c}if(r.text===J$||r.text===Lw){let c;if(t[21]===Symbol.for("react.memo_cache_sentinel"))c=Y$.jsx(Yn,{height:1,children:Y$.jsx(dce,{})}),t[21]=c;else c=t[21];return c}if(r.text.includes("<bash-input>")){let c;if(t[22]!==n||t[23]!==r)c=Y$.jsx(I3n,{addMargin:n,param:r}),t[22]=n,t[23]=r,t[24]=c;else c=t[24];return c}if(r.text.includes(`<${xv}>`)){let c;if(t[25]!==n||t[26]!==r)c=Y$.jsx(B4a,{addMargin:n,param:r}),t[25]=n,t[26]=r,t[27]=c;else c=t[27];return c}if(r.text.includes("<user-memory-input>")){let c;if(t[28]!==n||t[29]!==r.text)c=Y$.jsx(V4a,{addMargin:n,text:r.text}),t[28]=n,t[29]=r.text,t[30]=c;else c=t[30];return c}if(r.text.includes(`<${bc}`)){let c;if(t[31]!==n||t[32]!==r)c=Y$.jsx(H4a,{addMargin:n,param:r}),t[31]=n,t[32]=r,t[33]=c;else c=t[33];return c}if(r.text.includes("<mcp-resource-update")||r.text.includes("<mcp-polling-update")){let c;if(t[34]!==n||t[35]!==r)c=Y$.jsx(cqa,{addMargin:n,param:r}),t[34]=n,t[35]=r,t[36]=c;else c=t[36];return c}if(r.text.includes("<fork-boilerplate>")){let c;if(t[37]===Symbol.for("react.memo_cache_sentinel"))c=(_qa(),oo(gqa)),t[37]=c;else c=t[37];let{UserForkBoilerplateMessage:u}=c,d;if(t[38]!==n||t[39]!==r)d=Y$.jsx(u,{addMargin:n,param:r}),t[38]=n,t[39]=r,t[40]=d;else d=t[40];return d}let l;if(t[45]!==n||t[46]!==i||t[47]!==r||t[48]!==a)l=Y$.jsx(iqa,{addMargin:n,param:r,isTranscriptMode:i,timestamp:a}),t[45]=n,t[46]=i,t[47]=r,t[48]=a,t[49]=l;else l=t[49];return l}
var Tqa,Y$;
var F3n=b(()=>{Ud();lb();po();hdt();Pl();I4a();cmo();N4a();U4a();W4a();K4a();umo();aqa();uqa();H3n();Tqa=x(tt(),1),Y$=x(oe(),1)});
export {W6e,Tqa,Y$,F3n};
