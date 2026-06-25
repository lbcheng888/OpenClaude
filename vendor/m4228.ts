// @ts-nocheck
import {detectAndGetBackend,sye} from "./m4227.ts";
import {hte,Yco} from "./m3895.ts";
import {b} from "../runtime.ts";
async function Wgo(){return(await detectAndGetBackend()).backend}
async function kza(){let{isInsideTmux:e}=await Promise.resolve().then(() => (hte(),Yco));return e()}
async function Hza(e,t){return(await Wgo()).createTeammatePaneInSwarmView(e,t)}
async function Iza(e,t=!1){return(await Wgo()).enablePaneBorderStatus(e,t)}
async function xza(e,t,n=!1){return(await Wgo()).sendCommandToPane(e,t,n)}
var Dza=b(()=>{sye()});
export {Wgo,kza,Hza,Iza,xza,Dza};
