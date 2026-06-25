// @ts-nocheck
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function tbm(e){let t=e.trim();return t.startsWith("{")&&t.endsWith("}")}
function uFl(e,t){let n={...e};if(t){let r=t.enabled===!0&&t.failIfUnavailable===void 0?{...t,failIfUnavailable:!0}:t,o=n.settings;if(o&&!tbm(o))throw Error("Cannot use both a settings file path and the sandbox option. Include the sandbox configuration in your settings file instead.");let s={sandbox:r};if(o)try{s={...qt(o),sandbox:r}}catch{}n.settings=TeamDeleteToolName(s)}return n}
var dFl=b(()=>{tn()});
export {tbm,uFl,dFl};
