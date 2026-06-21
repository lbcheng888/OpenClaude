// @ts-nocheck
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function VUn(e){let t=aNa.c(8),{param:n,addMargin:r}=e,{text:o}=n,s;if(t[0]!==o)s=Dl(o,"bash-input"),t[0]=o,t[1]=s;else s=t[1];let i=s;if(!i)return null;let a=r?1:0,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=cqe.createElement(Text,{color:"bashBorder"},"! "),t[2]=l;else l=t[2];let c;if(t[3]!==i)c=cqe.createElement(Text,{color:"text"},i),t[3]=i,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==c)u=cqe.createElement(Box,{flexDirection:"row",marginTop:a,backgroundColor:"bashMessageBackgroundColor",paddingRight:1},l,c),t[5]=a,t[6]=c,t[7]=u;else u=t[7];return u}
var aNa,cqe;
var vao=b(()=>{ze();lo();aNa=M(rt(),1),cqe=M(Te(),1)});
export {VUn,aNa,cqe,vao};
