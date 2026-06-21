// @ts-nocheck
import {mHa,fHa} from "./m3818.ts";
import {fIa,AIa} from "./m3839.ts";
import {hHa,gHa} from "./m3819.ts";
import {uHa,dHa} from "./m3816.ts";
import {gIa,_Ia} from "./m3840.ts";
import {yIa,TIa} from "../src/core/3842_goBack.ts";
import {iIa,aIa} from "./m3836.ts";
import {yHa,THa} from "../src/config/3821_CLAUDE_CODE_USE_BEDROCK.ts";
import {n4e} from "./m3811.ts";
import {b,M} from "../runtime.ts";
import {$y} from "./m3814.ts";
import {Te} from "./m2253.ts";
function PBn({onComplete:e,onCancel:t}){let n=s4e.useRef(e);n.current=e;let[r]=s4e.useState(()=>[mHa,fIa,hHa,uHa,gIa,yIa,iIa,()=>s4e.default.createElement(yHa,{onComplete:(o)=>n.current(o)})]);return s4e.default.createElement(n4e,{steps:r,initialData:{},onComplete:()=>{},onCancel:t,title:"Set up Amazon Bedrock",showStepCounter:!1})}
var s4e;
var foo=b(()=>{$y();dHa();fHa();gHa();THa();aIa();AIa();_Ia();TIa();s4e=M(Te(),1)});
export {PBn,s4e,foo};
