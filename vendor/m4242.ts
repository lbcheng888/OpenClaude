// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {yce,hct} from "./m3961.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function K5a(e,t){return""}
function z5a(e,t){let n=e.at(-1)?.data;return MN.createElement(Gn,null,MN.createElement(Text,{dimColor:!0},n?`Running ${n.toolName}\u2026`:"Working\u2026"))}
function Y5a(){return MN.createElement(Gn,null,MN.createElement(Text,{color:"warning"},"Rejected"))}
function J5a(e,t){if(yce())return MN.createElement(MN.Fragment,null);return MN.createElement(Gn,null,MN.createElement(Text,{color:"error"},typeof e==="string"?e:"Error"))}
var MN;
var X5a=b(()=>{sc();ze();hct();MN=M(Te(),1)});
export {K5a,z5a,Y5a,J5a,MN,X5a};
