// @ts-nocheck
import {ede,NAt} from "./m5300.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {sW,sA} from "./m2782.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Jjl,IOo} from "./m5368.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function e8l({input:e,submitCount:t,hasMessages:n,viewingAgentName:r}){let o=ede(),s=mt((a)=>a.promptSuggestionEnabled);return Zjl.useMemo(()=>{if(e!=="")return;if(r)return`Message @${r.length>Qjl?r.slice(0,Qjl-1)+"\u2026":r}\u2026`;if(o.some(sW)&&(getGlobalConfig().queuedCommandUpHintCount||0)<V0m)return"Press up to edit queued messages";if(t<1&&!n&&s)return Jjl()},[e,o,t,n,s,r])}
var Zjl,V0m=3,Qjl=20;
var t8l=b(()=>{NAt();configProtoStore();Qn();IOo();sA();Zjl=M(Te(),1)});
export {e8l,Zjl,V0m,Qjl,t8l};
