// @ts-nocheck
import {YSe} from "../src/api/0459_getOauthConfig.ts";
import {Box} from "./m2422.ts";
import {wae,Wnt} from "./m3008.ts";
import {NoSelect} from "./m2437.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function p$e({hunks:e,dim:t,width:n,filePath:r,firstLine:o,fileContent:s}){return YSe(e.map((i)=>ghe.createElement(Box,{flexDirection:"column",key:i.newStart},ghe.createElement(wae,{patch:i,dim:t,width:n,filePath:r,firstLine:o,fileContent:s}))),(i)=>ghe.createElement(NoSelect,{fromLeftEdge:!0,key:`ellipsis-${i}`},ghe.createElement(Text,{dimColor:!0},"...")))}
var ghe;
var TLt=b(()=>{ze();Wnt();ghe=M(Te(),1)});
export {p$e,ghe,TLt};
