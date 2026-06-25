// @ts-nocheck
import {MMa,NMa} from "./m3836.ts";
import {F1a,B1a} from "./m3857.ts";
import {BMa,UMa} from "./m3837.ts";
import {DMa,OMa} from "./m3834.ts";
import {$1a,q1a} from "./m3858.ts";
import {W1a,G1a} from "../src/core/3860_goBack.ts";
import {I1a,x1a} from "./m3854.ts";
import {WMa,GMa} from "../src/config/3839_CLAUDE_CODE_USE_BEDROCK.ts";
import {gqe} from "./m3829.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function I2n({onComplete:e,onCancel:t}){let n=H2n.useRef(e);n.current=e;let[r]=H2n.useState(()=>[MMa,F1a,BMa,DMa,$1a,W1a,I1a,()=>eco.jsx(WMa,{onComplete:(o)=>n.current(o)})]);return eco.jsx(gqe,{steps:r,initialData:{},onComplete:()=>{},onCancel:t,title:"Set up Amazon Bedrock",showStepCounter:!1})}
var H2n,eco;
var tco=b(()=>{Fy();OMa();NMa();UMa();GMa();x1a();B1a();q1a();G1a();H2n=x(et(),1),eco=x(oe(),1)});
export {I2n,H2n,eco,tco};
