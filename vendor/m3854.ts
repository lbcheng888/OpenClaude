// @ts-nocheck
import {EIa,CIa} from "./m3845.ts";
import {VIa,KIa} from "./m3852.ts";
import {BIa,FIa} from "./m3850.ts";
import {$Ia,qIa} from "./m3851.ts";
import {zIa,YIa} from "./m3853.ts";
import {DIa,PIa} from "./m3848.ts";
import {wIa,RIa} from "../src/config/3847_CLAUDE_CODE_USE_VERTEX.ts";
import {n4e} from "./m3811.ts";
import {b,M} from "../runtime.ts";
import {$y} from "./m3814.ts";
import {Te} from "./m2253.ts";
function MBn({onComplete:e,onCancel:t}){let n=a4e.useRef(e);n.current=e;let[r]=a4e.useState(()=>[EIa,VIa,BIa,$Ia,zIa,DIa,()=>a4e.default.createElement(wIa,{onComplete:(o)=>n.current(o)})]);return a4e.default.createElement(n4e,{steps:r,initialData:{},onComplete:()=>{},onCancel:t,title:"Set up Google Vertex AI",showStepCounter:!1})}
var a4e;
var Soo=b(()=>{$y();CIa();RIa();PIa();FIa();qIa();KIa();YIa();a4e=M(Te(),1)});
export {MBn,a4e,Soo};
