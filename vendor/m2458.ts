// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function F$r(){let e=hwe.useContext(VZe);if(!e)throw ReferenceError("useAppState/useSetAppState cannot be called outside of an <AppStateProvider />");return e}
function mt(e){let t=F$r(),n=()=>{let r=t.getState();return e(r)};return hwe.useSyncExternalStore(t.subscribe,n,n)}
function bo(){return F$r().setState}
function Mc(){return F$r()}
function XR(e){let t=hwe.useContext(VZe);return hwe.useSyncExternalStore(t?t.subscribe:Ild,()=>t?e(t.getState()):void 0)}
var hwe,VZe,Ild=()=>()=>{};
var configProtoStore=b(()=>{hwe=M(Te(),1),VZe=hwe.createContext(null)});
export {F$r,mt,bo,Mc,XR,hwe,VZe,Ild,configProtoStore};
