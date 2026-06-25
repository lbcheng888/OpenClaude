// @ts-nocheck
import {Q} from "../runtime.ts";
import {sya} from "./m3386.ts";
import {cya} from "./m3387.ts";
import {kLn} from "./m3385.ts";
var pya=Q((xLn)=>{Object.defineProperty(xLn,"__esModule",{value:!0});xLn.getMapping=void 0;var jtp=sya(),Ytp=cya(),Jtp=kLn(),uya=-10,dya=20,Xtp=Array.from({length:31},(e,t)=>{if(t>10)return new Ytp.LogarithmMapping(t-10);return new jtp.ExponentMapping(t-10)});function Qtp(e){if(e>dya||e<uya)throw new Jtp.MappingError(`expected scale >= ${uya} && <= ${dya}, got: ${e}`);return Xtp[e+10]}xLn.getMapping=Qtp});
export {pya};
