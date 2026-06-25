// @ts-nocheck
import {ade,eyt} from "./m5337.ts";
import {_t,uo} from "./m2468.ts";
import {bW,ef} from "./m2794.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {PYl,JFo} from "./m5401.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function NYl({input:e,submitCount:t,hasMessages:n,viewingAgentName:r}){let o=ade(),s=_t((a)=>a.promptSuggestionEnabled);return MYl.useMemo(()=>{if(e!=="")return;if(r)return`Message @${r.length>LYl?r.slice(0,LYl-1)+"\u2026":r}\u2026`;if(o.some(bW)&&(getGlobalConfig().queuedCommandUpHintCount||0)<eUm)return"Press up to edit queued messages";if(t<1&&!n&&s)return PYl()},[e,o,t,n,s,r])}
var MYl,eUm=3,LYl=20;
var FYl=b(()=>{eyt();uo();tr();JFo();ef();MYl=x(et(),1)});
export {NYl,MYl,eUm,LYl,FYl};
