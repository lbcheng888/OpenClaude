// @ts-nocheck
import {dd,Xl} from "../src/config/0651_maxBytes.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {YN,FS} from "./m722.ts";
import {Ql,Pa} from "./m720.ts";
import {Yn,Pl} from "./m2465.ts";
import {gh,G1} from "./m3957.ts";
import {VD,Dw} from "../src/core/5176_encoding.ts";
import {a9n,_do} from "./m3958.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function B2a(){return null}
function U2a(e,t,{theme:n}){let{plan:r,filePath:o}=e,s=!r||r.trim()==="",i=o?dd(o):"",a=e.awaitingLeaderApproval;if(s)return uv.jsx(Box,{flexDirection:"column",marginTop:1,children:uv.jsxs(Box,{flexDirection:"row",children:[uv.jsx(Text,{color:YN("plan"),children:Ql}),uv.jsx(Text,{children:" Exited plan mode"})]})});if(a)return uv.jsxs(Box,{flexDirection:"column",marginTop:1,children:[uv.jsxs(Box,{flexDirection:"row",children:[uv.jsx(Text,{color:YN("plan"),children:Ql}),uv.jsx(Text,{children:" Plan submitted for team lead approval"})]}),uv.jsx(Yn,{children:uv.jsxs(Box,{flexDirection:"column",children:[o&&uv.jsxs(Text,{dimColor:!0,children:["Plan file: ",i]}),uv.jsx(Text,{dimColor:!0,children:"Waiting for team lead to review and approve..."})]})})]});return uv.jsxs(Box,{flexDirection:"column",marginTop:1,children:[uv.jsxs(Box,{flexDirection:"row",children:[uv.jsx(Text,{color:YN("plan"),children:Ql}),uv.jsx(Text,{children:" User approved Claude's plan"})]}),uv.jsx(Yn,{children:uv.jsxs(Box,{flexDirection:"column",children:[o&&uv.jsxs(Text,{dimColor:!0,children:["Plan saved to: ",i," \xB7 /plan to edit"]}),uv.jsx(gh,{children:r})]})})]})}
function $2a({plan:e},{theme:t}){let n=e??VD()??"No plan found";return uv.jsx(Box,{flexDirection:"column",children:uv.jsx(a9n,{plan:n})})}
var uv;
var q2a=b(()=>{G1();Pl();_do();Pa();FS();je();Xl();Dw();uv=x(oe(),1)});
export {B2a,U2a,$2a,uv,q2a};
