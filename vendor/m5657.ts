// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Brc,Frc,gVt} from "./m5636.ts";
import {Id,mc} from "../src/config/0645_maxBytes.ts";
import {Box} from "./m2422.ts";
import {nl,v_} from "./m2573.ts";
import {Text} from "./m2423.ts";
import {tp,_x} from "../src/tui/3835_mode.ts";
import {pr} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var lsc={};
isFullscreenWithTTY(lsc,{TeleportRepoMismatchDialog:()=>TeleportRepoMismatchDialog});
function TeleportRepoMismatchDialog(e){let t=asc.c(18),{targetRepo:n,initialPaths:r,onSelectPath:o,onCancel:s}=e,[i,a]=HI.useState(r),[l,c]=HI.useState(null),[u,d]=HI.useState(!1),p;if(t[0]!==i||t[1]!==s||t[2]!==o||t[3]!==n)p=async(_)=>{if(_==="cancel"){s();return}if(d(!0),c(null),await Brc(_,n)){o(_);return}Frc(n,_);let T=i.filter((S)=>S!==_);a(T),d(!1),c(`${Id(_)} no longer contains the correct repository. Select another path.`)},t[0]=i,t[1]=s,t[2]=o,t[3]=n,t[4]=p;else p=t[4];let m=p,f;if(t[5]!==i){let _;if(t[7]===Symbol.for("react.memo_cache_sentinel"))_={label:"Cancel",value:"cancel"},t[7]=_;else _=t[7];f=[...i.map(w3m),_],t[5]=i,t[6]=f}else f=t[6];let A=f,h;if(t[8]!==i.length||t[9]!==l||t[10]!==m||t[11]!==A||t[12]!==n||t[13]!==u)h=i.length>0?HI.default.createElement(HI.default.Fragment,null,HI.default.createElement(Box,{flexDirection:"column",gap:1},HI.default.createElement(nl,{error:l}),HI.default.createElement(Text,null,"Open Claude Code in ",HI.default.createElement(Text,{bold:!0},n),":")),u?HI.default.createElement(Box,null,HI.default.createElement(tp,null),HI.default.createElement(Text,null," Validating repository\u2026")):HI.default.createElement(pr,{options:A,onChange:(_)=>void m(_)})):HI.default.createElement(Box,{flexDirection:"column",gap:1},HI.default.createElement(nl,{error:l}),HI.default.createElement(Text,{dimColor:!0},"Run claude --teleport from a checkout of ",n)),t[8]=i.length,t[9]=l,t[10]=m,t[11]=A,t[12]=n,t[13]=u,t[14]=h;else h=t[14];let g;if(t[15]!==s||t[16]!==h)g=HI.default.createElement(Kn,{title:"Teleport to Repo",onCancel:s,color:"background"},h),t[15]=s,t[16]=h,t[17]=g;else g=t[17];return g}
function w3m(e){return{label:HI.default.createElement(Text,null,"Use ",HI.default.createElement(Text,{bold:!0},Id(e))),value:e}}
var asc,HI;
var csc=b(()=>{ze();mc();gVt();yb();Li();v_();_x();asc=M(rt(),1),HI=M(Te(),1)});
export {lsc,TeleportRepoMismatchDialog,w3m,asc,HI,csc};
