// @ts-nocheck
import {H5,Pa} from "./m720.ts";
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {useTimeout} from "./m2460.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {xy,nS} from "../src/config/2351_nS.ts";
import {evn,TO,nvn,$Z} from "./m2536.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Vwl({char:e=H5}){let t=useIsScreenReaderEnabled(),[n]=uGt.useState(()=>MA(getInitialSettings().prefersReducedMotion)),[r,o]=uGt.useState(n||t),s=uGt.useRef(null),[i,a]=useAnimationFrame(r?null:50);if(useTimeout(()=>o(!0),r?null:Dum,[r]),r)return cGt.jsx(Box,{ref:i,children:cGt.jsx(Text,{color:Pum,children:e})});if(s.current===null)s.current=a;let c=(a-s.current)/Gwl*360%360,u=xy()?evn(c):c;return cGt.jsx(Box,{ref:i,children:cGt.jsx(Text,{color:TO(nvn(u)),children:e})})}
var uGt,cGt,Gwl=1500,xum=2,Dum,Pum;
var Kwl=b(()=>{Pa();nS();je();qZ();br();$Z();uGt=x(et(),1),cGt=x(oe(),1),Dum=Gwl*xum,Pum=TO({r:153,g:153,b:153})});
export {Vwl,uGt,cGt,Gwl,xum,Dum,Pum,Kwl};
