// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {hNo,fNo} from "./m5302.ts";
import {N2o,rpc} from "../src/tui/5663_TranscriptHelpMenu.ts";
import {gc,uo} from "./m2468.ts";
import {Mm} from "../src/tools/5174_toSlashCommands.ts";
import {lq} from "./m5221.ts";
import {xye} from "../src/permissions/4423_content.ts";
import {PZn} from "./m5299.ts";
import {kg} from "../src/permissions/4476_toAgentInfos.ts";
import {lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {e7t} from "./m5290.ts";
import {Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {U$e} from "../src/config/2745_value.ts";
import {FS} from "./m722.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var opc={};
ft(opc,{launchRepl:()=>launchRepl});
async function launchRepl(e,t,n,r){let{App:o}=await Promise.resolve().then(() => (hNo(),fNo)),{REPL:s}=await Promise.resolve().then(() => (N2o(),rpc));function i(a){let l=gc(),c=gde.useRef(a.commands),u=gde.useCallback((f)=>{c.current=f},[]),d=gde.useRef(()=>{throw Error("shoji: queryParams called before REPL registered builder")}),p=gde.useCallback((f)=>{d.current=f},[]),[m]=gde.useState(()=>{return});return gde.useEffect(()=>m?()=>m.close():void 0,[m]),trr.jsx(s,{...a,engine:m,onCommandsChange:u,onQueryParamsChange:p})}await r(e,trr.jsx(o,{...t,children:trr.jsx(i,{...n})}))}
var gde,trr;
var F2o=b(()=>{Mm();lq();xye();PZn();uo();kg();lo();e7t();Ro();U$e();FS();gde=x(et(),1),trr=x(oe(),1)});
export {opc,launchRepl,gde,trr,F2o};
