// @ts-nocheck
import {getActiveWorktree,r6e} from "../src/tools/3940_pattern.ts";
import {iL,dye} from "../src/tools/3938_items.ts";
import {KD,i6e} from "../src/tools/3962_tool.ts";
import {hh,ace} from "../src/tools/4441_tabAwareSeparator.ts";
import {BB,$4t} from "../src/tools/4168_url.ts";
import {SIe,OOn} from "../src/tools/3335_todos.ts";
import {QR,Kz,wD} from "../src/tools/2710_allErrors.ts";
import {j0} from "../src/session/2702_resolveLoopFileFire.ts";
import {i5n,I_o} from "../src/tools/4268_type.ts";
import {tmt,o_o} from "../src/tools/4242_task_id.ts";
import {s5n,k_o} from "../src/tools/4265_task_id.ts";
import {N4,F1t} from "../src/tools/2819_server.ts";
import {Y4,ZNt} from "../src/tools/3176_server.ts";
import {Hee,zNt} from "../src/tools/3171_server.ts";
import {ME,nxe} from "../src/tools/4356_content.ts";
import {fb,sce} from "../src/tools/3934_file_path.ts";
import {qq,edt} from "../src/tools/3945_notebook_path.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {OHe,Zk} from "../src/mcp/3159_scope.ts";
import {Gdo,_Y} from "../src/permissions/3988_toolName.ts";
import {ls,fg} from "./m2232.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {Xe,Zs} from "./m2216.ts";
import {Sn,lr} from "./m233.ts";
import {sI,T0} from "../src/mcp/0733_serverName.ts";
import {Or,ss} from "./m2553.ts";
import {Text} from "./m2433.ts";
import {yg,_4} from "./m2581.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function eOl(){return{READ_ONLY:{name:"Read-only tools",toolNames:new Set([getActiveWorktree.name,iL.name,KD.name,hh.name,BB.name,SIe.name,QR,Kz,j0,wD,i5n.name,tmt.name,s5n.name,N4.name,Y4.name,Hee.name])},EDIT:{name:"Edit tools",toolNames:new Set([ME.name,fb.name,qq.name])},EXECUTION:{name:"Execution tools",toolNames:new Set([sl.name,void 0].filter((e)=>e!==void 0))},MCP:{name:"MCP tools",toolNames:new Set,isMcp:!0},OTHER:{name:"Other tools",toolNames:new Set}}}
function Agm(e){let t=new Map;return e.forEach((n)=>{let r=OHe(n);if(r){let o=t.get(r)||[];o.push(n),t.set(r,o)}}),Array.from(t.entries()).map(([n,r])=>({serverName:n,tools:r})).sort((n,r)=>n.serverName.localeCompare(r.serverName))}
function mYn(e){let t=tOl.c(69),{tools:n,initialTools:r,onComplete:o,onCancel:s}=e,i;if(t[0]!==n)i=Gdo({tools:n,isBuiltIn:!1,isAsync:!1}),t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]!==a||t[3]!==r)l=!r||r.includes("*")?a.map(Dgm):r,t[2]=a,t[3]=r,t[4]=l;else l=t[4];let c=l,[u,d]=pYn.useState(c),[p,m]=pYn.useState(0),[f,h]=pYn.useState(!1),g;if(t[5]!==a)g=new Set(a.map(xgm)),t[5]=a,t[6]=g;else g=t[6];let _=g,T;if(t[7]!==u||t[8]!==_){let ce;if(t[10]!==_)ce=(Se)=>_.has(Se),t[10]=_,t[11]=ce;else ce=t[11];T=u.filter(ce),t[7]=u,t[8]=_,t[9]=T}else T=t[9];let y=T,S;if(t[12]!==y)S=new Set(y),t[12]=y,t[13]=S;else S=t[13];let E=S,R=y.length===a.length&&a.length>0,w;if(t[14]===Symbol.for("react.memo_cache_sentinel"))w=(ce)=>{if(!ce)return;d((Se)=>Se.includes(ce)?Se.filter((ie)=>ie!==ce):[...Se,ce])},t[14]=w;else w=t[14];let H=w,k;if(t[15]===Symbol.for("react.memo_cache_sentinel"))k=(ce,Se)=>{d((ie)=>{if(Se){let ae=ce.filter((pe)=>!ie.includes(pe));return[...ie,...ae]}else return ie.filter((ae)=>!ce.includes(ae))})},t[15]=k;else k=t[15];let I=k,D;if(t[16]!==a||t[17]!==o||t[18]!==y)D=()=>{let ce=a.map(Igm),ie=y.length===ce.length&&ce.every((ae)=>y.includes(ae))?void 0:y;o(ie)},t[16]=a,t[17]=o,t[18]=y,t[19]=D;else D=t[19];let O=D,L;if(t[20]!==a){let ce=eOl();L={readOnly:[],edit:[],execution:[],mcp:[],other:[]},a.forEach((Se)=>{if(Zk(Se))L.mcp.push(Se);else if(ce.READ_ONLY.toolNames.has(Se.name))L.readOnly.push(Se);else if(ce.EDIT.toolNames.has(Se.name))L.edit.push(Se);else if(ce.EXECUTION.toolNames.has(Se.name))L.execution.push(Se);else if(Se.name!==ls)L.other.push(Se)}),t[20]=a,t[21]=L}else L=t[21];let P=L,M;if(t[22]!==E)M=(ce)=>{let ie=zn(ce,(ae)=>E.has(ae.name))<ce.length;return()=>{let ae=ce.map(Hgm);I(ae,ie)}},t[22]=E,t[23]=M;else M=t[23];let B=M,N;if(t[24]!==B||t[25]!==a||t[26]!==p||t[27]!==O||t[28]!==R||t[29]!==E||t[30]!==f||t[31]!==P.edit||t[32]!==P.execution||t[33]!==P.mcp||t[34]!==P.other||t[35]!==P.readOnly){N=[],N.push({id:"continue",label:"Continue",action:O,isContinue:!0});let ce;if(t[37]!==a||t[38]!==R)ce=()=>{let _e=a.map(kgm);I(_e,!R)},t[37]=a,t[38]=R,t[39]=ce;else ce=t[39];N.push({id:"bucket-all",label:`${R?Xe.checkboxOn:Xe.checkboxOff} All tools`,action:ce});let Se=eOl();[{id:"bucket-readonly",name:Se.READ_ONLY.name,tools:P.readOnly},{id:"bucket-edit",name:Se.EDIT.name,tools:P.edit},{id:"bucket-execution",name:Se.EXECUTION.name,tools:P.execution},{id:"bucket-mcp",name:Se.MCP.name,tools:P.mcp},{id:"bucket-other",name:Se.OTHER.name,tools:P.other}].forEach((_e)=>{let{id:de,name:ge,tools:Te}=_e;if(Te.length===0)return;let ye=zn(Te,(we)=>E.has(we.name))===Te.length;N.push({id:de,label:`${ye?Xe.checkboxOn:Xe.checkboxOff} ${ge}`,action:B(Te)})});let ae=N.length,pe;if(t[40]!==p||t[41]!==f||t[42]!==ae)pe=()=>{if(h(!f),f&&p>ae)m(ae)},t[40]=p,t[41]=f,t[42]=ae,t[43]=pe;else pe=t[43];N.push({id:"toggle-individual",label:f?"Hide advanced options":"Show advanced options",action:pe,isToggle:!0});let me=Agm(a);if(f){if(me.length>0)N.push({id:"mcp-servers-header",label:"MCP servers:",action:wgm,isHeader:!0}),me.forEach((_e)=>{let{serverName:de,tools:ge}=_e,he=zn(ge,(ye)=>E.has(ye.name))===ge.length;N.push({id:`mcp-server-${de}`,label:`${he?Xe.checkboxOn:Xe.checkboxOff} ${de} (${ge.length} ${Sn(ge.length,"tool")})`,action:()=>{let ye=ge.map(vgm);I(ye,!he)}})}),N.push({id:"tools-header",label:"Individual tools:",action:Rgm,isHeader:!0});a.forEach((_e)=>{let de=_e.name;if(Zk(_e)){let ge=_e.mcpInfo??sI(_e.name);de=ge?`${ge.toolName} (${ge.serverName})`:_e.name}N.push({id:`tool-${_e.name}`,label:`${E.has(_e.name)?Xe.checkboxOn:Xe.checkboxOff} ${de}`,action:()=>H(_e.name)})})}t[24]=B,t[25]=a,t[26]=p,t[27]=O,t[28]=R,t[29]=E,t[30]=f,t[31]=P.edit,t[32]=P.execution,t[33]=P.mcp,t[34]=P.other,t[35]=P.readOnly,t[36]=N}else N=t[36];let F;if(t[44]!==r||t[45]!==s||t[46]!==o)F=()=>{if(s)s();else o(r)},t[44]=r,t[45]=s,t[46]=o,t[47]=F;else F=t[47];let V=F,G;if(t[48]===Symbol.for("react.memo_cache_sentinel"))G={context:"Confirmation"},t[48]=G;else G=t[48];Or("confirm:no",V,G);let z;if(t[49]!==p||t[50]!==N)z=(ce)=>{if(ce.key==="return"){ce.preventDefault();let Se=N[p];if(Se&&!Se.isHeader)Se.action()}else if(ce.key==="up"){ce.preventDefault();let Se=p-1;while(Se>0&&N[Se]?.isHeader)Se--;m(Math.max(0,Se))}else if(ce.key==="down"){ce.preventDefault();let Se=p+1;while(Se<N.length-1&&N[Se]?.isHeader)Se++;m(Math.min(N.length-1,Se))}},t[49]=p,t[50]=N,t[51]=z;else z=t[51];let J=z,K=p===0?"suggestion":void 0,j=p===0,X=p===0?`${Xe.pointer} `:"  ",ee;if(t[52]!==K||t[53]!==j||t[54]!==X)ee=Ine.jsxs(Text,{color:K,bold:j,children:[X,"[ Continue ]"]}),t[52]=K,t[53]=j,t[54]=X,t[55]=ee;else ee=t[55];let te;if(t[56]===Symbol.for("react.memo_cache_sentinel"))te=Ine.jsx(yg,{width:40}),t[56]=te;else te=t[56];let ne;if(t[57]!==N)ne=N.slice(1),t[57]=N,t[58]=ne;else ne=t[58];let se;if(t[59]!==p||t[60]!==ne)se=ne.map((ce,Se)=>{let ie=Se+1===p,ae=ce.isToggle,pe=ce.isHeader;return Ine.jsxs(nOl.Fragment,{children:[ae&&Ine.jsx(yg,{width:40}),pe&&Se>0&&Ine.jsx(Box,{marginTop:1}),Ine.jsxs(Text,{color:pe?void 0:ie?"suggestion":void 0,dimColor:pe,bold:ae&&ie,children:[pe?"":ie?`${Xe.pointer} `:"  ",ae?`[ ${ce.label} ]`:ce.label]})]},ce.id)}),t[59]=p,t[60]=ne,t[61]=se;else se=t[61];let re=R?"All tools selected":`${E.size} of ${a.length} tools selected`,ue;if(t[62]!==re)ue=Ine.jsx(Box,{marginTop:1,flexDirection:"column",children:Ine.jsx(Text,{dimColor:!0,children:re})}),t[62]=re,t[63]=ue;else ue=t[63];let le;if(t[64]!==J||t[65]!==ee||t[66]!==se||t[67]!==ue)le=Ine.jsxs(Box,{flexDirection:"column",marginTop:1,tabIndex:0,autoFocus:!0,onKeyDown:J,children:[ee,te,se,ue]}),t[64]=J,t[65]=ee,t[66]=se,t[67]=ue,t[68]=le;else le=t[68];return le}
function Rgm(){}
function vgm(e){return e.name}
function wgm(){}
function kgm(e){return e.name}
function Hgm(e){return e.name}
function Igm(e){return e.name}
function xgm(e){return e.name}
function Dgm(e){return e.name}
var tOl,nOl,pYn,Ine;
var C0o=b(()=>{Zs();T0();_Y();fg();UB();i6e();nxe();ace();sce();r6e();dye();F1t();edt();zNt();ZNt();k_o();o_o();OOn();$4t();I_o();je();ss();lr();_4();tOl=x(tt(),1),nOl=x(et(),1),pYn=x(et(),1),Ine=x(oe(),1)});
export {eOl,Agm,mYn,Rgm,vgm,wgm,kgm,Hgm,Igm,xgm,Dgm,tOl,nOl,pYn,Ine,C0o};
