// @ts-nocheck
import {b} from "../runtime.ts";
function aSr(e){von.set(e,Date.now())}
function sas(e,t){let n=von.get(e);if(n!==void 0&&Date.now()-n<t)return von.delete(e),!0;return!1}
function ias(){von.clear()}
var von;
var won=b(()=>{von=new Map});
export {aSr,sas,ias,von,won};
