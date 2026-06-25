// @ts-nocheck
import {cw,uo} from "./m2468.ts";
import {lw,a4} from "./m2436.ts";
import {Text} from "./m2433.ts";
import {Link,yie} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function KMi(e){let t=GMi.c(15),{imageId:n,backgroundColor:r,isSelected:o}=e,s=o===void 0?!1:o,i=cw((c)=>c.storedImagePaths.get(n)??null)??null,a=`[Image #${n}]`;if(i&&lw()){let c;if(t[0]!==i)c=VMi.pathToFileURL(i),t[0]=i,t[1]=c;else c=t[1];let u=c.href,d,p;if(t[2]!==r||t[3]!==a||t[4]!==s)d=EOt.jsx(Text,{backgroundColor:r,inverse:s,children:a}),p=EOt.jsx(Text,{backgroundColor:r,inverse:s,bold:s,children:a}),t[2]=r,t[3]=a,t[4]=s,t[5]=d,t[6]=p;else d=t[5],p=t[6];let m;if(t[7]!==u||t[8]!==d||t[9]!==p)m=EOt.jsx(Link,{url:u,fallback:d,children:p}),t[7]=u,t[8]=d,t[9]=p,t[10]=m;else m=t[10];return m}let l;if(t[11]!==r||t[12]!==a||t[13]!==s)l=EOt.jsx(Text,{backgroundColor:r,inverse:s,children:a}),t[11]=r,t[12]=a,t[13]=s,t[14]=l;else l=t[14];return l}
var GMi,VMi,EOt;
var zMi=b(()=>{yie();a4();je();uo();GMi=x(tt(),1),VMi=require("url"),EOt=x(oe(),1)});
export {KMi,GMi,VMi,EOt,zMi};
