// @ts-nocheck
import {tHe,L1t} from "./m2810.ts";
import {useTerminalViewport,$Pt} from "./m2450.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function ND({children:e}){let t=eOn.useContext(tHe),[n,r,,o]=useTerminalViewport(),s=eOn.useRef(e);if((o()??r.isVisible)||t)s.current=e;return Xma.jsx(Box,{ref:n,children:s.current})}
var eOn,Xma;
var s_e=b(()=>{$Pt();je();L1t();eOn=x(et(),1),Xma=x(oe(),1)});
export {ND,eOn,Xma,s_e};
