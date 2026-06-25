// @ts-nocheck
import {Mdt,yce} from "./m4046.ts";
import {OGe,j_t,NOe} from "./m5310.ts";
import {b,x} from "../runtime.ts";
import {lZ,q0} from "./m2270.ts";
import {et} from "./m2261.ts";
function NBo(e){MBo.setState((t)=>t.focus===e?t:{focus:e})}
function T$m(){return jQl.useSyncExternalStore(MBo.subscribe,()=>MBo.getState().focus!==null)}
function btr(){let e=T$m(),t=Mdt();return e?"legacy-dialog":t?"typing":null}
function YQl(){let e=OGe(),t=btr();return!e?"none":t!==null?"suppressed":"visible"}
function JQl(){let e=j_t();return btr()!==null?null:e}
var jQl,MBo;
var FBo=b(()=>{yce();lZ();NOe();jQl=x(et(),1),MBo=q0({focus:null})});
export {NBo,T$m,btr,YQl,JQl,jQl,MBo,FBo};
