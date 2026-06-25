// @ts-nocheck
import {getFileStatus,stashToCleanState,ia} from "./m698.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Box} from "./m2432.ts";
import {gd,xw} from "../src/tui/3853_mode.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {at,Wo} from "./m2557.ts";
import {preInitQueue,di} from "./m2583.ts";
import {wl,sy} from "./m2585.ts";
import {Bl,d_} from "./m3354.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function HNa({onStashAndContinue:e,onCancel:t}){let[n,r]=Rqe.useState(null),o=n!==null?[...n.tracked,...n.untracked]:[],[s,i]=Rqe.useState(!0),[a,l]=Rqe.useState(!1),[c,u]=Rqe.useState(null);Rqe.useEffect(()=>{(async()=>{try{let f=await getFileStatus();r(f)}catch(f){let h=f instanceof Error?f.message:String(f);logForDebugging(`Error getting changed files: ${h}`,{level:"error"}),u("Failed to get changed files")}finally{i(!1)}})()},[]);let d=async()=>{l(!0);try{if(logForDebugging("Stashing changes before teleport..."),await stashToCleanState("Teleport auto-stash"))logForDebugging("Successfully stashed changes"),e();else u("Failed to stash changes")}catch(m){let f=m instanceof Error?m.message:String(m);logForDebugging(`Error stashing changes: ${f}`,{level:"error"}),u("Failed to stash changes")}finally{l(!1)}};if(s)return dH.jsx(Box,{flexDirection:"column",padding:1,children:dH.jsxs(Box,{marginBottom:1,children:[dH.jsx(gd,{}),dH.jsxs(Text,{children:[" Checking git status",Xe.ellipsis]})]})});if(c)return dH.jsxs(Box,{flexDirection:"column",padding:1,children:[dH.jsxs(Text,{bold:!0,color:"error",children:["Error: ",c]}),dH.jsx(Box,{marginTop:1,children:dH.jsx(Text,{dimColor:!0,children:dH.jsx(at,{chord:"escape",action:"cancel",bold:!0})})})]});let p=o.length>8;return dH.jsxs(preInitQueue,{title:"Working directory has changes",onCancel:t,children:[dH.jsx(Text,{children:"Teleport will switch git branches. The following changes were found:"}),dH.jsx(Box,{flexDirection:"column",paddingLeft:2,children:o.length>0?p?dH.jsxs(Text,{children:[o.length," files changed"]}):o.map((m,f)=>dH.jsx(Text,{children:m},f)):dH.jsx(wl,{children:"No changes detected"})}),dH.jsx(Text,{children:"Would you like to stash these changes and continue with teleport?"}),a?dH.jsxs(Box,{children:[dH.jsx(gd,{}),dH.jsx(Text,{children:" Stashing changes..."})]}):dH.jsx(Bl,{confirmLabel:"Stash changes and continue",cancelLabel:"Exit",onConfirm:()=>void d(),onCancel:t})]})}
var Rqe,dH;
var INa=b(()=>{Zs();je();qe();ia();d_();di();sy();Wo();xw();Rqe=x(et(),1),dH=x(oe(),1)});
export {HNa,Rqe,dH,INa};
