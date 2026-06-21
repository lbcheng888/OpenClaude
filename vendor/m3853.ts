// @ts-nocheck
import {Eu} from "./m3812.ts";
import {HIa,goo} from "../src/api/3848_sonnet.ts";
import {React,CE} from "./m3813.ts";
import {Jc,vE} from "./m3837.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {pr,Yl} from "./m2562.ts";
import {ac,e_} from "./m3338.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {Te} from "./m2253.ts";
function zIa(){let{goBack:e,goNext:t,updateWizardData:n,wizardData:r}=Eu(),[o,s]=cI.useState({phase:"checking"});if(cI.useEffect(()=>{let a=!1;return HIa(r).then((l)=>{if(a)return;if(l.status==="ok")n({verifiedIdentity:l.identity});else n({verifiedIdentity:void 0});s({phase:"done",result:l})}),()=>{a=!0}},[]),o.phase==="checking")return cI.default.createElement(React,{subtitle:"Verifying credentials"},cI.default.createElement(Jc,{message:"Calling Google Cloud\u2026",subtitle:"This may take a few seconds."}));let{result:i}=o;switch(i.status){case"ok":return cI.default.createElement(React,{subtitle:"Verification"},cI.default.createElement(Box,{flexDirection:"column",gap:1},cI.default.createElement(Text,null,cI.default.createElement(Bs,{status:"success",withSpace:!0}),"Authenticated as ",cI.default.createElement(Text,{bold:!0},i.identity)),i.note&&cI.default.createElement(Text,{dimColor:!0},i.note),cI.default.createElement(pr,{options:[{label:"Continue",value:"continue"}],onChange:()=>t(),onCancel:e})));case"error":return cI.default.createElement(React,{subtitle:"Verification failed",color:"error"},cI.default.createElement(Box,{flexDirection:"column",gap:1},cI.default.createElement(Box,{flexDirection:"column"},cI.default.createElement(Text,null,cI.default.createElement(Bs,{status:"error",withSpace:!0}),i.error),i.command&&cI.default.createElement(Text,{bold:!0,color:"suggestion"},"    ",i.command)),cI.default.createElement(ac,{cancelFirst:!0,focus:"cancel",confirmLabel:"Save anyway (skip verification)",cancelLabel:"Go back and fix",onConfirm:t,onCancel:e})))}}
var cI;
var YIa=b(()=>{ze();Yl();e_();vE();rA();$y();CE();goo();cI=M(Te(),1)});
export {zIa,cI,YIa};
