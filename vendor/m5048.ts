// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {sw,hg} from "./m2280.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {OYn,txo} from "./m5047.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {Or,ss} from "./m2553.ts";
import {preInitQueue,di} from "./m2583.ts";
import {hr,Ol} from "./m2573.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {ga,rh} from "./m2550.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function r1l({content:e,defaultFilename:t,onDone:n}){let[,r]=oOe.useState(null),[o,s]=oOe.useState(t),[i,a]=oOe.useState(t.length),[l,c]=oOe.useState(!1),{columns:u}=_r(),d=oOe.useCallback(()=>{c(!1),r(null)},[]),p=async(_)=>{if(_==="clipboard"){let T=await sw(e);if(T)process.stdout.write(T);He("export_clipboard"),n({success:!0,message:"Conversation copied to clipboard"})}else if(_==="file")r("file"),c(!0)},m=async()=>{try{let _=await OYn(o,e);He("export_file"),n({success:!0,message:`Conversation exported to: ${_}`})}catch(_){xe("export_file","write_failed"),n({success:!1,message:`Failed to export conversation: ${_ instanceof Error?_.message:"Unknown error"}`})}},f=oOe.useCallback(()=>{if(l)d();else n({success:!1,message:"Export cancelled"})},[l,d,n]),h=[{label:"Copy to clipboard",value:"clipboard",description:"Copy the conversation to your system clipboard"},{label:"Save to file",value:"file",description:"Save the conversation to a file in the current directory"}],g=l?eV.jsxs(bn,{children:[eV.jsx(at,{chord:"enter",action:"save"}),eV.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]}):eV.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"});return Or("confirm:no",f,{context:"Settings",isActive:l}),eV.jsx(preInitQueue,{title:"Export conversation",subtitle:"Select export method",color:"permission",onCancel:f,inputGuide:g,isCancelActive:!l,children:!l?eV.jsx(hr,{options:h,onChange:p,onCancel:f}):eV.jsxs(Box,{flexDirection:"column",children:[eV.jsx(Text,{children:"Enter filename:"}),eV.jsxs(Box,{flexDirection:"row",gap:1,marginTop:1,children:[eV.jsx(Text,{children:">"}),eV.jsx(ga,{value:o,onChange:s,onSubmit:m,focus:!0,showCursor:!0,columns:u,cursorOffset:i,onChangeCursorOffset:a})]})]})})}
var oOe,eV;
var o1l=b(()=>{txo();ui();hg();je();ss();mn();uc();Ol();Is();di();Wo();rh();oOe=x(et(),1),eV=x(oe(),1)});
export {r1l,oOe,eV,o1l};
