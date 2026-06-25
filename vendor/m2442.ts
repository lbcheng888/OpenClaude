// @ts-nocheck
import {s4,$ve} from "./m2391.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useClock(){let e=hxi.useContext(s4);if(!e)throw Error("useClock must be used within a ClockProvider");return e}
var hxi;
var g2e=b(()=>{$ve();hxi=x(et(),1)});
export {useClock,hxi,g2e};
