// @ts-nocheck
import {Gfe,sIt} from "./m2257.ts";
import {qu,bk} from "./m2291.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function L9l(){kYn.useContext(Gfe);let e=qu.get(process.stdout);return kYn.useMemo(()=>{if(!e)return{setQuery:()=>{},scanElement:()=>[],setPositions:()=>{}};return{setQuery:(t)=>e.setSearchHighlight(t),scanElement:(t)=>e.scanElementSubtree(t),setPositions:(t)=>e.setSearchPositions(t)}},[e])}
var kYn;
var M9l=b(()=>{sIt();bk();kYn=M(Te(),1)});
export {L9l,kYn,M9l};
