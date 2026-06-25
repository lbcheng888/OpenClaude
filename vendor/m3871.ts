// @ts-nocheck
import {iu} from "./m3830.ts";
import {nNa,sco} from "../src/api/3866_sonnet.ts";
import {_c,PE} from "./m3831.ts";
import {Hc,OE} from "./m3855.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {bs,ff} from "./m2561.ts";
import {hr,Ol} from "./m2573.ts";
import {Bl,d_} from "./m3354.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function SNa(){let{goBack:e,goNext:t,updateWizardData:n,wizardData:r}=iu(),[o,s]=O2n.useState({phase:"checking"});if(O2n.useEffect(()=>{let a=!1;return nNa(r).then((l)=>{if(a)return;if(l.status==="ok")n({verifiedIdentity:l.identity});else n({verifiedIdentity:void 0});s({phase:"done",result:l})}),()=>{a=!0}},[]),o.phase==="checking")return rL.jsx(_c,{subtitle:"Verifying credentials",children:rL.jsx(Hc,{message:"Calling Google Cloud\u2026",subtitle:"This may take a few seconds."})});let{result:i}=o;switch(i.status){case"ok":return rL.jsx(_c,{subtitle:"Verification",children:rL.jsxs(Box,{flexDirection:"column",gap:1,children:[rL.jsxs(Text,{children:[rL.jsx(bs,{status:"success",withSpace:!0}),"Authenticated as ",rL.jsx(Text,{bold:!0,children:i.identity})]}),i.note&&rL.jsx(Text,{dimColor:!0,children:i.note}),rL.jsx(hr,{options:[{label:"Continue",value:"continue"}],onChange:()=>t(),onCancel:e})]})});case"error":return rL.jsx(_c,{subtitle:"Verification failed",color:"error",children:rL.jsxs(Box,{flexDirection:"column",gap:1,children:[rL.jsxs(Box,{flexDirection:"column",children:[rL.jsxs(Text,{children:[rL.jsx(bs,{status:"error",withSpace:!0}),i.error]}),i.command&&rL.jsxs(Text,{bold:!0,color:"suggestion",children:["    ",i.command]})]}),rL.jsx(Bl,{cancelFirst:!0,focus:"cancel",confirmLabel:"Save anyway (skip verification)",cancelLabel:"Go back and fix",onConfirm:t,onCancel:e})]})})}}
var O2n,rL;
var bNa=b(()=>{je();Ol();d_();OE();ff();Fy();PE();sco();O2n=x(et(),1),rL=x(oe(),1)});
export {SNa,O2n,rL,bNa};
