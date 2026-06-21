// @ts-nocheck
import {YHr} from "./m1691.ts";
import {tRt} from "./m1697.ts";
import {nVs,rVs} from "./m1705.ts";
import {ZGs,eVs} from "./m1703.ts";
import {b} from "../runtime.ts";
import {use} from "./m1698.ts";
function oVs(e={}){let t=YHr(e!==null&&e!==void 0?e:{});if(e.credentialOptions)t.addPolicy(tRt({credential:e.credentialOptions.credential,scopes:e.credentialOptions.credentialScopes}));return t.addPolicy(nVs(e.serializationOptions),{phase:"Serialize"}),t.addPolicy(ZGs(e.deserializationOptions),{phase:"Deserialize"}),t}
var sVs=b(()=>{eVs();use();rVs()});
export {oVs,sVs};
