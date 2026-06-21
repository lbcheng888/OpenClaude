// @ts-nocheck
import {isClaudeSettingsPath,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {hhr,xEt} from "./m733.ts";
import {b} from "../runtime.ts";
function EYa(e,t,n){if(!isClaudeSettingsPath(e))return null;if(!hhr(t).isValid)return null;let o=n(),s=hhr(o);if(!s.isValid)return{result:!1,message:`Claude Code settings.json validation failed after edit:
${s.error}

Full schema:
${s.fullSchema}
IMPORTANT: Do not update the env unless explicitly instructed to do so.`,errorCode:10};return null}
var CYa=b(()=>{nA();xEt()});
export {EYa,CYa};
