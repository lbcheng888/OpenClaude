// @ts-nocheck
import {ID,Sre} from "./m70.ts";
import {TUo,SUo} from "./m95.ts";
import {b} from "../runtime.ts";
function bUo(e,t,n,r,o){if(e===t)return!0;if(e==null||t==null||!ID(e)&&!ID(t))return e!==e&&t!==t;return TUo(e,t,n,r,bUo,o)}
var HWe;
var mKt=b(()=>{SUo();Sre();HWe=bUo});
export {bUo,HWe,mKt};
