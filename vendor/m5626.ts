// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {jDo,qDo} from "./m5266.ts";
import {f1o,Arc} from "../src/tui/5626_TranscriptHelpMenu.ts";
import {Mc,configProtoStore} from "./m2458.ts";
import {Sf} from "../src/tools/5142_toSlashCommands.ts";
import {Vq} from "./m5187.ts";
import {u_e} from "../src/permissions/4401_content.ts";
import {xYn} from "./m5263.ts";
import {scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {CWt} from "./m5255.ts";
import {Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {O2e} from "../src/config/2733_value.ts";
import {eC} from "./m717.ts";
import {Te} from "./m2253.ts";
var hrc={};
isFullscreenWithTTY(hrc,{launchRepl:()=>launchRepl});
async function launchRepl(e,t,n,r){let{App:o}=await Promise.resolve().then(() => (jDo(),qDo)),{REPL:s}=await Promise.resolve().then(() => (f1o(),Arc));function i(a){let l=Mc(),c=_j.useRef(a.commands),u=_j.useCallback((f)=>{c.current=f},[]),d=_j.useRef(()=>{throw Error("shoji: queryParams called before REPL registered builder")}),p=_j.useCallback((f)=>{d.current=f},[]),[m]=_j.useState(()=>{return});return _j.useEffect(()=>m?()=>m.close():void 0,[m]),_j.default.createElement(s,{...a,engine:m,onCommandsChange:u,onQueryParamsChange:p})}await r(e,_j.default.createElement(o,{...t},_j.default.createElement(i,{...n})))}
var _j;
var A1o=b(()=>{Sf();Vq();u_e();xYn();configProtoStore();scrubPathsConfig();Ao();CWt();Mo();O2e();eC();_j=M(Te(),1)});
export {hrc,launchRepl,_j,A1o};
