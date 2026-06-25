// @ts-nocheck
import {xvl,Ivl,Dvl} from "./m4808.ts";
import {yg,_4} from "./m2581.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Lvl(e){let t=Pvl.c(10),{feeds:n,maxWidth:r}=e,o;if(t[0]!==n){let c=n.map(Vcm);o=Math.max(...c),t[0]=n,t[1]=o}else o=t[1];let i=Math.min(o,r),a;if(t[2]!==i||t[3]!==n){let c;if(t[5]!==i||t[6]!==n.length)c=(u,d)=>Xht.jsxs(Ovl.Fragment,{children:[Xht.jsx(xvl,{config:u,actualWidth:i}),d<n.length-1&&Xht.jsx(yg,{color:"claude",width:i})]},d),t[5]=i,t[6]=n.length,t[7]=c;else c=t[7];a=n.map(c),t[2]=i,t[3]=n,t[4]=a}else a=t[4];let l;if(t[8]!==a)l=Xht.jsx(Box,{flexDirection:"column",children:a}),t[8]=a,t[9]=l;else l=t[9];return l}
function Vcm(e){return Ivl(e)}
var Pvl,Ovl,Xht;
var Mvl=b(()=>{je();_4();Dvl();Pvl=x(tt(),1),Ovl=x(et(),1),Xht=x(oe(),1)});
export {Lvl,Vcm,Pvl,Ovl,Xht,Mvl};
