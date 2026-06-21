// @ts-nocheck
import {eZn,E1o,Yrc} from "./m5640.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Qrc(e){let t=Xrc.c(9),{children:n}=e,{marker:r}=cV.useContext(Jrc),o=0;for(let l of cV.default.Children.toArray(n)){if(!cV.isValidElement(l)||l.type!==eZn)continue;o++}let s=String(o).length,i;if(t[0]!==n||t[1]!==s||t[2]!==r){let l;if(t[4]!==s||t[5]!==r)l=(c,u)=>{if(!cV.isValidElement(c)||c.type!==eZn)return c;let d=`${String(u+1).padStart(s)}.`,p=`${r}${d}`;return cV.default.createElement(Jrc.Provider,{value:{marker:p}},cV.default.createElement(E1o.Provider,{value:{marker:p}},c))},t[4]=s,t[5]=r,t[6]=l;else l=t[6];i=cV.default.Children.map(n,l),t[0]=n,t[1]=s,t[2]=r,t[3]=i}else i=t[3];let a;if(t[7]!==i)a=cV.default.createElement(Box,{flexDirection:"column"},i),t[7]=i,t[8]=a;else a=t[8];return a}
var Xrc,cV,Jrc,tZn;
var Zrc=b(()=>{ze();Yrc();Xrc=M(rt(),1),cV=M(Te(),1),Jrc=cV.createContext({marker:""});Qrc.Item=eZn;tZn=Qrc});
export {Qrc,Xrc,cV,Jrc,tZn,Zrc};
