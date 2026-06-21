// @ts-nocheck
import {Pw,nZ} from "./m2207.ts";
import {YUn,Rao} from "./m3992.ts";
import {isAgentSwarmsEnabled,cb} from "../src/config/3298_isAgentSwarmsEnabled.ts";
import {WUn,rNa,GUn} from "./m3984.ts";
import {PMe,coe,HMe,bR,fp,initKp} from "./m609.ts";
import {qNa,$Na} from "./m3998.ts";
import {ro,b,M} from "../runtime.ts";
import {Dl,eG,mI,lo} from "../src/tools/5190_userPromptCount.ts";
import {dNa,pNa} from "./m3988.ts";
import {gNa,_Na} from "./m3990.ts";
import {Gn,sc} from "./m2455.ts";
import {fce,rct} from "./m3928.ts";
import {VUn,vao} from "./m3986.ts";
import {fNa,ANa} from "./m3989.ts";
import {TNa,SNa} from "./m3991.ts";
import {sNa,iNa} from "./m3985.ts";
import {NNa,BNa} from "./m3997.ts";
import {GNa,WNa} from "./m3999.ts";
import {ONa,LNa} from "../src/tui/3997_addMargin.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function mqe(e){let t=KNa.c(50),{addMargin:n,param:r,verbose:o,planContent:s,isTranscriptMode:i,timestamp:a}=e;if(typeof r.text!=="string"||!r.text||r.text.trim()===Pw)return null;if(s){let c;if(t[0]!==n||t[1]!==s)c=bS.createElement(YUn,{addMargin:n,planContent:s}),t[0]=n,t[1]=s,t[2]=c;else c=t[2];return c}if(isAgentSwarmsEnabled()&&WUn(r.text)){let c;if(t[3]!==n||t[4]!==i||t[5]!==r||t[6]!==o)c=bS.createElement(rNa,{addMargin:n,param:r,verbose:o,isTranscriptMode:i}),t[3]=n,t[4]=i,t[5]=r,t[6]=o,t[7]=c;else c=t[7];return c}if(r.text.startsWith(PMe)||r.text.startsWith(nZ)&&r.text.startsWith(PMe,r.text.indexOf(`
`)+1)){let c;if(t[8]===Symbol.for("react.memo_cache_sentinel"))c=(qNa(),ro($Na)),t[8]=c;else c=t[8];let{UserChannelMessage:u}=c,d;if(t[9]!==n||t[10]!==r)d=bS.createElement(u,{addMargin:n,param:r}),t[9]=n,t[10]=r,t[11]=d;else d=t[11];return d}if(Dl(r.text,coe))return null;if(r.text.includes(`<${HMe}>`))return null;if(r.text.startsWith("<bash-stdout")||r.text.startsWith("<bash-stderr")){let c;if(t[16]!==r.text||t[17]!==o)c=bS.createElement(dNa,{content:r.text,verbose:o}),t[16]=r.text,t[17]=o,t[18]=c;else c=t[18];return c}if(r.text.startsWith("<local-command-stdout")||r.text.startsWith("<local-command-stderr")){let c;if(t[19]!==r.text)c=bS.createElement(gNa,{content:r.text}),t[19]=r.text,t[20]=c;else c=t[20];return c}if(r.text===eG||r.text===mI){let c;if(t[21]===Symbol.for("react.memo_cache_sentinel"))c=bS.createElement(Gn,{height:1},bS.createElement(fce,null)),t[21]=c;else c=t[21];return c}if(r.text.includes("<bash-input>")){let c;if(t[22]!==n||t[23]!==r)c=bS.createElement(VUn,{addMargin:n,param:r}),t[22]=n,t[23]=r,t[24]=c;else c=t[24];return c}if(r.text.includes(`<${bR}>`)){let c;if(t[25]!==n||t[26]!==r)c=bS.createElement(fNa,{addMargin:n,param:r}),t[25]=n,t[26]=r,t[27]=c;else c=t[27];return c}if(r.text.includes("<user-memory-input>")){let c;if(t[28]!==n||t[29]!==r.text)c=bS.createElement(TNa,{addMargin:n,text:r.text}),t[28]=n,t[29]=r.text,t[30]=c;else c=t[30];return c}if(r.text.includes(`<${fp}`)){let c;if(t[31]!==n||t[32]!==r)c=bS.createElement(sNa,{addMargin:n,param:r}),t[31]=n,t[32]=r,t[33]=c;else c=t[33];return c}if(r.text.includes("<mcp-resource-update")||r.text.includes("<mcp-polling-update")){let c;if(t[34]!==n||t[35]!==r)c=bS.createElement(NNa,{addMargin:n,param:r}),t[34]=n,t[35]=r,t[36]=c;else c=t[36];return c}if(r.text.includes("<fork-boilerplate>")){let c;if(t[37]===Symbol.for("react.memo_cache_sentinel"))c=(GNa(),ro(WNa)),t[37]=c;else c=t[37];let{UserForkBoilerplateMessage:u}=c,d;if(t[38]!==n||t[39]!==r)d=bS.createElement(u,{addMargin:n,param:r}),t[38]=n,t[39]=r,t[40]=d;else d=t[40];return d}let l;if(t[45]!==n||t[46]!==i||t[47]!==r||t[48]!==a)l=bS.createElement(ONa,{addMargin:n,param:r,isTranscriptMode:i,timestamp:a}),t[45]=n,t[46]=i,t[47]=r,t[48]=a,t[49]=l;else l=t[49];return l}
var KNa,bS;
var ZUn=b(()=>{initKp();cb();lo();rct();sc();iNa();vao();pNa();ANa();_Na();SNa();Rao();LNa();BNa();GUn();KNa=M(rt(),1),bS=M(Te(),1)});
export {mqe,KNa,bS,ZUn};
