// @ts-nocheck
import {xEe} from "../src/api/0465_getOauthConfig.ts";
import {Box} from "./m2432.ts";
import {wae,Jot} from "./m3021.ts";
import {NoSelect} from "./m2447.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function h9e({hunks:e,dim:t,width:n,filePath:r,firstLine:o,fileContent:s}){return xEe(e.map((i)=>z1t.jsx(Box,{flexDirection:"column",children:z1t.jsx(wae,{patch:i,dim:t,width:n,filePath:r,firstLine:o,fileContent:s})},i.newStart)),(i)=>z1t.jsx(NoSelect,{fromLeftEdge:!0,children:z1t.jsx(Text,{dimColor:!0,children:"..."})},`ellipsis-${i}`))}
var z1t;
var j1t=b(()=>{je();Jot();z1t=x(oe(),1)});
export {h9e,z1t,j1t};
