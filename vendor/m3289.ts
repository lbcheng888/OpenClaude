// @ts-nocheck
import {b} from "../runtime.ts";
function qPn(e){return{env:e?.env??process.env,home:e?.homedir??process.env.HOME??Ama.homedir()}}
function WPn(e){let{env:t,home:n}=qPn(e);return t.XDG_STATE_HOME??cBt.join(n,".local","state")}
function Rma(e){let{env:t,home:n}=qPn(e);return t.XDG_CACHE_HOME??cBt.join(n,".cache")}
function Mee(e){let{env:t,home:n}=qPn(e);return t.XDG_DATA_HOME??cBt.join(n,".local","share")}
function Jae(e){let{home:t}=qPn(e);return cBt.join(t,".local","bin")}
var Ama,cBt;
var o_e=b(()=>{Ama=require("os"),cBt=require("path")});
export {qPn,WPn,Rma,Mee,Jae,Ama,cBt,o_e};
