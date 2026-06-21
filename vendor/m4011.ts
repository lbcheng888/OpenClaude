// @ts-nocheck
import {ju,wk} from "../src/tui/2564_current.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function yBa(){let e=_Ba.c(2),t=ju("app:toggleTranscript","Global","ctrl+o"),n;if(e[0]!==t)n=d$t.createElement(Box,{marginY:1},d$t.createElement(Text,{dimColor:!0},"\u273B Conversation compacted (",t," for history)")),e[0]=t,e[1]=n;else n=e[1];return n}
var _Ba,d$t;
var TBa=b(()=>{ze();wk();_Ba=M(rt(),1),d$t=M(Te(),1)});
export {yBa,_Ba,d$t,TBa};
