// @ts-nocheck
import {crr,t$o,Gpc} from "./m5681.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function zpc(e){let t=Kpc.c(9),{children:n}=e,{marker:r}=gVe.useContext(Vpc),o=0;for(let l of n$o.Children.toArray(n)){if(!gVe.isValidElement(l)||l.type!==crr)continue;o++}let s=String(o).length,i;if(t[0]!==n||t[1]!==s||t[2]!==r){let l;if(t[4]!==s||t[5]!==r)l=(c,u)=>{if(!gVe.isValidElement(c)||c.type!==crr)return c;let d=`${String(u+1).padStart(s)}.`,p=`${r}${d}`;return urr.jsx(Vpc.Provider,{value:{marker:p},children:urr.jsx(t$o.Provider,{value:{marker:p},children:c})})},t[4]=s,t[5]=r,t[6]=l;else l=t[6];i=n$o.Children.map(n,l),t[0]=n,t[1]=s,t[2]=r,t[3]=i}else i=t[3];let a;if(t[7]!==i)a=urr.jsx(Box,{flexDirection:"column",children:i}),t[7]=i,t[8]=a;else a=t[8];return a}
var Kpc,n$o,gVe,urr,Vpc,drr;
var jpc=b(()=>{je();Gpc();Kpc=x(tt(),1),n$o=x(et(),1),gVe=x(et(),1),urr=x(oe(),1),Vpc=gVe.createContext({marker:""});zpc.Item=crr;drr=zpc});
export {zpc,Kpc,n$o,gVe,urr,Vpc,drr,jpc};
