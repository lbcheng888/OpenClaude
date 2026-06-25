// @ts-nocheck
import {b} from "../runtime.ts";
import {lLl,iLl} from "./m4997.ts";
import {uLl,cLl} from "./m4998.ts";
var E_m,dLl;
var pLl=b(()=>{E_m={type:"local-jsx",name:"plugin",aliases:["plugins","marketplace"],description:"Manage Claude Code plugins",immediate:!0,load:()=>Promise.resolve().then(() => (lLl(),iLl)),getArgumentCompletions:(e,t)=>Promise.resolve().then(() => (uLl(),cLl)).then((n)=>n.getPluginArgumentCompletions(e,t))},dLl=E_m});
export {E_m,dLl,pLl};
