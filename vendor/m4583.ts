// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {bs,ff} from "./m2561.ts";
import {Xe,Zs} from "./m2216.ts";
import {formatTokens,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function egl(e){let t=Zhl.c(5),{suggestions:n}=e;if(n.length===0)return null;let r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=une.jsx(Text,{bold:!0,children:"Suggestions"}),t[0]=r;else r=t[0];let o;if(t[1]!==n)o=n.map(GZp),t[1]=n,t[2]=o;else o=t[2];let s;if(t[3]!==o)s=une.jsxs(Box,{flexDirection:"column",marginTop:1,children:[r,o]}),t[3]=o,t[4]=s;else s=t[4];return s}
function GZp(e,t){return une.jsxs(Box,{flexDirection:"column",marginTop:t===0?0:1,children:[une.jsxs(Box,{children:[une.jsx(bs,{status:e.severity,withSpace:!0}),une.jsx(Text,{bold:!0,children:e.title}),e.savingsTokens?une.jsxs(Text,{dimColor:!0,children:[" ",Xe.arrowRight," save ~",formatTokens(e.savingsTokens)]}):null]}),une.jsx(Box,{marginLeft:2,children:une.jsx(Text,{dimColor:!0,children:e.detail})})]},t)}
var Zhl,une;
var tgl=b(()=>{Zs();je();Xo();ff();Zhl=x(tt(),1),une=x(oe(),1)});
export {egl,GZp,Zhl,une,tgl};
