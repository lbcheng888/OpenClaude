// @ts-nocheck
import {XR,configProtoStore} from "./m2458.ts";
import {JR,U4} from "./m2426.ts";
import {Link,Tie} from "./m2427.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Gn,sc} from "./m2455.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function jUn(e){let t=tNa.c(12),{imageId:n,addMargin:r}=e,o=XR((m)=>n!==void 0?m.storedImagePaths.get(n)??null:null)??null,s=XR((m)=>n!==void 0?m.imageDescriptions.get(n)??null:null)??null,i=n?`[Image #${n}]`:"[Image]",a;if(t[0]!==o||t[1]!==i)a=o&&JR()?E9.createElement(Link,{url:nNa.pathToFileURL(o).href},E9.createElement(Text,null,i)):E9.createElement(Text,null,i),t[0]=o,t[1]=i,t[2]=a;else a=t[2];let l=a,c;if(t[3]!==s)c=s?E9.createElement(Text,{dimColor:!0}," ",s):null,t[3]=s,t[4]=c;else c=t[4];let u;if(t[5]!==l||t[6]!==c)u=E9.createElement(Text,null,l,c),t[5]=l,t[6]=c,t[7]=u;else u=t[7];let d=u;if(r){let m;if(t[8]!==d)m=E9.createElement(Box,{marginTop:1},d),t[8]=d,t[9]=m;else m=t[9];return m}let p;if(t[10]!==d)p=E9.createElement(Gn,null,d),t[10]=d,t[11]=p;else p=t[11];return p}
var tNa,E9,nNa;
var yao=b(()=>{Tie();U4();ze();configProtoStore();sc();tNa=M(rt(),1),E9=M(Te(),1),nNa=require("url")});
export {jUn,tNa,E9,nNa,yao};
