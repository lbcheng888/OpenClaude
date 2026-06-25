// @ts-nocheck
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function I3n(e){let t=x4a.c(8),{param:n,addMargin:r}=e,{text:o}=n,s;if(t[0]!==o)s=fl(o,"bash-input"),t[0]=o,t[1]=s;else s=t[1];let i=s;if(!i)return null;let a=r?1:0,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=Q3t.jsx(Text,{color:"bashBorder",children:"! "}),t[2]=l;else l=t[2];let c;if(t[3]!==i)c=Q3t.jsx(Text,{color:"text",children:i}),t[3]=i,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==c)u=Q3t.jsxs(Box,{flexDirection:"row",marginTop:a,backgroundColor:"bashMessageBackgroundColor",paddingRight:1,children:[l,c]}),t[5]=a,t[6]=c,t[7]=u;else u=t[7];return u}
var x4a,Q3t;
var cmo=b(()=>{je();po();x4a=x(tt(),1),Q3t=x(oe(),1)});
export {I3n,x4a,Q3t,cmo};
