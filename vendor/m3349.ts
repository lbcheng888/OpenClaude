// @ts-nocheck
import {buildDefaultSystemPromptSections,eae} from "./m2666.ts";
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function wst(e){let t=hDn.useRef(e);t.current=e,hDn.useEffect(()=>buildDefaultSystemPromptSections.subscribe((n)=>{let r=getSettings_DEPRECATED();t.current(n,r)}),[])}
var hDn;
var gDn=b(()=>{eae();yr();hDn=M(Te(),1)});
export {wst,hDn,gDn};
