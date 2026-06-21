// @ts-nocheck
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {oWr,QH} from "./m2784.ts";
import {uqe,KUn} from "./m3987.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dNa(e){let t=uNa.c(10),{content:n,verbose:r}=e,o;if(t[0]!==n){let d=Dl(n,"bash-stdout")??"";o=Dl(d,"persisted-output")??oWr(d),t[0]=n,t[1]=o}else o=t[1];let s=o,i;if(t[2]!==n)i=oWr(Dl(n,"bash-stderr")??""),t[2]=n,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==a||t[5]!==s)l={stdout:s,stderr:a},t[4]=a,t[5]=s,t[6]=l;else l=t[6];let c=!!r,u;if(t[7]!==l||t[8]!==c)u=wao.createElement(uqe,{content:l,verbose:c}),t[7]=l,t[8]=c,t[9]=u;else u=t[9];return u}
var uNa,wao;
var pNa=b(()=>{KUn();lo();QH();uNa=M(rt(),1),wao=M(Te(),1)});
export {dNa,uNa,wao,pNa};
