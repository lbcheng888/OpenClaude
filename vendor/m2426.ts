// @ts-nocheck
import {Nk,tS,Qg,zUe,jUe,hg} from "./m2280.ts";
import {uO,fsModule} from "./m2277.ts";
import {n2e,nS} from "../src/config/2351_nS.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function NPt(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r<32||r===127?" ":e[n]}return t}
function bz(){let e=Sz.useContext(U8);if(!e)throw Error("useTerminalNotification must be used within TerminalWriteProvider");let t=Sz.useCallback(({message:i,title:a})=>{let l=a?`${a}: ${i}`:i;e(Nk(tS(Qg.ITERM2,NPt(l))))},[e]),n=Sz.useCallback(({message:i,title:a,id:l})=>{e(Nk(tS(Qg.KITTY,`i=${l}:d=0:p=title`,NPt(a)))),e(Nk(tS(Qg.KITTY,`i=${l}:p=body`,NPt(i)))),e(Nk(tS(Qg.KITTY,`i=${l}:d=1:a=focus`,"")))},[e]),r=Sz.useCallback(({message:i,title:a})=>{e(Nk(tS(Qg.GHOSTTY,"notify",NPt(a),NPt(i))))},[e]),o=Sz.useCallback(()=>{e(uO)},[e]),s=Sz.useCallback((i,a)=>{if(!n2e())return;if(!i){e(Nk(tS(Qg.ITERM2,zUe.PROGRESS,jUe.CLEAR,"")));return}let l=Math.max(0,Math.min(100,Math.round(a??0)));switch(i){case"completed":e(Nk(tS(Qg.ITERM2,zUe.PROGRESS,jUe.CLEAR,"")));break;case"error":e(Nk(tS(Qg.ITERM2,zUe.PROGRESS,jUe.ERROR,l)));break;case"indeterminate":e(Nk(tS(Qg.ITERM2,zUe.PROGRESS,jUe.INDETERMINATE,"")));break;case"running":e(Nk(tS(Qg.ITERM2,zUe.PROGRESS,jUe.SET,l)));break;case null:break}},[e]);return Sz.useMemo(()=>({notifyITerm2:t,notifyKitty:n,notifyGhostty:r,notifyBell:o,progress:s}),[t,n,r,o,s])}
var Sz,U8,bAn;
var i4=b(()=>{nS();fsModule();hg();Sz=x(et(),1);U8=Sz.createContext(null),bAn=U8.Provider});
export {NPt,bz,Sz,U8,bAn,i4};
