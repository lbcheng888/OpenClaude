// @ts-nocheck
import {U8,i4} from "./m2426.ts";
import {tS,Qg,hg} from "./m2280.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function cc(e){return Bun.stripANSI(e)}
function useTerminalTitle(e){let t=LAn.useContext(U8);LAn.useEffect(()=>{if(e===null||!t)return;let n=cc(e);t(tS(Qg.SET_TITLE_AND_ICON,n))},[e,t])}
var LAn;
var MAn=b(()=>{hg();i4();LAn=x(et(),1)});
export {cc,useTerminalTitle,LAn,MAn};
