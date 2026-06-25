// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {z3t,Ipo} from "./m4020.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Dpo,xpo} from "./m4021.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
var Ppo={};
ft(Ppo,{callNonInteractive:()=>callNonInteractive,call:()=>Exp});
var c3n,l3n="/extra-usage is now /usage-credits",Exp=async(e,t)=>{let{call:n}=await Promise.resolve().then(() => (z3t(),Ipo)),o=await n((s,i)=>e(s?`${l3n}

${s}`:l3n,i),t);if(o==null)return o;return c3n.jsxs(Box,{flexDirection:"column",children:[c3n.jsx(Text,{dimColor:!0,children:l3n}),o]})},callNonInteractive=async()=>{let{call:e}=await Promise.resolve().then(() => (Dpo(),xpo)),t=await e();return{type:"text",value:`${l3n}

${t.value}`}};
var Opo=b(()=>{je();c3n=x(oe(),1)});
export {Ppo,c3n,l3n,Exp,callNonInteractive,Opo};
