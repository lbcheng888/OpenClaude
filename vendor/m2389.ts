// @ts-nocheck
import {WUe,Wet,iz,GUe} from "./m2276.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var UF=16;
function fIi(e){let t=mIi.c(6),{children:n}=e,r=vPt.useSyncExternalStore(WUe,Wet),o=vPt.useSyncExternalStore(WUe,iz),s;if(t[0]!==r||t[1]!==o)s={isTerminalFocused:r,terminalFocusState:o},t[0]=r,t[1]=o,t[2]=s;else s=t[2];let i=s,a;if(t[3]!==n||t[4]!==i)a=hIi.jsx(gqr.Provider,{value:i,children:n}),t[3]=n,t[4]=i,t[5]=a;else a=t[5];return a}
var mIi,vPt,hIi,gqr,_qr;
var yqr=b(()=>{GUe();mIi=x(tt(),1),vPt=x(et(),1),hIi=x(oe(),1),gqr=vPt.createContext({isTerminalFocused:!0,terminalFocusState:"unknown"});gqr.displayName="TerminalFocusContext";_qr=gqr});
export {UF,fIi,mIi,vPt,hIi,gqr,_qr,yqr};
