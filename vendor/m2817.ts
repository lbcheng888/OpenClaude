// @ts-nocheck
import {Yn,Pl} from "./m2465.ts";
import {wl,sy} from "./m2585.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {S1,sHe} from "./m2816.ts";
import {b,x} from "../runtime.ts";
import {oe} from "./m2275.ts";
function KWi(e){return e.server?`List MCP resources from server "${e.server}"`:"List all MCP resources"}
function zWi(e,t,{verbose:n}){if(!e||e.length===0)return GIn.jsx(Yn,{height:1,children:GIn.jsx(wl,{children:"(No resources found)"})});let r=TeamDeleteToolName(e,null,2);return GIn.jsx(S1,{content:r,verbose:n})}
var GIn;
var jWi=b(()=>{sy();Pl();sHe();tn();GIn=x(oe(),1)});
export {KWi,zWi,GIn,jWi};
