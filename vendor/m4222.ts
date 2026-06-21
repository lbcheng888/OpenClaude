// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {truncateToWidthNoEllipsis} from "./m237.ts";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {Te} from "./m2253.ts";
function X8a(){return""}
function tPp(e){let t=e.split(`
`),n=e;if(t.length>Y8a)n=t.slice(0,Y8a).join(`
`);if(tn(n)>J8a)n=truncateToWidthNoEllipsis(n,J8a);return n.trim()}
function Q8a(e,t,{verbose:n}){let r=e.command??"",o=n?r:tPp(r);return lpo.default.createElement(Gn,null,lpo.default.createElement(Text,null,o,o!==r?"\u2026 \xB7 stopped":" \xB7 stopped"))}
var lpo,Y8a=2,J8a=160;
var Z8a=b(()=>{sc();Hc();ze();ps();lpo=M(Te(),1)});
export {X8a,tPp,Q8a,lpo,Y8a,J8a,Z8a};
