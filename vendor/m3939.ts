// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function EMa(e){let t=bMa.c(3),{addMargin:n}=e,o=(n===void 0?!1:n)?1:0,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=kio.default.createElement(Text,{dimColor:!0,italic:!0},"\u273B Thinking\u2026"),t[0]=s;else s=t[0];let i;if(t[1]!==o)i=kio.default.createElement(Box,{marginTop:o},s),t[1]=o,t[2]=i;else i=t[2];return i}
var bMa,kio;
var CMa=b(()=>{ze();bMa=M(rt(),1),kio=M(Te(),1)});
export {EMa,bMa,kio,CMa};
