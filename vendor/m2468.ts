// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function _6r(){let e=twe.useContext(jtt);if(!e)throw ReferenceError("useAppState/useSetAppState cannot be called outside of an <AppStateProvider />");return e}
function _t(e){let t=_6r(),n=()=>{let r=t.getState();return e(r)};return twe.useSyncExternalStore(t.subscribe,n,n)}
function bo(){return _6r().setState}
function gc(){return _6r()}
function cw(e){let t=twe.useContext(jtt);return twe.useSyncExternalStore(t?t.subscribe:nTd,()=>t?e(t.getState()):void 0)}
var twe,jtt,nTd=()=>()=>{};
var uo=b(()=>{twe=x(et(),1),jtt=twe.createContext(null)});
export {_6r,_t,bo,gc,cw,twe,jtt,nTd,uo};
