// @ts-nocheck
import {b} from "../runtime.ts";
function DAr(e){Vtn.set(e,Date.now())}
function cts(e,t){let n=Vtn.get(e);if(n!==void 0&&Date.now()-n<t)return Vtn.delete(e),!0;return!1}
function uts(){Vtn.clear()}
var Vtn;
var Ktn=b(()=>{Vtn=new Map});
export {DAr,cts,uts,Vtn,Ktn};
