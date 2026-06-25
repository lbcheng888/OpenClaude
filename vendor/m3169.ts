// @ts-nocheck
import {S1,sHe} from "./m2816.ts";
import {Yn,Pl} from "./m2465.ts";
import {wl,sy} from "./m2585.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b,x} from "../runtime.ts";
import {oe} from "./m2275.ts";
function jsa(e){if(!e.uri||!e.server)return null;return`List directory resource "${e.uri}" from server "${e.server}"`}
function Ysa(){return"readMcpResourceDir"}
function Jsa(e,t,{verbose:n}){if(e?.error)return KNt.jsx(S1,{content:e.error,verbose:n});if(!e||e.resources.length===0)return KNt.jsx(Yn,{height:1,children:KNt.jsx(wl,{children:"(Empty directory)"})});let r=TeamDeleteToolName(e,null,2);return KNt.jsx(S1,{content:r,verbose:n})}
var KNt;
var Xsa=b(()=>{sy();Pl();sHe();tn();KNt=x(oe(),1)});
export {jsa,Ysa,Jsa,KNt,Xsa};
