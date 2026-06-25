// @ts-nocheck
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function HHo(e){let t=cjn.c(6),{children:n}=e,[r,o]=tU.useState(null),[s,i]=tU.useState(null),a;if(t[0]!==n||t[1]!==s)a=fGt.jsx(Tkl.Provider,{value:s,children:n}),t[0]=n,t[1]=s,t[2]=a;else a=t[2];let l;if(t[3]!==r||t[4]!==a)l=fGt.jsx(ykl.Provider,{value:o,children:fGt.jsx(Skl.Provider,{value:i,children:fGt.jsx(_kl.Provider,{value:r,children:a})})}),t[3]=r,t[4]=a,t[5]=l;else l=t[5];return l}
function bkl(){return tU.useContext(_kl)}
function Ekl(){return tU.useContext(Tkl)}
function Ckl(e){let t=cjn.c(4),n=tU.useContext(ykl),r,o;if(t[0]!==e||t[1]!==n)r=()=>{if(!n)return;return n(e),()=>n(null)},o=[n,e],t[0]=e,t[1]=n,t[2]=r,t[3]=o;else r=t[2],o=t[3];tU.useEffect(r,o)}
function Akl(e){let t=cjn.c(4),n=tU.useContext(Skl),r,o;if(t[0]!==e||t[1]!==n)r=()=>{if(!n)return;return n(e),()=>n(null)},o=[n,e],t[0]=e,t[1]=n,t[2]=r,t[3]=o;else r=t[2],o=t[3];tU.useEffect(r,o)}
var cjn,tU,fGt,_kl,ykl,Tkl,Skl;
var hGt=b(()=>{cjn=x(tt(),1),tU=x(et(),1),fGt=x(oe(),1),_kl=tU.createContext(null),ykl=tU.createContext(null),Tkl=tU.createContext(null),Skl=tU.createContext(null)});
export {HHo,bkl,Ekl,Ckl,Akl,cjn,tU,fGt,_kl,ykl,Tkl,Skl,hGt};
