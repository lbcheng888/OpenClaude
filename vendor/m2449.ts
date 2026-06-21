// @ts-nocheck
import {w5,F4} from "./m2416.ts";
import {aS,$g,lg} from "./m2269.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Ec(e){return Bun.stripANSI(e)}
function useTerminalTitle(e){let t=zSn.useContext(w5);zSn.useEffect(()=>{if(e===null||!t)return;let n=Ec(e);t(aS($g.SET_TITLE_AND_ICON,n))},[e,t])}
var zSn;
var YSn=b(()=>{lg();F4();zSn=M(Te(),1)});
export {Ec,useTerminalTitle,zSn,YSn};
