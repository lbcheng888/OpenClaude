// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {ic,Ny} from "./m2574.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Sq,a$e} from "./m2803.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Q9i(e){return e.server?`List MCP resources from server "${e.server}"`:"List all MCP resources"}
function Z9i(e,t,{verbose:n}){if(!e||e.length===0)return l$e.createElement(Gn,{height:1},l$e.createElement(ic,null,"(No resources found)"));let r=Le(e,null,2);return l$e.createElement(Sq,{content:r,verbose:n})}
var l$e;
var e3i=b(()=>{Ny();sc();a$e();Xt();l$e=M(Te(),1)});
export {Q9i,Z9i,l$e,e3i};
