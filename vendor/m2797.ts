// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function I9i(e){RWr=e}
function D9i(e){xWr=e}
function P9i(){if(!RWr||!xWr)throw Error("MCP skill builders not registered \u2014 loadSkillsDir.ts / client.ts have not been evaluated yet");return{...RWr,...xWr}}
var RWr=null,xWr=null;
var O9i,Axe;
var sLt=b(()=>{O9i=M(Te(),1),Axe=O9i.default.createContext(!1)});
export {I9i,D9i,P9i,RWr,xWr,O9i,Axe,sLt};
