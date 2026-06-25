// @ts-nocheck
import {S1,sHe} from "./m2816.ts";
import {Box} from "./m2432.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function dia(e){if(!e.uri||!e.server)return null;return`Read resource "${e.uri}" from server "${e.server}"`}
function pia(){return"readMcpResource"}
function mia(e,t,{verbose:n}){if(e?.error)return Yst.jsx(S1,{content:e.error,verbose:n});if(!e||!e.contents||e.contents.length===0)return Yst.jsx(Box,{justifyContent:"space-between",overflowX:"hidden",width:"100%",children:Yst.jsx(Yn,{height:1,children:Yst.jsx(Text,{dimColor:!0,children:"(No content)"})})});let r=TeamDeleteToolName(e,null,2);return Yst.jsx(S1,{content:r,verbose:n})}
var Yst;
var fia=b(()=>{Pl();sHe();je();tn();Yst=x(oe(),1)});
export {dia,pia,mia,Yst,fia};
