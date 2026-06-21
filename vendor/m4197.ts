// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {truncate} from "./m237.ts";
import {yP} from "../src/telemetry/2780_eventName.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {Te} from "./m2253.ts";
function Sja(){return"Monitor"}
function bja(e){if(!e.description)return null;return e.description}
function Eja(e){return i3n.default.createElement(Gn,null,i3n.default.createElement(Text,null,"Monitor started"," ",i3n.default.createElement(Text,{dimColor:!0},"\xB7 task ",e.taskId," \xB7"," ",e.persistent?"persistent":`timeout ${e.timeoutMs/1000}s`)))}
function Cja(e){if(!e?.description)return null;return truncate(e.description,yP)}
var i3n;
var vja=b(()=>{sc();ze();ps();i3n=M(Te(),1)});
export {Sja,bja,Eja,Cja,i3n,vja};
