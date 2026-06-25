// @ts-nocheck
import {bR,CK} from "./m327.ts";
import {b} from "../runtime.ts";
function WKo(e){let t=e.values,r=Object.keys(e.values).filter((s)=>typeof t[t[s]]!=="number").map((s)=>t[s]),o=Array.from(new Set(r.map((s)=>typeof s)));return{type:o.length===1?o[0]==="string"?"string":"number":["string","number"],enum:r}}
function GKo(e){return e.target==="openAi"?void 0:{not:bR({...e,currentPath:[...e.currentPath,"not"]})}}
var Wmr=b(()=>{CK()});
export {WKo,GKo,Wmr};
