// @ts-nocheck
import {detectAndGetBackend,VHe} from "./m4209.ts";
import {Tte,tso} from "./m3877.ts";
import {b} from "../runtime.ts";
async function Kdo(){return(await detectAndGetBackend()).backend}
async function u8a(){let{isInsideTmux:e}=await Promise.resolve().then(() => (Tte(),tso));return e()}
async function d8a(e,t){return(await Kdo()).createTeammatePaneInSwarmView(e,t)}
async function p8a(e,t=!1){return(await Kdo()).enablePaneBorderStatus(e,t)}
async function m8a(e,t,n=!1){return(await Kdo()).sendCommandToPane(e,t,n)}
var f8a=b(()=>{VHe()});
export {Kdo,u8a,d8a,p8a,m8a,f8a};
