// @ts-nocheck
import {B4,rwe} from "./m2381.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useClock(){let e=Qvi.useContext(B4);if(!e)throw Error("useClock must be used within a ClockProvider");return e}
var Qvi;
var yUe=b(()=>{rwe();Qvi=M(Te(),1)});
export {useClock,Qvi,yUe};
