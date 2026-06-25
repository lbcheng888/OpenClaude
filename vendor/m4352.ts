// @ts-nocheck
import {isClaudeSettingsPath,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {VSr,tvt} from "./m738.ts";
import {b} from "../runtime.ts";
function Ktl(e,t,n){if(!isClaudeSettingsPath(e))return null;if(!VSr(t).isValid)return null;let o=n(),s=VSr(o);if(!s.isValid)return{result:!1,message:`Claude Code settings.json validation failed after edit:
${s.error}

Full schema:
${s.fullSchema}
IMPORTANT: Do not update the env unless explicitly instructed to do so.`,errorCode:10};return null}
var ztl=b(()=>{Xm();tvt()});
export {Ktl,ztl};
