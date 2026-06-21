// @ts-nocheck
import {X} from "../runtime.ts";
import {Zis} from "./m813.ts";
import {Fbe} from "./m792.ts";
var nas=X((Igr)=>{Object.defineProperty(Igr,"__esModule",{value:!0});Igr.splitStream=Ltu;var eas=require("stream"),Otu=Zis(),tas=Fbe();async function Ltu(e){if((0,tas.isReadableStream)(e)||(0,tas.isBlob)(e))return(0,Otu.splitStream)(e);let t=new eas.PassThrough,n=new eas.PassThrough;return e.pipe(t),e.pipe(n),[t,n]}});
export {nas};
