// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {tr,Bl,KE,sn} from "../src/config/0047_namespace.ts";
import {ci,pT} from "./m1289.ts";
import {dn,bt} from "./m195.ts";
import {RG,q9} from "./m4604.ts";
import {Tul,Sul} from "./m4602.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Jc,vE} from "./m3837.ts";
import {hul,gul} from "../src/tui/4602_onSelect.ts";
import {aD,bne} from "./m4590.ts";
import {clearMemoryFileCaches,getMemoryFiles,zw} from "../src/config/2717_stripHtmlComments.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var Rul={};
isFullscreenWithTTY(Rul,{call:()=>IKp});
function HKp({onDone:e}){let t=async(r)=>{try{if(r.includes(tr()))await ci().mkdir(tr());try{await wul.writeFile(r,"",{encoding:"utf8",flag:"wx"})}catch(c){if(dn(c)!=="EEXIST")throw c}await RG(r);let o="default",s="";if(process.env.VISUAL)o="$VISUAL",s=process.env.VISUAL;else if(process.env.EDITOR)o="$EDITOR",s=process.env.EDITOR;let i=o!=="default"?`Using ${o}="${s}".`:"",a=i?`> ${i} To change editor, set $EDITOR or $VISUAL environment variable.`:"> To use a different editor, set the $EDITOR or $VISUAL environment variable.",l=Bl()?`

> Safe mode: this session doesn't load memory files, so changes take effect after you ${KE()}.`:"";e(`Opened memory file at ${Tul(r)}${l}

${a}`,{display:"system"})}catch(o){logForDebugging(`Failed to open memory file ${r}: ${o}`,{level:"error"}),e(`Error opening memory file: ${o}`)}},n=()=>{e("Cancelled memory editing",{display:"system"})};return Ix.createElement(Kn,{title:"Memory",onCancel:n,color:"remember"},Ix.createElement(Box,{flexDirection:"column",gap:1},Bl()&&Ix.createElement(Box,{flexDirection:"column"},Ix.createElement(Text,{color:"suggestion"},et.info," Safe mode"),Ix.createElement(Text,{dimColor:!0},"Memory files aren't loaded into this session. You can still edit them \u2014 changes take effect after you ",KE(),".")),Ix.createElement(Ix.Suspense,{fallback:Ix.createElement(Jc,{message:"Loading memory files\u2026",dimColor:!0})},Ix.createElement(hul,{onSelect:t,onCancel:n})),Ix.createElement(aD,{url:"https://code.claude.com/docs/en/memory"})))}
var wul,Ix,IKp=async(e)=>(clearMemoryFileCaches(),await getMemoryFiles(),Ix.createElement(HKp,{onDone:e}));
var xul=b(()=>{Ai();Li();bne();vE();gul();Sul();ze();pT();zw();qe();sn();bt();q9();wul=require("fs/promises"),Ix=M(Te(),1)});
export {Rul,HKp,wul,Ix,IKp,xul};
