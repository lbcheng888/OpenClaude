// @ts-nocheck
import {X} from "../runtime.ts";
import {mWo} from "./m420.ts";
import {fWo} from "./m421.ts";
import {initLf} from "./m354.ts";
var _Wo=X((DSt,gWo)=>{Object.defineProperty(DSt,"__esModule",{value:!0});var HVe=mWo(),MHc=fWo(),hdr=initLf(),AWo=new hdr.Name("fullFormats"),NHc=new hdr.Name("fastFormats"),gdr=(e,t={keywords:!0})=>{if(Array.isArray(t))return hWo(e,t,HVe.fullFormats,AWo),e;let[n,r]=t.mode==="fast"?[HVe.fastFormats,NHc]:[HVe.fullFormats,AWo],o=t.formats||HVe.formatNames;if(hWo(e,o,n,r),t.keywords)(0,MHc.default)(e);return e};gdr.get=(e,t="full")=>{let r=(t==="fast"?HVe.fastFormats:HVe.fullFormats)[e];if(!r)throw Error(`Unknown format "${e}"`);return r};function hWo(e,t,n,r){var o,s;(o=(s=e.opts.code).formats)!==null&&o!==void 0||(s.formats=hdr._`require("ajv-formats/dist/formats").${r}`);for(let i of t)e.addFormat(i,n[i])}gWo.exports=DSt=gdr;Object.defineProperty(DSt,"__esModule",{value:!0});DSt.default=gdr});
export {_Wo};
