// @ts-nocheck
import {b} from "../runtime.ts";
import {Om,x4} from "../src/config/2215_level.ts";
import {pVn,cft} from "../src/telemetry/4910_pVn.ts";
import {Mo,getMainLoopModel} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {hRo,zHl} from "../src/tui/5045_showCurrentEffort.ts";
import {JHl,YHl} from "./m5045.ts";
var ndm,XHl,gRo;
var QHl=b(()=>{Om();pVn();Mo();ndm={type:"local-jsx",name:"effort",description:"Set effort level for model usage",get argumentHint(){return x4(getMainLoopModel())?"[low|medium|high|xhigh|max|ultracode|auto]":"[low|medium|high|xhigh|max|auto]"},get immediate(){return cft()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (hRo(),zHl))},XHl={type:"local",name:"effort",supportsNonInteractive:!0,description:"Set effort level for model usage",get argumentHint(){return x4(getMainLoopModel())?"<low|medium|high|xhigh|max|ultracode|auto>":"<low|medium|high|xhigh|max|auto>"},load:()=>Promise.resolve().then(() => (JHl(),YHl))},gRo=ndm});
export {ndm,XHl,gRo,QHl};
