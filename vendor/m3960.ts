// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Nts,sl} from "./m715.ts";
import {l_,dU} from "./m3932.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function IUn(e){let t=p1a.c(7),{param:n,addMargin:r,isTranscriptMode:o,verbose:s}=e,{thinking:i}=n,a=r===void 0?!1:r;if(!i)return null;let l=o||s,c=a?1:0,u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=sqe.default.createElement(Box,{minWidth:2},sqe.default.createElement(Text,{dimColor:!0,italic:!0},Nts)),t[0]=u;else u=t[0];let d;if(t[1]!==l||t[2]!==i)d=sqe.default.createElement(Box,{flexDirection:"column",flexGrow:1},l?sqe.default.createElement(l_,{dimColor:!0},i.trim()):sqe.default.createElement(Text,{dimColor:!0,italic:!0},i.trim().replace(/\s+/g," "))),t[1]=l,t[2]=i,t[3]=d;else d=t[3];let p;if(t[4]!==c||t[5]!==d)p=sqe.default.createElement(Box,{flexDirection:"row",marginTop:c,width:"100%"},u,d),t[4]=c,t[5]=d,t[6]=p;else p=t[6];return p}
var p1a,sqe;
var tao=b(()=>{sl();ze();dU();p1a=M(rt(),1),sqe=M(Te(),1)});
export {IUn,p1a,sqe,tao};
