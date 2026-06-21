// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getAttacherCaps} from "../src/session/0131_sent.ts";
import {rZe,die} from "./m2292.ts";
import {Lr} from "./m578.ts";
import {Pp,Ms} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {initA8} from "../src/config/0571_externalHttp.ts";
import {hbl,Abl} from "./m4849.ts";
var wom,gbl;
var _bl=b(()=>{lt();rZe();Lr();Pp();wom={type:"local-jsx",name:"scroll-speed",description:"Adjust mouse wheel scroll speed",isEnabled:()=>{if(!Ms())return!1;let e=getAttacherCaps();return!(e?initA8.includes(e.terminal??""):die.isJetBrainsIdeTerminal())},load:()=>Promise.resolve().then(() => (hbl(),Abl))},gbl=wom});
export {wom,gbl,_bl};
