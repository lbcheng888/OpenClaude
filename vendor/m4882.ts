// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getAttacherCaps} from "../src/session/0132_sent.ts";
import {Tve,YM} from "./m2279.ts";
import {Ir} from "./m584.ts";
import {tp,Cs} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {C5} from "../src/config/0577_externalHttp.ts";
import {AIl,EIl} from "./m4881.ts";
var Umm,RIl;
var vIl=b(()=>{lt();Tve();Ir();tp();Umm={type:"local-jsx",name:"scroll-speed",description:"Adjust mouse wheel scroll speed",isEnabled:()=>{if(!Cs())return!1;let e=getAttacherCaps();return!(e?C5.includes(e.terminal??""):YM.isJetBrainsIdeTerminal())},load:()=>Promise.resolve().then(() => (AIl(),EIl))},RIl=Umm});
export {Umm,RIl,vIl};
