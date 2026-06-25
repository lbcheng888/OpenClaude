// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {or,dl,eC,dn} from "../src/config/0137_namespace.ts";
import {Js,rT} from "./m1294.ts";
import {cn,Ct} from "./m197.ts";
import {GG,d9} from "./m4632.ts";
import {tyl,ryl} from "./m4630.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Hc,OE} from "./m3855.ts";
import {X_l,Q_l} from "../src/tui/4630_onSelect.ts";
import {Sx,fne} from "./m4618.ts";
import {clearMemoryFileCaches,getMemoryFiles,ZR} from "../src/config/2729_stripHtmlComments.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var uyl={};
ft(uyl,{call:()=>Onm});
function Pnm({onDone:e}){let t=async(r)=>{try{if(r.includes(or()))await Js().mkdir(or());try{await lyl.writeFile(r,"",{encoding:"utf8",flag:"wx"})}catch(c){if(cn(c)!=="EEXIST")throw c}await GG(r);let o="default",s="";if(process.env.VISUAL)o="$VISUAL",s=process.env.VISUAL;else if(process.env.EDITOR)o="$EDITOR",s=process.env.EDITOR;let i=o!=="default"?`Using ${o}="${s}".`:"",a=i?`> ${i} To change editor, set $EDITOR or $VISUAL environment variable.`:"> To use a different editor, set the $EDITOR or $VISUAL environment variable.",l=dl()?`

> Safe mode: this session doesn't load memory files, so changes take effect after you ${eC()}.`:"";e(`Opened memory file at ${tyl(r)}${l}

${a}`,{display:"system"})}catch(o){logForDebugging(`Failed to open memory file ${r}: ${o}`,{level:"error"}),e(`Error opening memory file: ${o}`)}},n=()=>{e("Cancelled memory editing",{display:"system"})};return uJ.jsx(preInitQueue,{title:"Memory",onCancel:n,color:"remember",children:uJ.jsxs(Box,{flexDirection:"column",gap:1,children:[dl()&&uJ.jsxs(Box,{flexDirection:"column",children:[uJ.jsxs(Text,{color:"suggestion",children:[Xe.info," Safe mode"]}),uJ.jsxs(Text,{dimColor:!0,children:["Memory files aren't loaded into this session. You can still edit them \u2014 changes take effect after you ",eC(),"."]})]}),uJ.jsx(cyl.Suspense,{fallback:uJ.jsx(Hc,{message:"Loading memory files\u2026",dimColor:!0}),children:uJ.jsx(X_l,{onSelect:t,onCancel:n})}),uJ.jsx(Sx,{url:"https://code.claude.com/docs/en/memory"})]})})}
var lyl,cyl,uJ,Onm=async(e)=>(clearMemoryFileCaches(),await getMemoryFiles(),uJ.jsx(Pnm,{onDone:e}));
var dyl=b(()=>{Zs();di();fne();OE();Q_l();ryl();je();rT();ZR();qe();dn();Ct();d9();lyl=require("fs/promises"),cyl=x(et(),1),uJ=x(oe(),1)});
export {uyl,Pnm,lyl,cyl,uJ,Onm,dyl};
