// @ts-nocheck
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {Fzr,Yk} from "./m2796.ts";
import {q6e,x3n} from "./m4052.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function L4a(e){let t=O4a.c(10),{content:n,verbose:r}=e,o;if(t[0]!==n){let d=fl(n,"bash-stdout")??"";o=fl(d,"persisted-output")??Fzr(d),t[0]=n,t[1]=o}else o=t[1];let s=o,i;if(t[2]!==n)i=Fzr(fl(n,"bash-stderr")??""),t[2]=n,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==a||t[5]!==s)l={stdout:s,stderr:a},t[4]=a,t[5]=s,t[6]=l;else l=t[6];let c=!!r,u;if(t[7]!==l||t[8]!==c)u=M4a.jsx(q6e,{content:l,verbose:c}),t[7]=l,t[8]=c,t[9]=u;else u=t[9];return u}
var O4a,M4a;
var N4a=b(()=>{x3n();po();Yk();O4a=x(tt(),1),M4a=x(oe(),1)});
export {L4a,O4a,M4a,N4a};
