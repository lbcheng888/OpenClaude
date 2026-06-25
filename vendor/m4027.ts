// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Das,Pa} from "./m720.ts";
import {gh,G1} from "./m3957.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function f3n(e){let t=N3a.c(7),{param:n,addMargin:r,isTranscriptMode:o,verbose:s}=e,{thinking:i}=n,a=r===void 0?!1:r;if(!i)return null;let l=o||s,c=a?1:0,u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=hxe.jsx(Box,{minWidth:2,children:hxe.jsx(Text,{dimColor:!0,italic:!0,children:Das})}),t[0]=u;else u=t[0];let d;if(t[1]!==l||t[2]!==i)d=hxe.jsx(Box,{flexDirection:"column",flexGrow:1,children:l?hxe.jsx(gh,{dimColor:!0,children:i.trim()}):hxe.jsx(Text,{dimColor:!0,italic:!0,children:i.trim().replace(/\s+/g," ")})}),t[1]=l,t[2]=i,t[3]=d;else d=t[3];let p;if(t[4]!==c||t[5]!==d)p=hxe.jsxs(Box,{flexDirection:"row",marginTop:c,width:"100%",children:[u,d]}),t[4]=c,t[5]=d,t[6]=p;else p=t[6];return p}
var N3a,hxe;
var Bpo=b(()=>{Pa();je();G1();N3a=x(tt(),1),hxe=x(oe(),1)});
export {f3n,N3a,hxe,Bpo};
