// @ts-nocheck
import {Q} from "../runtime.ts";
import {lYo} from "./m422.ts";
import {cYo} from "./m423.ts";
import {Km} from "./m356.ts";
var mYo=Q((oAt,pYo)=>{Object.defineProperty(oAt,"__esModule",{value:!0});var kze=lYo(),UFc=cYo(),Whr=Km(),uYo=new Whr.Name("fullFormats"),$Fc=new Whr.Name("fastFormats"),Ghr=(e,t={keywords:!0})=>{if(Array.isArray(t))return dYo(e,t,kze.fullFormats,uYo),e;let[n,r]=t.mode==="fast"?[kze.fastFormats,$Fc]:[kze.fullFormats,uYo],o=t.formats||kze.formatNames;if(dYo(e,o,n,r),t.keywords)(0,UFc.default)(e);return e};Ghr.get=(e,t="full")=>{let r=(t==="fast"?kze.fastFormats:kze.fullFormats)[e];if(!r)throw Error(`Unknown format "${e}"`);return r};function dYo(e,t,n,r){var o,s;(o=(s=e.opts.code).formats)!==null&&o!==void 0||(s.formats=Whr._`require("ajv-formats/dist/formats").${r}`);for(let i of t)e.addFormat(i,n[i])}pYo.exports=oAt=Ghr;Object.defineProperty(oAt,"__esModule",{value:!0});oAt.default=Ghr});
export {mYo};
