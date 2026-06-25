// @ts-nocheck
import {ROr} from "./m1696.ts";
import {kHt} from "./m1702.ts";
import {XJs,QJs} from "./m1710.ts";
import {jJs,YJs} from "./m1708.ts";
import {b} from "../runtime.ts";
import {cse} from "./m1703.ts";
function ZJs(e={}){let t=ROr(e!==null&&e!==void 0?e:{});if(e.credentialOptions)t.addPolicy(kHt({credential:e.credentialOptions.credential,scopes:e.credentialOptions.credentialScopes}));return t.addPolicy(XJs(e.serializationOptions),{phase:"Serialize"}),t.addPolicy(jJs(e.deserializationOptions),{phase:"Deserialize"}),t}
var eXs=b(()=>{YJs();cse();QJs()});
export {ZJs,eXs};
