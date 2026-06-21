// @ts-nocheck
import {XR,configProtoStore} from "./m2458.ts";
import {JR,U4} from "./m2426.ts";
import {Text} from "./m2423.ts";
import {Link,Tie} from "./m2427.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function SIi(e){let t=yIi.c(15),{imageId:n,backgroundColor:r,isSelected:o}=e,s=o===void 0?!1:o,i=XR((c)=>c.storedImagePaths.get(n)??null)??null,a=`[Image #${n}]`;if(i&&JR()){let c;if(t[0]!==i)c=TIi.pathToFileURL(i),t[0]=i,t[1]=c;else c=t[1];let u=c.href,d,p;if(t[2]!==r||t[3]!==a||t[4]!==s)d=_Ae.createElement(Text,{backgroundColor:r,inverse:s},a),p=_Ae.createElement(Text,{backgroundColor:r,inverse:s,bold:s},a),t[2]=r,t[3]=a,t[4]=s,t[5]=d,t[6]=p;else d=t[5],p=t[6];let m;if(t[7]!==u||t[8]!==d||t[9]!==p)m=_Ae.createElement(Link,{url:u,fallback:d},p),t[7]=u,t[8]=d,t[9]=p,t[10]=m;else m=t[10];return m}let l;if(t[11]!==r||t[12]!==a||t[13]!==s)l=_Ae.createElement(Text,{backgroundColor:r,inverse:s},a),t[11]=r,t[12]=a,t[13]=s,t[14]=l;else l=t[14];return l}
var yIi,_Ae,TIi;
var bIi=b(()=>{Tie();U4();ze();configProtoStore();yIi=M(rt(),1),_Ae=M(Te(),1),TIi=require("url")});
export {SIi,yIi,_Ae,TIi,bIi};
