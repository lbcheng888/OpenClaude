// @ts-nocheck
import {Or,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {at,Wo} from "./m2557.ts";
import {_ue} from "../src/tui/4657_existingApiKey.ts";
import {pb,eG} from "./m3827.ts";
import {cS,Rj} from "./m3188.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function oSl(e){let t=rSl.c(9),{warnings:n,onContinue:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={context:"Confirmation"},t[0]=o;else o=t[0];Or("confirm:yes",r,o);let s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s=memoizeThunk.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[memoizeThunk.jsxs(Text,{bold:!0,children:[Xe.warning," Setup Warnings"]}),memoizeThunk.jsx(Text,{dimColor:!0,children:"We found some potential issues, but you can continue anyway"})]}),t[1]=s;else s=t[1];let i;if(t[2]!==n)i=n.map(Trm),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]===Symbol.for("react.memo_cache_sentinel"))a=memoizeThunk.jsx(at,{chord:"enter",action:"continue anyway"}),t[4]=a;else a=t[4];let l;if(t[5]===Symbol.for("react.memo_cache_sentinel"))l=memoizeThunk.jsx(Box,{marginTop:1,children:memoizeThunk.jsxs(Text,{bold:!0,color:"permission",children:["Press"," ",a,", or"," ",memoizeThunk.jsx(at,{chord:"ctrl+c",action:"exit and fix issues",format:{modCase:"title",charCase:"upper"}})]})}),t[5]=l;else l=t[5];let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=memoizeThunk.jsx(Box,{marginTop:1,children:memoizeThunk.jsxs(Text,{dimColor:!0,children:["You can also try the manual setup steps if needed:"," ",memoizeThunk.jsx(Text,{color:"claude",children:_ue})]})}),t[6]=c;else c=t[6];let u;if(t[7]!==i)u=memoizeThunk.jsx(memoizeThunk.Fragment,{children:memoizeThunk.jsxs(pb,{children:[s,i,l,c]})}),t[7]=i,t[8]=u;else u=t[8];return u}
function Trm(e,t){return memoizeThunk.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[memoizeThunk.jsx(Text,{color:"warning",bold:!0,children:e.title}),memoizeThunk.jsx(Text,{children:e.message}),e.instructions.length>0&&memoizeThunk.jsx(Box,{flexDirection:"column",marginLeft:2,marginTop:1,children:e.instructions.map(Srm)})]},t)}
function Srm(e,t){return memoizeThunk.jsx(cS,{children:memoizeThunk.jsx(Text,{dimColor:!0,children:e})},t)}
var rSl,memoizeThunk;
var sSl=b(()=>{Zs();Rj();Wo();eG();je();ss();rSl=x(tt(),1),memoizeThunk=x(oe(),1)});
export {oSl,Trm,Srm,rSl,memoizeThunk,sSl};
