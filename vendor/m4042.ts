// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {pb,eG} from "./m3827.ts";
import {K$,Jqe} from "./m3915.ts";
import {parseFrameForDisplay,ShutdownRequestMessageSchema,ShutdownApprovedMessageSchema,ShutdownRejectedMessageSchema,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Zxp(e){let t=Jpo.c(5),{request:n}=e,r=`Shutdown request from ${n.from}`,o;if(t[0]!==n.reason)o=n.reason&&EY.jsxs(Text,{children:["Reason: ",n.reason]}),t[0]=n.reason,t[1]=o;else o=t[1];let s;if(t[2]!==r||t[3]!==o)s=EY.jsx(Box,{flexDirection:"column",marginY:1,children:EY.jsx(pb,{color:"warning",title:r,children:o})}),t[2]=r,t[3]=o,t[4]=s;else s=t[4];return s}
function eDp(e){let t=Jpo.c(6),{response:n}=e,r=`Shutdown rejected by ${n.from}`,o;if(t[0]!==n.reason)o=EY.jsx(K$,{children:EY.jsxs(Text,{children:["Reason: ",n.reason]})}),t[0]=n.reason,t[1]=o;else o=t[1];let s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s=EY.jsx(Text,{dimColor:!0,children:"Teammate is continuing to work. You may request shutdown again later."}),t[2]=s;else s=t[2];let i;if(t[3]!==r||t[4]!==o)i=EY.jsx(Box,{flexDirection:"column",marginY:1,children:EY.jsxs(pb,{color:"subtle",title:r,children:[o,s]})}),t[3]=r,t[4]=o,t[5]=i;else i=t[5];return i}
function l4a(e){let t=parseFrameForDisplay(ShutdownRequestMessageSchema(),e);if(t)return EY.jsx(Zxp,{request:t});if(parseFrameForDisplay(ShutdownApprovedMessageSchema(),e))return null;let n=parseFrameForDisplay(ShutdownRejectedMessageSchema(),e);if(n)return EY.jsx(eDp,{response:n});return null}
function c4a(e){let t=parseFrameForDisplay(ShutdownRequestMessageSchema(),e);if(t)return`[Shutdown Request from ${t.from}]${t.reason?` ${t.reason}`:""}`;let n=parseFrameForDisplay(ShutdownApprovedMessageSchema(),e);if(n)return`[Shutdown Approved] ${n.from} is now exiting`;let r=parseFrameForDisplay(ShutdownRejectedMessageSchema(),e);if(r)return`[Shutdown Rejected] ${r.from}: ${r.reason}`;return null}
var Jpo,EY;
var Xpo=b(()=>{je();Pw();Jqe();eG();Jpo=x(tt(),1),EY=x(oe(),1)});
export {Zxp,eDp,l4a,c4a,Jpo,EY,Xpo};
