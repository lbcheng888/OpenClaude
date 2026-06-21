// @ts-nocheck
import {X} from "../runtime.ts";
import {mTr} from "./m906.ts";
var ifs=X((Bon)=>{Object.defineProperty(Bon,"__esModule",{value:!0});Bon.fromBase64=void 0;var suu=mTr(),iuu=/^[A-Za-z0-9+/]*={0,2}$/,auu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!iuu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,suu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};Bon.fromBase64=auu});
export {ifs};
