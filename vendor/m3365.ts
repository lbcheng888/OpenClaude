// @ts-nocheck
import {xO,Xie} from "./m2677.ts";
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Aat(e){let t=cLn.useRef(e);t.current=e,cLn.useEffect(()=>xO.subscribe((n)=>{let r=getSettings_DEPRECATED();t.current(n,r)}),[])}
var cLn;
var uLn=b(()=>{Xie();br();cLn=x(et(),1)});
export {Aat,cLn,uLn};
