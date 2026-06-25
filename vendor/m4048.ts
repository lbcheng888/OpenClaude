// @ts-nocheck
import {cw,uo} from "./m2468.ts";
import {lw,a4} from "./m2436.ts";
import {Link,yie} from "./m2437.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Yn,Pl} from "./m2465.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function w3n(e){let t=A4a.c(12),{imageId:n,addMargin:r}=e,o=cw((m)=>n!==void 0?m.storedImagePaths.get(n)??null:null)??null,s=cw((m)=>n!==void 0?m.imageDescriptions.get(n)??null:null)??null,i=n?`[Image #${n}]`:"[Image]",a;if(t[0]!==o||t[1]!==i)a=o&&lw()?Cye.jsx(Link,{url:R4a.pathToFileURL(o).href,children:Cye.jsx(Text,{children:i})}):Cye.jsx(Text,{children:i}),t[0]=o,t[1]=i,t[2]=a;else a=t[2];let l=a,c;if(t[3]!==s)c=s?Cye.jsxs(Text,{dimColor:!0,children:[" ",s]}):null,t[3]=s,t[4]=c;else c=t[4];let u;if(t[5]!==l||t[6]!==c)u=Cye.jsxs(Text,{children:[l,c]}),t[5]=l,t[6]=c,t[7]=u;else u=t[7];let d=u;if(r){let m;if(t[8]!==d)m=Cye.jsx(Box,{marginTop:1,children:d}),t[8]=d,t[9]=m;else m=t[9];return m}let p;if(t[10]!==d)p=Cye.jsx(Yn,{children:d}),t[10]=d,t[11]=p;else p=t[11];return p}
var A4a,R4a,Cye;
var rmo=b(()=>{yie();a4();je();uo();Pl();A4a=x(tt(),1),R4a=require("url"),Cye=x(oe(),1)});
export {w3n,A4a,R4a,Cye,rmo};
