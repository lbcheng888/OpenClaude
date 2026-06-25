// @ts-nocheck
import {Link,yie} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function q1(e){let t=fUa.c(5),{filePath:n,children:r}=e,o;if(t[0]!==n)o=hUa.pathToFileURL(n),t[0]=n,t[1]=o;else o=t[1];let s=r??n,i;if(t[2]!==o.href||t[3]!==s)i=gUa.jsx(Link,{url:o.href,children:s}),t[2]=o.href,t[3]=s,t[4]=i;else i=t[4];return i}
var fUa,hUa,gUa;
var X0e=b(()=>{yie();fUa=x(tt(),1),hUa=require("url"),gUa=x(oe(),1)});
export {q1,fUa,hUa,gUa,X0e};
