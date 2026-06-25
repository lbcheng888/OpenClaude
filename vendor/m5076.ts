// @ts-nocheck
import {b} from "../runtime.ts";
import {Cp,j3} from "../src/config/2223_level.ts";
import {eYn,Egt} from "../src/telemetry/4940_eYn.ts";
import {Ro,getMainLoopModel} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Axo,TNl} from "../src/tui/5075_showCurrentEffort.ts";
import {bNl,SNl} from "./m5075.ts";
var fSm,ENl,Rxo;
var CNl=b(()=>{Cp();eYn();Ro();fSm={type:"local-jsx",name:"effort",description:"Set effort level for model usage",get argumentHint(){return j3(getMainLoopModel())?"[low|medium|high|xhigh|max|ultracode|auto]":"[low|medium|high|xhigh|max|auto]"},get immediate(){return Egt()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (Axo(),TNl))},ENl={type:"local",name:"effort",supportsNonInteractive:!0,description:"Set effort level for model usage",get argumentHint(){return j3(getMainLoopModel())?"<low|medium|high|xhigh|max|ultracode|auto>":"<low|medium|high|xhigh|max|auto>"},load:()=>Promise.resolve().then(() => (bNl(),SNl))},Rxo=fSm});
export {fSm,ENl,Rxo,CNl};
