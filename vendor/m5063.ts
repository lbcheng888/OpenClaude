// @ts-nocheck
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function Wdm(e){let t=e.trim();return t.startsWith("{")&&t.endsWith("}")}
function BIl(e,t){let n={...e};if(t){let r=t.enabled===!0&&t.failIfUnavailable===void 0?{...t,failIfUnavailable:!0}:t,o=n.settings;if(o&&!Wdm(o))throw Error("Cannot use both a settings file path and the sandbox option. Include the sandbox configuration in your settings file instead.");let s={sandbox:r};if(o)try{s={...qt(o),sandbox:r}}catch{}n.settings=Le(s)}return n}
var FIl=b(()=>{Xt()});
export {Wdm,BIl,FIl};
