// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {_G,U6e} from "./m4040.ts";
import {Text} from "./m2433.ts";
import {at,Wo} from "./m2557.ts";
import {Box} from "./m2432.ts";
import {ND,s_e} from "./m3298.ts";
import {IDe,w5t} from "./m4442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function UQl(){let e=BQl.c(14),t=_t(_$m);if(!t)return null;let n;if(e[0]!==t.identity.color)n=_G(t.identity.color),e[0]=t.identity.color,e[1]=n;else n=e[1];let r=n,o;if(e[2]===Symbol.for("react.memo_cache_sentinel"))o=pde.jsx(Text,{children:"Viewing "}),e[2]=o;else o=e[2];let s;if(e[3]!==r||e[4]!==t.identity.agentName)s=pde.jsxs(Text,{color:r,bold:!0,children:["@",t.identity.agentName]}),e[3]=r,e[4]=t.identity.agentName,e[5]=s;else s=e[5];let i;if(e[6]===Symbol.for("react.memo_cache_sentinel"))i=pde.jsxs(Text,{dimColor:!0,children:[" \xB7 ",pde.jsx(at,{chord:"escape",action:"return",format:{keyCase:"lower"}})]}),e[6]=i;else i=e[6];let a;if(e[7]!==s)a=pde.jsxs(Box,{children:[o,s,i]}),e[7]=s,e[8]=a;else a=e[8];let l;if(e[9]!==t.prompt)l=pde.jsx(Text,{dimColor:!0,children:t.prompt}),e[9]=t.prompt,e[10]=l;else l=e[10];let c;if(e[11]!==a||e[12]!==l)c=pde.jsx(ND,{children:pde.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[a,l]})}),e[11]=a,e[12]=l,e[13]=c;else c=e[13];return c}
function _$m(e){return IDe(e)}
var BQl,pde;
var $Ql=b(()=>{je();uo();w5t();U6e();Wo();s_e();BQl=x(tt(),1),pde=x(oe(),1)});
export {UQl,_$m,BQl,pde,$Ql};
