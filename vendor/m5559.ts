// @ts-nocheck
import {Box} from "./m2422.ts";
import {Button} from "./m2433.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function PZl(e){let t=DZl.c(10),{options:n,optionWidth:r,onSelect:o,marginTop:s}=e,i;if(t[0]!==o||t[1]!==r||t[2]!==n){let l;if(t[4]!==o||t[5]!==r)l=(c)=>{let{key:u,label:d}=c;return ere.createElement(Box,{key:u,width:r},ere.createElement(Button,{tabIndex:-1,onAction:()=>o(u)},(p)=>{let{hovered:m}=p;return ere.createElement(Text,{backgroundColor:m?"userMessageBackgroundHover":void 0},ere.createElement(Text,{color:"ansi:cyan"},u),": ",d)}))},t[4]=o,t[5]=r,t[6]=l;else l=t[6];i=n.map(l),t[0]=o,t[1]=r,t[2]=n,t[3]=i}else i=t[3];let a;if(t[7]!==s||t[8]!==i)a=ere.createElement(Box,{marginLeft:2,marginTop:s},i),t[7]=s,t[8]=i,t[9]=a;else a=t[9];return a}
var DZl,ere;
var OZl=b(()=>{ze();DZl=M(rt(),1),ere=M(Te(),1)});
export {PZl,DZl,ere,OZl};
