// @ts-nocheck
import {VZe,mt,XR,configProtoStore} from "./m2458.ts";
import {qu,bk} from "./m2291.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function ug(e,t){let n=mIi.c(8),r=t===void 0?!0:t,s=bet.useContext(VZe)?.setState,i,a;if(n[0]!==r||n[1]!==e||n[2]!==s)i=()=>{if(!r||!s)return;return s((u)=>{if(u.activeOverlays.has(e))return u;let d=new Set(u.activeOverlays);return d.add(e),{...u,activeOverlays:d}}),()=>{s((u)=>{if(!u.activeOverlays.has(e))return u;let d=new Set(u.activeOverlays);return d.delete(e),{...u,activeOverlays:d}})}},a=[e,r,s],n[0]=r,n[1]=e,n[2]=s,n[3]=i,n[4]=a;else i=n[3],a=n[4];bet.useEffect(i,a);let l,c;if(n[5]!==r)l=()=>{if(!r)return;return Wfd},c=[r],n[5]=r,n[6]=l,n[7]=c;else l=n[6],c=n[7];bet.useLayoutEffect(l,c)}
function Wfd(){return qu.get(process.stdout)?.invalidatePrevFrame()}
function fIi(){return mt(Gfd)}
function Gfd(e){return e.activeOverlays.size>0}
function Pwe(){return mt(Vfd)}
function Vfd(e){for(let t of e.activeOverlays)if(!qfd.has(t))return!0;return!1}
function HEn(){return XR(Kfd)??!1}
function Kfd(e){for(let t of e.activeOverlays)if(jfd.has(t))return!0;return!1}
var mIi,bet,qfd,jfd;
var ZR=b(()=>{bk();configProtoStore();mIi=M(rt(),1),bet=M(Te(),1),qfd=new Set(["autocomplete"]),jfd=new Set(["history-search"])});
export {ug,Wfd,fIi,Gfd,Pwe,Vfd,HEn,Kfd,mIi,bet,qfd,jfd,ZR};
