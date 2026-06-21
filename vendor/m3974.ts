// @ts-nocheck
import {Link,Tie} from "./m2427.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function initRN(e){let t=L1a.c(5),{filePath:n,children:r}=e,o;if(t[0]!==n)o=N1a.pathToFileURL(n),t[0]=n,t[1]=o;else o=t[1];let s=r??n,i;if(t[2]!==o.href||t[3]!==s)i=M1a.default.createElement(Link,{url:o.href},s),t[2]=o.href,t[3]=s,t[4]=i;else i=t[4];return i}
var L1a,M1a,N1a;
var uIe=b(()=>{Tie();L1a=M(rt(),1),M1a=M(Te(),1),N1a=require("url")});
export {initRN,L1a,M1a,N1a,uIe};
