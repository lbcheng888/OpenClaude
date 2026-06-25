// @ts-nocheck
import {jtt,_t,cw,uo} from "./m2468.ts";
import {du,iw} from "./m2302.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function _g(e,t){let n=FMi.c(8),r=t===void 0?!0:t,s=Rnt.useContext(jtt)?.setState,i,a;if(n[0]!==r||n[1]!==e||n[2]!==s)i=()=>{if(!r||!s)return;return s((u)=>{if(u.activeOverlays.has(e))return u;let d=new Set(u.activeOverlays);return d.add(e),{...u,activeOverlays:d}}),()=>{s((u)=>{if(!u.activeOverlays.has(e))return u;let d=new Set(u.activeOverlays);return d.delete(e),{...u,activeOverlays:d}})}},a=[e,r,s],n[0]=r,n[1]=e,n[2]=s,n[3]=i,n[4]=a;else i=n[3],a=n[4];Rnt.useEffect(i,a);let l,c;if(n[5]!==r)l=()=>{if(!r)return;return gRd},c=[r],n[5]=r,n[6]=l,n[7]=c;else l=n[6],c=n[7];Rnt.useLayoutEffect(l,c)}
function gRd(){return du.get(process.stdout)?.invalidatePrevFrame()}
function BMi(){return _t(_Rd)}
function _Rd(e){return e.activeOverlays.size>0}
function xhe(){return _t(yRd)}
function yRd(e){for(let t of e.activeOverlays)if(!fRd.has(t))return!0;return!1}
function yvn(){return cw(TRd)??!1}
function TRd(e){for(let t of e.activeOverlays)if(hRd.has(t))return!0;return!1}
var FMi,Rnt,fRd,hRd;
var zR=b(()=>{iw();uo();FMi=x(tt(),1),Rnt=x(et(),1),fRd=new Set(["autocomplete"]),hRd=new Set(["history-search"])});
export {_g,gRd,BMi,_Rd,xhe,yRd,yvn,TRd,FMi,Rnt,fRd,hRd,zR};
