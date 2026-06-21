// @ts-nocheck
import {Sk,aS,$g,YFe,JFe,lg} from "./m2269.ts";
import {KO,hZ} from "./m2267.ts";
import {oUe,XS} from "../src/config/2341_XS.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function i0t(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r<32||r===127?" ":e[n]}return t}
function VK(){let e=GK.useContext(w5);if(!e)throw Error("useTerminalNotification must be used within TerminalWriteProvider");let t=GK.useCallback(({message:i,title:a})=>{let l=a?`${a}: ${i}`:i;e(Sk(aS($g.ITERM2,i0t(l))))},[e]),n=GK.useCallback(({message:i,title:a,id:l})=>{e(Sk(aS($g.KITTY,`i=${l}:d=0:p=title`,i0t(a)))),e(Sk(aS($g.KITTY,`i=${l}:p=body`,i0t(i)))),e(Sk(aS($g.KITTY,`i=${l}:d=1:a=focus`,"")))},[e]),r=GK.useCallback(({message:i,title:a})=>{e(Sk(aS($g.GHOSTTY,"notify",i0t(a),i0t(i))))},[e]),o=GK.useCallback(()=>{e(KO)},[e]),s=GK.useCallback((i,a)=>{if(!oUe())return;if(!i){e(Sk(aS($g.ITERM2,YFe.PROGRESS,JFe.CLEAR,"")));return}let l=Math.max(0,Math.min(100,Math.round(a??0)));switch(i){case"completed":e(Sk(aS($g.ITERM2,YFe.PROGRESS,JFe.CLEAR,"")));break;case"error":e(Sk(aS($g.ITERM2,YFe.PROGRESS,JFe.ERROR,l)));break;case"indeterminate":e(Sk(aS($g.ITERM2,YFe.PROGRESS,JFe.INDETERMINATE,"")));break;case"running":e(Sk(aS($g.ITERM2,YFe.PROGRESS,JFe.SET,l)));break;case null:break}},[e]);return GK.useMemo(()=>({notifyITerm2:t,notifyKitty:n,notifyGhostty:r,notifyBell:o,progress:s}),[t,n,r,o,s])}
var GK,w5,OSn;
var F4=b(()=>{XS();hZ();lg();GK=M(Te(),1);w5=GK.createContext(null),OSn=w5.Provider});
export {i0t,VK,GK,w5,OSn,F4};
