// @ts-nocheck
import {m8,sl} from "./m715.ts";
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {useTimeout} from "./m2450.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Oy,XS} from "../src/config/2341_XS.ts";
import {mEn,nL,AEn,GZ} from "./m2525.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Gyl({char:e=m8}){let t=useIsScreenReaderEnabled(),[n]=Vjt.useState(()=>Dv(getInitialSettings().prefersReducedMotion)),[r,o]=Vjt.useState(n||t),s=Vjt.useRef(null),[i,a]=useAnimationFrame(r?null:50);if(useTimeout(()=>o(!0),r?null:ytm,[r]),r)return mye.createElement(Box,{ref:i},mye.createElement(Text,{color:Ttm},e));if(s.current===null)s.current=a;let c=(a-s.current)/Wyl*360%360,u=Oy()?mEn(c):c;return mye.createElement(Box,{ref:i},mye.createElement(Text,{color:nL(AEn(u))},e))}
var mye,Vjt,Wyl=1500,_tm=2,ytm,Ttm;
var Vyl=b(()=>{sl();XS();ze();VZ();yr();GZ();mye=M(Te(),1),Vjt=M(Te(),1),ytm=Wyl*_tm,Ttm=nL({r:153,g:153,b:153})});
export {Gyl,mye,Vjt,Wyl,_tm,ytm,Ttm,Vyl};
