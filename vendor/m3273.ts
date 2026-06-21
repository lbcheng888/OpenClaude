// @ts-nocheck
import {b} from "../runtime.ts";
function QIn(e){return{env:e?.env??process.env,home:e?.homedir??process.env.HOME??_ia.homedir()}}
function ZIn(e){let{env:t,home:n}=QIn(e);return t.XDG_STATE_HOME??D1t.join(n,".local","state")}
function yia(e){let{env:t,home:n}=QIn(e);return t.XDG_CACHE_HOME??D1t.join(n,".cache")}
function Whe(e){let{env:t,home:n}=QIn(e);return t.XDG_DATA_HOME??D1t.join(n,".local","share")}
function Xae(e){let{home:t}=QIn(e);return D1t.join(t,".local","bin")}
var _ia,D1t;
var Ske=b(()=>{_ia=require("os"),D1t=require("path")});
export {QIn,ZIn,yia,Whe,Xae,_ia,D1t,Ske};
