// @ts-nocheck
import {T9,$4e} from "../src/tools/3920_pattern.ts";
import {UL,Jge} from "../src/tools/3918_items.ts";
import {I9,Z$t} from "../src/tools/4089_tool.ts";
import {gh,Rce} from "../src/tools/4419_tabAwareSeparator.ts";
import {yU,w9t} from "../src/tools/4155_url.ts";
import {Pke,j0n} from "../src/tools/3319_todos.ts";
import {Kw,Tz,mP} from "../src/tools/2698_allErrors.ts";
import {H0} from "../src/session/2690_resolveLoopFileFire.ts";
import {X3n,Opo} from "../src/tools/4250_type.ts";
import {Zut,cpo} from "../src/tools/4224_task_id.ts";
import {J3n,Dpo} from "../src/tui/4247_task_id.ts";
import {bq,uLt} from "../src/tools/2806_server.ts";
import {Pq,bMt} from "../src/tools/3162_uri.ts";
import {IE,MIe} from "../src/tools/4336_content.ts";
import {_b,wce} from "../src/tools/4066_file_path.ts";
import {k6,rut} from "../src/tools/4070_notebook_path.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {Gxe,Pk} from "../src/mcp/3149_scope.ts";
import {uio,FY} from "../src/permissions/3921_toolName.ts";
import {Cs,Ph} from "./m2224.ts";
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {et,Ai} from "./m2208.ts";
import {Cn,dr} from "./m231.ts";
import {logFeatureBad,scalar} from "../src/mcp/0728_serverName.ts";
import {Or,Ts} from "./m2542.ts";
import {Text} from "./m2423.ts";
import {dg,J4} from "./m2570.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bwl(){return{READ_ONLY:{name:"Read-only tools",toolNames:new Set([T9.name,UL.name,I9.name,gh.name,yU.name,Pke.name,Kw,Tz,H0,mP,X3n.name,Zut.name,J3n.name,bq.name,Pq.name])},EDIT:{name:"Edit tools",toolNames:new Set([IE.name,_b.name,k6.name])},EXECUTION:{name:"Execution tools",toolNames:new Set([Rl.name,void 0].filter((e)=>e!==void 0))},MCP:{name:"MCP tools",toolNames:new Set,isMcp:!0},OTHER:{name:"Other tools",toolNames:new Set}}}
function pam(e){let t=new Map;return e.forEach((n)=>{let r=Gxe(n);if(r){let o=t.get(r)||[];o.push(n),t.set(r,o)}}),Array.from(t.entries()).map(([n,r])=>({serverName:n,tools:r})).sort((n,r)=>n.serverName.localeCompare(r.serverName))}
function CVn(e){let t=Fwl.c(69),{tools:n,initialTools:r,onComplete:o,onCancel:s}=e,i;if(t[0]!==n)i=uio({tools:n,isBuiltIn:!1,isAsync:!1}),t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]!==a||t[3]!==r)l=!r||r.includes("*")?a.map(Tam):r,t[2]=a,t[3]=r,t[4]=l;else l=t[4];let c=l,[u,d]=J9.useState(c),[p,m]=J9.useState(0),[f,A]=J9.useState(!1),h;if(t[5]!==a)h=new Set(a.map(yam)),t[5]=a,t[6]=h;else h=t[6];let g=h,_;if(t[7]!==u||t[8]!==g){let ae;if(t[10]!==g)ae=(he)=>g.has(he),t[10]=g,t[11]=ae;else ae=t[11];_=u.filter(ae),t[7]=u,t[8]=g,t[9]=_}else _=t[9];let y=_,T;if(t[12]!==y)T=new Set(y),t[12]=y,t[13]=T;else T=t[13];let S=T,v=y.length===a.length&&a.length>0,R;if(t[14]===Symbol.for("react.memo_cache_sentinel"))R=(ae)=>{if(!ae)return;d((he)=>he.includes(ae)?he.filter((se)=>se!==ae):[...he,ae])},t[14]=R;else R=t[14];let k=R,x;if(t[15]===Symbol.for("react.memo_cache_sentinel"))x=(ae,he)=>{d((se)=>{if(he){let le=ae.filter((pe)=>!se.includes(pe));return[...se,...le]}else return se.filter((le)=>!ae.includes(le))})},t[15]=x;else x=t[15];let H=x,I;if(t[16]!==a||t[17]!==o||t[18]!==y)I=()=>{let ae=a.map(_am),se=y.length===ae.length&&ae.every((le)=>y.includes(le))?void 0:y;o(se)},t[16]=a,t[17]=o,t[18]=y,t[19]=I;else I=t[19];let P=I,L;if(t[20]!==a){let ae=Bwl();L={readOnly:[],edit:[],execution:[],mcp:[],other:[]},a.forEach((he)=>{if(Pk(he))L.mcp.push(he);else if(ae.READ_ONLY.toolNames.has(he.name))L.readOnly.push(he);else if(ae.EDIT.toolNames.has(he.name))L.edit.push(he);else if(ae.EXECUTION.toolNames.has(he.name))L.execution.push(he);else if(he.name!==Cs)L.other.push(he)}),t[20]=a,t[21]=L}else L=t[21];let D=L,N;if(t[22]!==S)N=(ae)=>{let se=Wn(ae,(le)=>S.has(le.name))<ae.length;return()=>{let le=ae.map(gam);H(le,se)}},t[22]=S,t[23]=N;else N=t[23];let O=N,$;if(t[24]!==O||t[25]!==a||t[26]!==p||t[27]!==P||t[28]!==v||t[29]!==S||t[30]!==f||t[31]!==D.edit||t[32]!==D.execution||t[33]!==D.mcp||t[34]!==D.other||t[35]!==D.readOnly){$=[],$.push({id:"continue",label:"Continue",action:P,isContinue:!0});let ae;if(t[37]!==a||t[38]!==v)ae=()=>{let _e=a.map(ham);H(_e,!v)},t[37]=a,t[38]=v,t[39]=ae;else ae=t[39];$.push({id:"bucket-all",label:`${v?et.checkboxOn:et.checkboxOff} All tools`,action:ae});let he=Bwl();[{id:"bucket-readonly",name:he.READ_ONLY.name,tools:D.readOnly},{id:"bucket-edit",name:he.EDIT.name,tools:D.edit},{id:"bucket-execution",name:he.EXECUTION.name,tools:D.execution},{id:"bucket-mcp",name:he.MCP.name,tools:D.mcp},{id:"bucket-other",name:he.OTHER.name,tools:D.other}].forEach((_e)=>{let{id:fe,name:ie,tools:Ae}=_e;if(Ae.length===0)return;let Ce=Wn(Ae,(xe)=>S.has(xe.name))===Ae.length;$.push({id:fe,label:`${Ce?et.checkboxOn:et.checkboxOff} ${ie}`,action:O(Ae)})});let le=$.length,pe;if(t[40]!==p||t[41]!==f||t[42]!==le)pe=()=>{if(A(!f),f&&p>le)m(le)},t[40]=p,t[41]=f,t[42]=le,t[43]=pe;else pe=t[43];$.push({id:"toggle-individual",label:f?"Hide advanced options":"Show advanced options",action:pe,isToggle:!0});let de=pam(a);if(f){if(de.length>0)$.push({id:"mcp-servers-header",label:"MCP servers:",action:Aam,isHeader:!0}),de.forEach((_e)=>{let{serverName:fe,tools:ie}=_e,ge=Wn(ie,(Ce)=>S.has(Ce.name))===ie.length;$.push({id:`mcp-server-${fe}`,label:`${ge?et.checkboxOn:et.checkboxOff} ${fe} (${ie.length} ${Cn(ie.length,"tool")})`,action:()=>{let Ce=ie.map(fam);H(Ce,!ge)}})}),$.push({id:"tools-header",label:"Individual tools:",action:mam,isHeader:!0});a.forEach((_e)=>{let fe=_e.name;if(Pk(_e)){let ie=_e.mcpInfo??logFeatureBad(_e.name);fe=ie?`${ie.toolName} (${ie.serverName})`:_e.name}$.push({id:`tool-${_e.name}`,label:`${S.has(_e.name)?et.checkboxOn:et.checkboxOff} ${fe}`,action:()=>k(_e.name)})})}t[24]=O,t[25]=a,t[26]=p,t[27]=P,t[28]=v,t[29]=S,t[30]=f,t[31]=D.edit,t[32]=D.execution,t[33]=D.mcp,t[34]=D.other,t[35]=D.readOnly,t[36]=$}else $=t[36];let U;if(t[44]!==r||t[45]!==s||t[46]!==o)U=()=>{if(s)s();else o(r)},t[44]=r,t[45]=s,t[46]=o,t[47]=U;else U=t[47];let W=U,G;if(t[48]===Symbol.for("react.memo_cache_sentinel"))G={context:"Confirmation"},t[48]=G;else G=t[48];Or("confirm:no",W,G);let V;if(t[49]!==p||t[50]!==$)V=(ae)=>{if(ae.key==="return"){ae.preventDefault();let he=$[p];if(he&&!he.isHeader)he.action()}else if(ae.key==="up"){ae.preventDefault();let he=p-1;while(he>0&&$[he]?.isHeader)he--;m(Math.max(0,he))}else if(ae.key==="down"){ae.preventDefault();let he=p+1;while(he<$.length-1&&$[he]?.isHeader)he++;m(Math.min($.length-1,he))}},t[49]=p,t[50]=$,t[51]=V;else V=t[51];let Q=V,K=p===0?"suggestion":void 0,Y=p===0,J=p===0?`${et.pointer} `:"  ",ee;if(t[52]!==K||t[53]!==Y||t[54]!==J)ee=J9.default.createElement(Text,{color:K,bold:Y},J,"[ Continue ]"),t[52]=K,t[53]=Y,t[54]=J,t[55]=ee;else ee=t[55];let te;if(t[56]===Symbol.for("react.memo_cache_sentinel"))te=J9.default.createElement(dg,{width:40}),t[56]=te;else te=t[56];let ne;if(t[57]!==$)ne=$.slice(1),t[57]=$,t[58]=ne;else ne=t[58];let re;if(t[59]!==p||t[60]!==ne)re=ne.map((ae,he)=>{let se=he+1===p,le=ae.isToggle,pe=ae.isHeader;return J9.default.createElement(J9.default.Fragment,{key:ae.id},le&&J9.default.createElement(dg,{width:40}),pe&&he>0&&J9.default.createElement(Box,{marginTop:1}),J9.default.createElement(Text,{color:pe?void 0:se?"suggestion":void 0,dimColor:pe,bold:le&&se},pe?"":se?`${et.pointer} `:"  ",le?`[ ${ae.label} ]`:ae.label))}),t[59]=p,t[60]=ne,t[61]=re;else re=t[61];let oe=v?"All tools selected":`${S.size} of ${a.length} tools selected`,ce;if(t[62]!==oe)ce=J9.default.createElement(Box,{marginTop:1,flexDirection:"column"},J9.default.createElement(Text,{dimColor:!0},oe)),t[62]=oe,t[63]=ce;else ce=t[63];let ue;if(t[64]!==Q||t[65]!==ee||t[66]!==re||t[67]!==ce)ue=J9.default.createElement(Box,{flexDirection:"column",marginTop:1,tabIndex:0,autoFocus:!0,onKeyDown:Q},ee,te,re,ce),t[64]=Q,t[65]=ee,t[66]=re,t[67]=ce,t[68]=ue;else ue=t[68];return ue}
function mam(){}
function fam(e){return e.name}
function Aam(){}
function ham(e){return e.name}
function gam(e){return e.name}
function _am(e){return e.name}
function yam(e){return e.name}
function Tam(e){return e.name}
var Fwl,J9;
var lwo=b(()=>{Ai();scalar();FY();Ph();TU();Z$t();MIe();Rce();wce();$4e();Jge();uLt();rut();bMt();Dpo();cpo();j0n();w9t();Opo();ze();Ts();dr();J4();Fwl=M(rt(),1),J9=M(Te(),1)});
export {Bwl,pam,CVn,mam,fam,Aam,ham,gam,_am,yam,Tam,Fwl,J9,lwo};
