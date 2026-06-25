// @ts-nocheck
import {j1a,Y1a} from "./m3863.ts";
import {yNa,TNa} from "./m3870.ts";
import {uNa,dNa} from "./m3868.ts";
import {mNa,fNa} from "./m3869.ts";
import {SNa,bNa} from "./m3871.ts";
import {oNa,sNa} from "./m3866.ts";
import {Q1a,Z1a} from "../src/config/3865_CLAUDE_CODE_USE_VERTEX.ts";
import {gqe} from "./m3829.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function M2n({onComplete:e,onCancel:t}){let n=L2n.useRef(e);n.current=e;let[r]=L2n.useState(()=>[j1a,yNa,uNa,mNa,SNa,oNa,()=>cco.jsx(Q1a,{onComplete:(o)=>n.current(o)})]);return cco.jsx(gqe,{steps:r,initialData:{},onComplete:()=>{},onCancel:t,title:"Set up Google Vertex AI",showStepCounter:!1})}
var L2n,cco;
var uco=b(()=>{Fy();Y1a();Z1a();sNa();dNa();fNa();TNa();bNa();L2n=x(et(),1),cco=x(oe(),1)});
export {M2n,L2n,cco,uco};
