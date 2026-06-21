// @ts-nocheck
import {Sct,Sce} from "./m3981.ts";
import {$8e,IAt,FPe} from "./m5273.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {C0} from "./m2262.ts";
function ALo(e){fLo.setState((t)=>t.focus===e?t:{focus:e})}
function uOm(){return dGl.useSyncExternalStore(fLo.subscribe,()=>fLo.getState().focus!==null)}
function TXn(){let e=uOm(),t=Sct();return e?"legacy-dialog":t?"typing":null}
function pGl(){let e=$8e(),t=TXn();return!e?"none":t!==null?"suppressed":"visible"}
function mGl(){let e=IAt();return TXn()!==null?null:e}
var dGl,fLo;
var hLo=b(()=>{Sce();FPe();dGl=M(Te(),1),fLo=C0({focus:null})});
export {ALo,uOm,TXn,pGl,mGl,dGl,fLo,hLo};
