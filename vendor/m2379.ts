// @ts-nocheck
import {WFe,jQe,IK,GFe} from "./m2266.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var gF=16;
function oCi(e){let t=rCi.c(6),{children:n}=e,r=pUe.useSyncExternalStore(WFe,jQe),o=pUe.useSyncExternalStore(WFe,IK),s;if(t[0]!==r||t[1]!==o)s={isTerminalFocused:r,terminalFocusState:o},t[0]=r,t[1]=o,t[2]=s;else s=t[2];let i=s,a;if(t[3]!==n||t[4]!==i)a=pUe.default.createElement(B2r.Provider,{value:i},n),t[3]=n,t[4]=i,t[5]=a;else a=t[5];return a}
var rCi,pUe,B2r,F2r;
var U2r=b(()=>{GFe();rCi=M(rt(),1),pUe=M(Te(),1),B2r=pUe.createContext({isTerminalFocused:!0,terminalFocusState:"unknown"});B2r.displayName="TerminalFocusContext";F2r=B2r});
export {gF,oCi,rCi,pUe,B2r,F2r,U2r};
