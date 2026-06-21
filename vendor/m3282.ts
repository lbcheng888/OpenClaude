// @ts-nocheck
import {Axe,sLt} from "./m2797.ts";
import {useTerminalViewport,d0t} from "./m2440.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function bP({children:e}){let t=Wot.useContext(Axe),[n,r,,o]=useTerminalViewport(),s=Wot.useRef(e);if((o()??r.isVisible)||t)s.current=e;return Wot.default.createElement(Box,{ref:n},s.current)}
var Wot;
var Vhe=b(()=>{d0t();ze();sLt();Wot=M(Te(),1)});
export {bP,Wot,Vhe};
