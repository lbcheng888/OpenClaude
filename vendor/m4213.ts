// @ts-nocheck
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {truncate} from "./m239.ts";
import {DD} from "../src/telemetry/2792_eventName.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {oe} from "./m2275.ts";
function P7a(){return"Monitor"}
function O7a(e){if(!e.description)return null;return e.description}
function L7a(e){return uqt.jsx(Yn,{children:uqt.jsxs(Text,{children:["Monitor started"," ",uqt.jsxs(Text,{dimColor:!0,children:["\xB7 task ",e.taskId," \xB7"," ",e.persistent?"persistent":`timeout ${e.timeoutMs/1000}s`]})]})})}
function M7a(e){if(!e?.description)return null;return truncate(e.description,DD)}
var uqt;
var N7a=b(()=>{Pl();je();Xo();uqt=x(oe(),1)});
export {P7a,O7a,L7a,M7a,uqt,N7a};
