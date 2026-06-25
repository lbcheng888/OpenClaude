// @ts-nocheck
import {nhe,PDt} from "./m2265.ts";
import {du,iw} from "./m2302.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function UVl(){LZn.useContext(nhe);let e=du.get(process.stdout);return LZn.useMemo(()=>{if(!e)return{setQuery:()=>{},scanElement:()=>[],setPositions:()=>{}};return{setQuery:(t)=>e.setSearchHighlight(t),scanElement:(t)=>e.scanElementSubtree(t),setPositions:(t)=>e.setSearchPositions(t)}},[e])}
var LZn;
var $Vl=b(()=>{PDt();iw();LZn=x(et(),1)});
export {UVl,LZn,$Vl};
