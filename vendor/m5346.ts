// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function ner(){let e=U7l.c(7),t=_t(b1m);if(!t)return null;if("jsx"in t){let o;if(e[0]!==t.jsx||e[1]!==t.key)o=JNo.jsx(Text,{wrap:"truncate",children:t.jsx},t.key),e[0]=t.jsx,e[1]=t.key,e[2]=o;else o=e[2];return o}let n=!t.color,r;if(e[3]!==t.color||e[4]!==t.text||e[5]!==n)r=JNo.jsx(Text,{color:t.color,dimColor:n,wrap:"truncate",children:t.text}),e[3]=t.color,e[4]=t.text,e[5]=n,e[6]=r;else r=e[6];return r}
function b1m(e){return e.notifications.current}
var U7l,JNo;
var XNo=b(()=>{je();uo();U7l=x(tt(),1),JNo=x(oe(),1)});
export {ner,b1m,U7l,JNo,XNo};
