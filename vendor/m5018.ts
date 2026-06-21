// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {zR,lg} from "./m2269.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {$Vn,Wwo} from "./m5017.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Or,Ts} from "./m2542.ts";
import {Kn,Li} from "./m2572.ts";
import {pr,Yl} from "./m2562.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Pa,rh} from "./m2539.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Mkl({content:e,defaultFilename:t,onDone:n}){let[,r]=hD.useState(null),[o,s]=hD.useState(t),[i,a]=hD.useState(t.length),[l,c]=hD.useState(!1),{columns:u}=mr(),d=hD.useCallback(()=>{c(!1),r(null)},[]),p=async(g)=>{if(g==="clipboard"){let _=await zR(e);if(_)process.stdout.write(_);Ie("export_clipboard"),n({success:!0,message:"Conversation copied to clipboard"})}else if(g==="file")r("file"),c(!0)},m=async()=>{try{let g=await $Vn(o,e);Ie("export_file"),n({success:!0,message:`Conversation exported to: ${g}`})}catch(g){Oe("export_file","write_failed"),n({success:!1,message:`Failed to export conversation: ${g instanceof Error?g.message:"Unknown error"}`})}},f=hD.useCallback(()=>{if(l)d();else n({success:!1,message:"Export cancelled"})},[l,d,n]),A=[{label:"Copy to clipboard",value:"clipboard",description:"Copy the conversation to your system clipboard"},{label:"Save to file",value:"file",description:"Save the conversation to a file in the current directory"}],h=l?hD.default.createElement(Tn,null,hD.default.createElement(at,{chord:"enter",action:"save"}),hD.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})):hD.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"});return Or("confirm:no",f,{context:"Settings",isActive:l}),hD.default.createElement(Kn,{title:"Export conversation",subtitle:"Select export method",color:"permission",onCancel:f,inputGuide:h,isCancelActive:!l},!l?hD.default.createElement(pr,{options:A,onChange:p,onCancel:f}):hD.default.createElement(Box,{flexDirection:"column"},hD.default.createElement(Text,null,"Enter filename:"),hD.default.createElement(Box,{flexDirection:"row",gap:1,marginTop:1},hD.default.createElement(Text,null,">"),hD.default.createElement(Pa,{value:o,onChange:s,onSubmit:m,focus:!0,showCursor:!0,columns:u,cursorOffset:i,onChangeCursorOffset:a}))))}
var hD;
var Nkl=b(()=>{Wwo();ki();lg();ze();Ts();ln();readRoster();Yl();zs();Li();rs();rh();hD=M(Te(),1)});
export {Mkl,hD,Nkl};
