// @ts-nocheck
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {bR,initKp} from "./m609.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function fNa(e){let t=mNa.c(19),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o)s=Dl(o,bR),t[0]=o,t[1]=s;else s=t[1];let i=s,a;if(t[2]!==o)a=Dl(o,"command-args"),t[2]=o,t[3]=a;else a=t[3];let l=a,c=Dl(o,"skill-format")==="true";if(!i)return null;if(c){let h=n?1:0,g;if(t[4]===Symbol.for("react.memo_cache_sentinel"))g=xN.createElement(Text,{color:"subtle"},et.pointer," "),t[4]=g;else g=t[4];let _;if(t[5]!==i)_=xN.createElement(Text,null,g,xN.createElement(Text,{color:"text"},"Skill(",i,")")),t[5]=i,t[6]=_;else _=t[6];let y;if(t[7]!==h||t[8]!==_)y=xN.createElement(Box,{flexDirection:"column",marginTop:h,backgroundColor:"userMessageBackground",paddingRight:1},_),t[7]=h,t[8]=_,t[9]=y;else y=t[9];return y}let u;if(t[10]!==l||t[11]!==i)u=[i,l].filter(Boolean),t[10]=l,t[11]=i,t[12]=u;else u=t[12];let d=`/${u.join(" ")}`,p=n?1:0,m;if(t[13]===Symbol.for("react.memo_cache_sentinel"))m=xN.createElement(Text,{color:"subtle"},et.pointer," "),t[13]=m;else m=t[13];let f;if(t[14]!==d)f=xN.createElement(Text,null,m,xN.createElement(Text,{color:"text"},d)),t[14]=d,t[15]=f;else f=t[15];let A;if(t[16]!==p||t[17]!==f)A=xN.createElement(Box,{flexDirection:"column",marginTop:p,backgroundColor:"userMessageBackground",paddingRight:1},f),t[16]=p,t[17]=f,t[18]=A;else A=t[18];return A}
var mNa,xN;
var ANa=b(()=>{Ai();initKp();ze();lo();mNa=M(rt(),1),xN=M(Te(),1)});
export {fNa,mNa,xN,ANa};
