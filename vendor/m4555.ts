// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Bs,rA} from "./m2550.ts";
import {et,Ai} from "./m2208.ts";
import {formatTokens,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Ell(e){let t=bll.c(5),{suggestions:n}=e;if(n.length===0)return null;let r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=jP.createElement(Text,{bold:!0},"Suggestions"),t[0]=r;else r=t[0];let o;if(t[1]!==n)o=n.map(UGp),t[1]=n,t[2]=o;else o=t[2];let s;if(t[3]!==o)s=jP.createElement(Box,{flexDirection:"column",marginTop:1},r,o),t[3]=o,t[4]=s;else s=t[4];return s}
function UGp(e,t){return jP.createElement(Box,{key:t,flexDirection:"column",marginTop:t===0?0:1},jP.createElement(Box,null,jP.createElement(Bs,{status:e.severity,withSpace:!0}),jP.createElement(Text,{bold:!0},e.title),e.savingsTokens?jP.createElement(Text,{dimColor:!0}," ",et.arrowRight," save ~",formatTokens(e.savingsTokens)):null),jP.createElement(Box,{marginLeft:2},jP.createElement(Text,{dimColor:!0},e.detail)))}
var bll,jP;
var Cll=b(()=>{Ai();ze();ps();rA();bll=M(rt(),1),jP=M(Te(),1)});
export {Ell,UGp,bll,jP,Cll};
