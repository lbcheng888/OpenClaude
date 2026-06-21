// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dCo(e){let t=TGn.c(6),{children:n}=e,[r,o]=EI.useState(null),[s,i]=EI.useState(null),a;if(t[0]!==n||t[1]!==s)a=EI.default.createElement(ATl.Provider,{value:s},n),t[0]=n,t[1]=s,t[2]=a;else a=t[2];let l;if(t[3]!==r||t[4]!==a)l=EI.default.createElement(fTl.Provider,{value:o},EI.default.createElement(hTl.Provider,{value:i},EI.default.createElement(mTl.Provider,{value:r},a))),t[3]=r,t[4]=a,t[5]=l;else l=t[5];return l}
function gTl(){return EI.useContext(mTl)}
function _Tl(){return EI.useContext(ATl)}
function yTl(e){let t=TGn.c(4),n=EI.useContext(fTl),r,o;if(t[0]!==e||t[1]!==n)r=()=>{if(!n)return;return n(e),()=>n(null)},o=[n,e],t[0]=e,t[1]=n,t[2]=r,t[3]=o;else r=t[2],o=t[3];EI.useEffect(r,o)}
function TTl(e){let t=TGn.c(4),n=EI.useContext(hTl),r,o;if(t[0]!==e||t[1]!==n)r=()=>{if(!n)return;return n(e),()=>n(null)},o=[n,e],t[0]=e,t[1]=n,t[2]=r,t[3]=o;else r=t[2],o=t[3];EI.useEffect(r,o)}
var TGn,EI,mTl,fTl,ATl,hTl;
var SGn=b(()=>{TGn=M(rt(),1),EI=M(Te(),1),mTl=EI.createContext(null),fTl=EI.createContext(null),ATl=EI.createContext(null),hTl=EI.createContext(null)});
export {dCo,gTl,_Tl,yTl,TTl,TGn,EI,mTl,fTl,ATl,hTl,SGn};
