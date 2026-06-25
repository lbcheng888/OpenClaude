// @ts-nocheck
import {getHasDevChannels,getAllowedChannels,lt} from "../src/session/0132_sent.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getEffectiveChannelAllowlist,isChannelsPolicyBlocked,d5e} from "./m4178.ts";
import {isChannelsEnabled,wpt} from "../src/telemetry/4178_isChannelsEnabled.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {getMcpConfigsByScope,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {Uw,rH} from "../src/config/4461_operation.ts";
import {zZ,oh} from "./m2600.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function hwl(){let e=mwl.c(30),[t]=fwl.useState(mum),{channels:n,disabled:r,is3P:o,policyBlocked:s,list:i,unmatched:a}=t;if(n.length===0)return null;let l=n.some(pum),c=getHasDevChannels()&&l?"Channels":getHasDevChannels()?"--dangerously-load-development-channels":"--channels";if(o){let m;if(e[0]!==c||e[1]!==i)m=eU.jsxs(Text,{color:"warning",children:[c," ignored (",i,")"]}),e[0]=c,e[1]=i,e[2]=m;else m=e[2];let f;if(e[3]===Symbol.for("react.memo_cache_sentinel"))f=eU.jsx(Text,{dimColor:!0,children:"Channels are not available on third-party providers"}),e[3]=f;else f=e[3];let h;if(e[4]!==m)h=eU.jsxs(Box,{flexDirection:"column",children:[m,f]}),e[4]=m,e[5]=h;else h=e[5];return h}if(r){let m;if(e[6]!==c||e[7]!==i)m=eU.jsxs(Text,{color:"warning",children:[c," ignored (",i,")"]}),e[6]=c,e[7]=i,e[8]=m;else m=e[8];let f;if(e[9]===Symbol.for("react.memo_cache_sentinel"))f=eU.jsx(Text,{dimColor:!0,children:"Channels are not currently available"}),e[9]=f;else f=e[9];let h;if(e[10]!==m)h=eU.jsxs(Box,{flexDirection:"column",children:[m,f]}),e[10]=m,e[11]=h;else h=e[11];return h}if(s){let m;if(e[12]!==c||e[13]!==i)m=eU.jsxs(Text,{color:"warning",children:[c," blocked by org policy (",i,")"]}),e[12]=c,e[13]=i,e[14]=m;else m=e[14];let f,h;if(e[15]===Symbol.for("react.memo_cache_sentinel"))f=eU.jsx(Text,{dimColor:!0,children:"Inbound messages will be silently dropped"}),h=eU.jsx(Text,{dimColor:!0,children:"Have an administrator set channelsEnabled: true in managed settings to enable"}),e[15]=f,e[16]=h;else f=e[15],h=e[16];let g;if(e[17]!==a)g=a.map(dum),e[17]=a,e[18]=g;else g=e[18];let _;if(e[19]!==m||e[20]!==g)_=eU.jsxs(Box,{flexDirection:"column",children:[m,f,h,g]}),e[19]=m,e[20]=g,e[21]=_;else _=e[21];return _}let u;if(e[22]!==c||e[23]!==i)u=eU.jsxs(Text,{dimColor:!0,children:["Channels (experimental) messages from ",i," inject directly in this session \xB7 restart without ",c," to stop"]}),e[22]=c,e[23]=i,e[24]=u;else u=e[24];let d;if(e[25]!==a)d=a.map(uum),e[25]=a,e[26]=d;else d=e[26];let p;if(e[27]!==u||e[28]!==d)p=eU.jsxs(Box,{flexDirection:"column",children:[u,d]}),e[27]=u,e[28]=d,e[29]=p;else p=e[29];return p}
function uum(e){return eU.jsxs(Text,{color:"warning",children:[sGt(e.entry)," \xB7 ",e.why]},`${sGt(e.entry)}:${e.why}`)}
function dum(e){return eU.jsxs(Text,{color:"warning",children:[sGt(e.entry)," \xB7 ",e.why]},`${sGt(e.entry)}:${e.why}`)}
function pum(e){return!e.dev}
function mum(){let e=getAllowedChannels();if(e.length===0)return{channels:e,disabled:!1,is3P:!1,policyBlocked:!1,list:"",unmatched:[]};let t=e.map(sGt).join(", "),n=getSettingsForSource("policySettings"),r=getEffectiveChannelAllowlist(n?.allowedChannelPlugins);return{channels:e,disabled:!isChannelsEnabled(),is3P:getAPIProvider()!=="firstParty",policyBlocked:isChannelsPolicyBlocked(n),list:t,unmatched:fum(e,r)}}
function sGt(e){return e.kind==="plugin"?`plugin:${e.name}@${e.marketplace}`:`server:${e.name}`}
function fum(e,t){let n=["enterprise","user","project","local"],r=new Set;for(let l of n)for(let c of Object.keys(getMcpConfigsByScope(l).servers))r.add(c);let o=Object.keys(Uw().plugins),{entries:s,source:i}=t,a=[];for(let l of e){if(l.kind==="server"){if(!r.has(l.name))a.push({entry:l,why:"no MCP server configured with that name"});if(!l.dev)a.push({entry:l,why:"server: entries need --dangerously-load-development-channels"});continue}if(!zZ(o,`${l.name}@${l.marketplace}`))a.push({entry:l,why:"plugin not installed"});if(!l.dev&&!s.some((c)=>c.plugin===l.name&&c.marketplace===l.marketplace))a.push({entry:l,why:i==="org"?"not on your org's approved channels list":"not on the approved channels allowlist"})}return a}
var mwl,fwl,eU;
var gwl=b(()=>{lt();je();wpt();d5e();KA();Ps();rH();oh();br();mwl=x(tt(),1),fwl=x(et(),1),eU=x(oe(),1)});
export {hwl,uum,dum,pum,mum,sGt,fum,mwl,fwl,eU,gwl};
