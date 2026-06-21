// @ts-nocheck
import {getFileStatus,stashToCleanState,Ba} from "./m693.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Box} from "./m2422.ts";
import {tp,_x} from "../src/tui/3835_mode.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {at,rs} from "./m2546.ts";
import {Kn,Li} from "./m2572.ts";
import {ic,Ny} from "./m2574.ts";
import {ac,e_} from "./m3338.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function o0a({onStashAndContinue:e,onCancel:t}){let[n,r]=fb.useState(null),o=n!==null?[...n.tracked,...n.untracked]:[],[s,i]=fb.useState(!0),[a,l]=fb.useState(!1),[c,u]=fb.useState(null);fb.useEffect(()=>{(async()=>{try{let f=await getFileStatus();r(f)}catch(f){let A=f instanceof Error?f.message:String(f);logForDebugging(`Error getting changed files: ${A}`,{level:"error"}),u("Failed to get changed files")}finally{i(!1)}})()},[]);let d=async()=>{l(!0);try{if(logForDebugging("Stashing changes before teleport..."),await stashToCleanState("Teleport auto-stash"))logForDebugging("Successfully stashed changes"),e();else u("Failed to stash changes")}catch(m){let f=m instanceof Error?m.message:String(m);logForDebugging(`Error stashing changes: ${f}`,{level:"error"}),u("Failed to stash changes")}finally{l(!1)}};if(s)return fb.default.createElement(Box,{flexDirection:"column",padding:1},fb.default.createElement(Box,{marginBottom:1},fb.default.createElement(tp,null),fb.default.createElement(Text,null," Checking git status",et.ellipsis)));if(c)return fb.default.createElement(Box,{flexDirection:"column",padding:1},fb.default.createElement(Text,{bold:!0,color:"error"},"Error: ",c),fb.default.createElement(Box,{marginTop:1},fb.default.createElement(Text,{dimColor:!0},fb.default.createElement(at,{chord:"escape",action:"cancel",bold:!0}))));let p=o.length>8;return fb.default.createElement(Kn,{title:"Working directory has changes",onCancel:t},fb.default.createElement(Text,null,"Teleport will switch git branches. The following changes were found:"),fb.default.createElement(Box,{flexDirection:"column",paddingLeft:2},o.length>0?p?fb.default.createElement(Text,null,o.length," files changed"):o.map((m,f)=>fb.default.createElement(Text,{key:f},m)):fb.default.createElement(ic,null,"No changes detected")),fb.default.createElement(Text,null,"Would you like to stash these changes and continue with teleport?"),a?fb.default.createElement(Box,null,fb.default.createElement(tp,null),fb.default.createElement(Text,null," Stashing changes...")):fb.default.createElement(ac,{confirmLabel:"Stash changes and continue",cancelLabel:"Exit",onConfirm:()=>void d(),onCancel:t}))}
var fb;
var s0a=b(()=>{Ai();ze();qe();Ba();e_();Li();Ny();rs();_x();fb=M(Te(),1)});
export {o0a,fb,s0a};
