// @ts-nocheck
import {EIi,CIi} from "./m2394.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {BaseText,u2e} from "./m2398.ts";
import {b,x} from "../runtime.ts";
import {HIi} from "./m2396.ts";
import {oe} from "./m2275.ts";
function __d(e){return e.includes("$bunfs")||e.includes("~BUN")||e.includes("/snapshot/")||e.startsWith("node:")}
function y_d(e){return e.some(({value:t})=>t.length>g_d)}
function OIi(){return T_d??=new Eqr.default({cwd:process.cwd(),internals:Eqr.default.nodeInternals()})}
function Cqr({error:e}){let t=e.stack?e.stack.split(`
`).slice(1):void 0,n=t?OIi().parseLine(t[0]):void 0,r=PIi(n?.file),o,s=0;if(r&&n?.line&&!__d(r))try{let i=LIi.readFileSync(r,"utf8");if(o=EIi(i,n.line),o&&y_d(o))o=void 0;if(o)for(let{line:a}of o)s=Math.max(s,String(a).length)}catch{}return gI.jsxs(BaseBox,{flexDirection:"column",padding:1,children:[gI.jsxs(BaseBox,{children:[gI.jsxs(BaseText,{backgroundColor:"ansi:red",color:"ansi:white",children:[" ","ERROR"," "]}),gI.jsxs(BaseText,{children:[" ",e.message]})]}),n&&r&&gI.jsx(BaseBox,{marginTop:1,children:gI.jsxs(BaseText,{dim:!0,children:[r,":",n.line,":",n.column]})}),n&&o&&gI.jsx(BaseBox,{marginTop:1,flexDirection:"column",children:o.map(({line:i,value:a})=>gI.jsxs(BaseBox,{children:[gI.jsx(BaseBox,{width:s+1,children:gI.jsxs(BaseText,{dim:i!==n.line,backgroundColor:i===n.line?"ansi:red":void 0,color:i===n.line?"ansi:white":void 0,children:[String(i).padStart(s," "),":"]})}),gI.jsx(BaseText,{backgroundColor:i===n.line?"ansi:red":void 0,color:i===n.line?"ansi:white":void 0,children:" "+a},i)]},i))}),e.stack&&gI.jsx(BaseBox,{marginTop:1,flexDirection:"column",children:e.stack.split(`
`).slice(1).map((i)=>{let a=OIi().parseLine(i);if(!a)return gI.jsxs(BaseBox,{children:[gI.jsx(BaseText,{dim:!0,children:"- "}),gI.jsx(BaseText,{bold:!0,children:i})]},i);return gI.jsxs(BaseBox,{children:[gI.jsx(BaseText,{dim:!0,children:"- "}),gI.jsx(BaseText,{bold:!0,children:a.function}),gI.jsxs(BaseText,{dim:!0,children:[" ","(",PIi(a.file)??"",":",a.line,":",a.column,")"]})]},i)})})]})}
var LIi,Eqr,gI,PIi=(e)=>e?.replace(`file://${process.cwd()}/`,""),g_d=200,T_d;
var MIi=b(()=>{CIi();xZ();u2e();LIi=require("fs"),Eqr=x(HIi(),1),gI=x(oe(),1)});
export {__d,y_d,OIi,Cqr,LIi,Eqr,gI,PIi,g_d,T_d,MIi};
