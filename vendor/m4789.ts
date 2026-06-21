// @ts-nocheck
import {getHasDevChannels,getAllowedChannels,lt} from "../src/session/0131_sent.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getEffectiveChannelAllowlist,isChannelsPolicyBlocked,Gqe} from "./m4165.ts";
import {isChannelsEnabled,xut} from "../src/telemetry/4165_isChannelsEnabled.ts";
import {getAPIProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {getMcpConfigsByScope,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {vx,Mk} from "../src/config/4439_operation.ts";
import {JZ,sh} from "./m2589.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function hyl(){let e=fyl.c(30),[t]=Ayl.useState(etm),{channels:n,disabled:r,is3P:o,policyBlocked:s,list:i,unmatched:a}=t;if(n.length===0)return null;let l=n.some(Zem),c=getHasDevChannels()&&l?"Channels":getHasDevChannels()?"--dangerously-load-development-channels":"--channels";if(o){let m;if(e[0]!==c||e[1]!==i)m=wS.createElement(Text,{color:"warning"},c," ignored (",i,")"),e[0]=c,e[1]=i,e[2]=m;else m=e[2];let f;if(e[3]===Symbol.for("react.memo_cache_sentinel"))f=wS.createElement(Text,{dimColor:!0},"Channels are not available on third-party providers"),e[3]=f;else f=e[3];let A;if(e[4]!==m)A=wS.createElement(Box,{flexDirection:"column"},m,f),e[4]=m,e[5]=A;else A=e[5];return A}if(r){let m;if(e[6]!==c||e[7]!==i)m=wS.createElement(Text,{color:"warning"},c," ignored (",i,")"),e[6]=c,e[7]=i,e[8]=m;else m=e[8];let f;if(e[9]===Symbol.for("react.memo_cache_sentinel"))f=wS.createElement(Text,{dimColor:!0},"Channels are not currently available"),e[9]=f;else f=e[9];let A;if(e[10]!==m)A=wS.createElement(Box,{flexDirection:"column"},m,f),e[10]=m,e[11]=A;else A=e[11];return A}if(s){let m;if(e[12]!==c||e[13]!==i)m=wS.createElement(Text,{color:"warning"},c," blocked by org policy (",i,")"),e[12]=c,e[13]=i,e[14]=m;else m=e[14];let f,A;if(e[15]===Symbol.for("react.memo_cache_sentinel"))f=wS.createElement(Text,{dimColor:!0},"Inbound messages will be silently dropped"),A=wS.createElement(Text,{dimColor:!0},"Have an administrator set channelsEnabled: true in managed settings to enable"),e[15]=f,e[16]=A;else f=e[15],A=e[16];let h;if(e[17]!==a)h=a.map(Qem),e[17]=a,e[18]=h;else h=e[18];let g;if(e[19]!==m||e[20]!==h)g=wS.createElement(Box,{flexDirection:"column"},m,f,A,h),e[19]=m,e[20]=h,e[21]=g;else g=e[21];return g}let u;if(e[22]!==c||e[23]!==i)u=wS.createElement(Text,{dimColor:!0},"Channels (experimental) messages from ",i," inject directly in this session \xB7 restart without ",c," to stop"),e[22]=c,e[23]=i,e[24]=u;else u=e[24];let d;if(e[25]!==a)d=a.map(Xem),e[25]=a,e[26]=d;else d=e[26];let p;if(e[27]!==u||e[28]!==d)p=wS.createElement(Box,{flexDirection:"column"},u,d),e[27]=u,e[28]=d,e[29]=p;else p=e[29];return p}
function Xem(e){return wS.createElement(Text,{key:`${$jt(e.entry)}:${e.why}`,color:"warning"},$jt(e.entry)," \xB7 ",e.why)}
function Qem(e){return wS.createElement(Text,{key:`${$jt(e.entry)}:${e.why}`,color:"warning"},$jt(e.entry)," \xB7 ",e.why)}
function Zem(e){return!e.dev}
function etm(){let e=getAllowedChannels();if(e.length===0)return{channels:e,disabled:!1,is3P:!1,policyBlocked:!1,list:"",unmatched:[]};let t=e.map($jt).join(", "),n=getSettingsForSource("policySettings"),r=getEffectiveChannelAllowlist(n?.allowedChannelPlugins);return{channels:e,disabled:!isChannelsEnabled(),is3P:getAPIProvider()!=="firstParty",policyBlocked:isChannelsPolicyBlocked(n),list:t,unmatched:ttm(e,r)}}
function $jt(e){return e.kind==="plugin"?`plugin:${e.name}@${e.marketplace}`:`server:${e.name}`}
function ttm(e,t){let n=["enterprise","user","project","local"],r=new Set;for(let l of n)for(let c of Object.keys(getMcpConfigsByScope(l).servers))r.add(c);let o=Object.keys(vx().plugins),{entries:s,source:i}=t,a=[];for(let l of e){if(l.kind==="server"){if(!r.has(l.name))a.push({entry:l,why:"no MCP server configured with that name"});if(!l.dev)a.push({entry:l,why:"server: entries need --dangerously-load-development-channels"});continue}if(!JZ(o,`${l.name}@${l.marketplace}`))a.push({entry:l,why:"plugin not installed"});if(!l.dev&&!s.some((c)=>c.plugin===l.name&&c.marketplace===l.marketplace))a.push({entry:l,why:i==="org"?"not on your org's approved channels list":"not on the approved channels allowlist"})}return a}
var fyl,wS,Ayl;
var gyl=b(()=>{lt();ze();xut();Gqe();px();li();Mk();sh();yr();fyl=M(rt(),1),wS=M(Te(),1),Ayl=M(Te(),1)});
export {hyl,Xem,Qem,Zem,etm,$jt,ttm,fyl,wS,Ayl,gyl};
