// @ts-nocheck
import {setStartupPolicySnapshot,getStartupPolicySnapshot,lt} from "../src/session/0132_sent.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function Q9n(){setStartupPolicySnapshot(structuredClone(getSettingsForSource("policySettings")))}
function Z9n(){let e=getStartupPolicySnapshot();if(e===void 0)return!0;return!Bun.deepEquals(e,getSettingsForSource("policySettings"))}
var e3n=b(()=>{lt();br()});
export {Q9n,Z9n,e3n};
