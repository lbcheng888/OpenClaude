// @ts-nocheck
import {Sq,a$e} from "./m2803.ts";
import {Box} from "./m2422.ts";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function uZi(e){if(!e.uri||!e.server)return null;return`Read resource "${e.uri}" from server "${e.server}"`}
function dZi(){return"readMcpResource"}
function pZi(e,t,{verbose:n}){if(e?.error)return Oee.createElement(Sq,{content:e.error,verbose:n});if(!e||!e.contents||e.contents.length===0)return Oee.createElement(Box,{justifyContent:"space-between",overflowX:"hidden",width:"100%"},Oee.createElement(Gn,{height:1},Oee.createElement(Text,{dimColor:!0},"(No content)")));let r=Le(e,null,2);return Oee.createElement(Sq,{content:r,verbose:n})}
var Oee;
var mZi=b(()=>{sc();a$e();ze();Xt();Oee=M(Te(),1)});
export {uZi,dZi,pZi,Oee,mZi};
