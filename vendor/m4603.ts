// @ts-nocheck
import {lB,UNt,B9e,qO} from "../src/mcp/3159_scope.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {cs,kte} from "./m3992.ts";
import {getMcpConfigsByScope,getMcpScopeConflicts,doesEnterpriseMcpConfigExist,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {JS,ez} from "./m2239.ts";
import {Ww,tht} from "./m4601.ts";
import {Link} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function ctm(e){let t=BRo.c(38),{scope:n,parsingErrors:r,warnings:o}=e,s=r.length>0,i=o.length>0;if(!s&&!i)return null;let a;if(t[0]!==n)a=lB(n),t[0]=n,t[1]=a;else a=t[1];let l=a,c;if(t[2]!==r||t[3]!==o)c=new Set([...r,...o].map(utm).filter(Boolean)),t[2]=r,t[3]=o,t[4]=c;else c=t[4];let u=c,d;if(t[5]!==l||t[6]!==u)d=u.size===1?[...u][0]:l,t[5]=l,t[6]=u,t[7]=d;else d=t[7];let p=d,m;if(t[8]!==s||t[9]!==i)m=(s||i)&&Wy.jsxs(Text,{color:s?"error":"warning",children:["[",s?"Failed to parse":"Contains warnings","]"," "]}),t[8]=s,t[9]=i,t[10]=m;else m=t[10];let f;if(t[11]!==n)f=UNt(n),t[11]=n,t[12]=f;else f=t[12];let h;if(t[13]!==f)h=Wy.jsx(Text,{children:f}),t[13]=f,t[14]=h;else h=t[14];let g;if(t[15]!==m||t[16]!==h)g=Wy.jsxs(Box,{children:[m,h]}),t[15]=m,t[16]=h,t[17]=g;else g=t[17];let _;if(t[18]===Symbol.for("react.memo_cache_sentinel"))_=Wy.jsx(Text,{dimColor:!0,children:"Location: "}),t[18]=_;else _=t[18];let T;if(t[19]!==p)T=Wy.jsxs(Box,{children:[_,Wy.jsx(Text,{dimColor:!0,children:p})]}),t[19]=p,t[20]=T;else T=t[20];let y;if(t[21]!==p||t[22]!==r){let w;if(t[24]!==p)w=(H,k)=>{let I=H.mcpErrorMetadata?.serverName,D=H.file&&H.file!==p;return Wy.jsx(cs.Node,{children:Wy.jsxs(Text,{children:[Wy.jsx(Text,{color:"error",children:"[Error]"}),Wy.jsxs(Text,{dimColor:!0,children:[" ",D&&`(${H.file}) `,I&&`[${I}] `,H.path&&H.path!==""?`${H.path}: `:"",H.message]})]})},`error-${k}`)},t[24]=p,t[25]=w;else w=t[25];y=r.map(w),t[21]=p,t[22]=r,t[23]=y}else y=t[23];let S;if(t[26]!==p||t[27]!==o){let w;if(t[29]!==p)w=(H,k)=>{let I=H.mcpErrorMetadata?.serverName,D=H.file&&H.file!==p;return Wy.jsx(cs.Node,{children:Wy.jsxs(Text,{children:[Wy.jsx(Text,{color:"warning",children:"[Warning]"}),Wy.jsxs(Text,{dimColor:!0,children:[" ",D&&`(${H.file}) `,I&&`[${I}] `,H.path&&H.path!==""?`${H.path}: `:"",H.message]})]})},`warning-${k}`)},t[29]=p,t[30]=w;else w=t[30];S=o.map(w),t[26]=p,t[27]=o,t[28]=S}else S=t[28];let E;if(t[31]!==y||t[32]!==S)E=Wy.jsx(Box,{marginLeft:1,children:Wy.jsxs(cs,{variant:"tree",children:[y,S]})}),t[31]=y,t[32]=S,t[33]=E;else E=t[33];let R;if(t[34]!==E||t[35]!==g||t[36]!==T)R=Wy.jsxs(Box,{flexDirection:"column",marginTop:1,children:[g,T,E]}),t[34]=E,t[35]=g,t[36]=T,t[37]=R;else R=t[37];return R}
function utm(e){return e.file}
function nht(){let e=BRo.c(3),t;if(e[0]===Symbol.for("react.memo_cache_sentinel")){let l=[{scope:"user",config:getMcpConfigsByScope("user")},{scope:"project",config:getMcpConfigsByScope("project")},{scope:"local",config:getMcpConfigsByScope("local")},{scope:"enterprise",config:getMcpConfigsByScope("enterprise")}],c=getMcpScopeConflicts(l.filter(_tm).map(gtm));t={scopes:ytm(l,{enterpriseActive:doesEnterpriseMcpConfigExist(),mcpLocked:JS("mcp"),isProjectServerApproved:htm}),conflicts:c},e[0]=t}else t=e[0];let{scopes:n,conflicts:r}=t,o=n.some(ftm),s=r.length>0||n.some(mtm);if(!o&&!s)return null;let i;if(e[1]===Symbol.for("react.memo_cache_sentinel"))i=Wy.jsx(Ww,{title:"MCP config diagnostics",status:o?"error":"warning"}),e[1]=i;else i=e[1];let a;if(e[2]===Symbol.for("react.memo_cache_sentinel"))a=Wy.jsxs(Box,{flexDirection:"column",marginTop:1,marginBottom:1,children:[i,Wy.jsx(Box,{marginTop:1,children:Wy.jsxs(Text,{dimColor:!0,children:["For help configuring MCP servers, see:"," ",Wy.jsx(Link,{url:"https://code.claude.com/docs/en/mcp",children:"https://code.claude.com/docs/en/mcp"})]})}),n.map(ptm),r.length>0&&Wy.jsxs(Box,{flexDirection:"column",marginTop:1,children:[Wy.jsx(Text,{color:"warning",children:"[Conflicting scopes]"}),Wy.jsx(cs,{variant:"tree",children:r.map(dtm)})]})]}),e[2]=a;else a=e[2];return a}
function dtm(e,t){return Wy.jsxs(cs.Group,{children:[Wy.jsx(cs.Node,{color:"warning",children:e.message}),e.suggestion&&Wy.jsx(cs.Node,{dimColor:!0,children:e.suggestion})]},`conflict-${t}`)}
function ptm(e){let{scope:t,config:n}=e;return Wy.jsx(ctm,{scope:t,parsingErrors:OKn(n.errors,"fatal"),warnings:OKn(n.errors,"warning")},t)}
function mtm(e){let{config:t}=e;return OKn(t.errors,"warning").length>0}
function ftm(e){let{config:t}=e;return OKn(t.errors,"fatal").length>0}
function htm(e){return B9e(e)==="approved"}
function gtm(e){return{scope:e.scope,servers:e.config.servers}}
function _tm(e){return e.scope!=="enterprise"}
function OKn(e,t){return e.filter((n)=>n.mcpErrorMetadata?.severity===t)}
function ytm(e,t){let n=(r,o)=>{if(!(o in r.config.servers))return!1;if(r.scope==="project")return t.isProjectServerApproved(o);return!0};return e.map((r,o)=>{let s=r.scope!=="enterprise"&&(t.enterpriseActive||t.mcpLocked),i=e.slice(o+1),a=(l)=>i.some((c)=>n(c,l));return{...r,config:{...r.config,errors:r.config.errors.filter((l)=>{if(l.mcpErrorMetadata?.severity!=="warning")return!0;if(s)return!1;let c=l.mcpErrorMetadata.serverName;return!c||!a(c)})}}})}
var BRo,Wy;
var LKn=b(()=>{KA();qO();ez();je();tht();kte();BRo=x(tt(),1),Wy=x(oe(),1)});
export {ctm,utm,nht,dtm,ptm,mtm,ftm,htm,gtm,_tm,OKn,ytm,BRo,Wy,LKn};
