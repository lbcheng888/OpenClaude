// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {HE,JW} from "./m3976.ts";
import {b9,lqe} from "./m3975.ts";
import {parseFrameForDisplay,ShutdownRequestMessageSchema,ShutdownApprovedMessageSchema,ShutdownRejectedMessageSchema,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function sEp(e){let t=pao.c(5),{request:n}=e,r=`Shutdown request from ${n.from}`,o;if(t[0]!==n.reason)o=n.reason&&pI.createElement(Text,null,"Reason: ",n.reason),t[0]=n.reason,t[1]=o;else o=t[1];let s;if(t[2]!==r||t[3]!==o)s=pI.createElement(Box,{flexDirection:"column",marginY:1},pI.createElement(HE,{color:"warning",title:r},o)),t[2]=r,t[3]=o,t[4]=s;else s=t[4];return s}
function iEp(e){let t=pao.c(6),{response:n}=e,r=`Shutdown rejected by ${n.from}`,o;if(t[0]!==n.reason)o=pI.createElement(b9,null,pI.createElement(Text,null,"Reason: ",n.reason)),t[0]=n.reason,t[1]=o;else o=t[1];let s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s=pI.createElement(Text,{dimColor:!0},"Teammate is continuing to work. You may request shutdown again later."),t[2]=s;else s=t[2];let i;if(t[3]!==r||t[4]!==o)i=pI.createElement(Box,{flexDirection:"column",marginY:1},pI.createElement(HE,{color:"subtle",title:r},o,s)),t[3]=r,t[4]=o,t[5]=i;else i=t[5];return i}
function $1a(e){let t=parseFrameForDisplay(ShutdownRequestMessageSchema(),e);if(t)return pI.createElement(sEp,{request:t});if(parseFrameForDisplay(ShutdownApprovedMessageSchema(),e))return null;let n=parseFrameForDisplay(ShutdownRejectedMessageSchema(),e);if(n)return pI.createElement(iEp,{response:n});return null}
function q1a(e){let t=parseFrameForDisplay(ShutdownRequestMessageSchema(),e);if(t)return`[Shutdown Request from ${t.from}]${t.reason?` ${t.reason}`:""}`;let n=parseFrameForDisplay(ShutdownApprovedMessageSchema(),e);if(n)return`[Shutdown Approved] ${n.from} is now exiting`;let r=parseFrameForDisplay(ShutdownRejectedMessageSchema(),e);if(r)return`[Shutdown Rejected] ${r.from}: ${r.reason}`;return null}
var pao,pI;
var mao=b(()=>{ze();Tx();lqe();JW();pao=M(rt(),1),pI=M(Te(),1)});
export {sEp,iEp,$1a,q1a,pao,pI,mao};
