// @ts-nocheck
import {qL,lo} from "../src/tools/5190_userPromptCount.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {fc,sl} from "./m715.ts";
import {Gn,sc} from "./m2455.ts";
import {lr,readRoster} from "./m2547.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function pMa(e){let t=dMa.c(24),{message:n,screen:r}=e,o=r==="transcript",s;if(t[0]!==n)s=qL(n)||"",t[0]=n,t[1]=s;else s=t[1];let i=s,a=n.summarizeMetadata;if(a){let m;if(t[2]===Symbol.for("react.memo_cache_sentinel"))m=rp.createElement(Box,{minWidth:2},rp.createElement(Text,{"aria-hidden":!0,color:"text"},fc)),t[2]=m;else m=t[2];let f;if(t[3]===Symbol.for("react.memo_cache_sentinel"))f=rp.createElement(Text,{bold:!0},"Summarized conversation"),t[3]=f;else f=t[3];let A;if(t[4]!==o||t[5]!==a)A=!o&&rp.createElement(Gn,null,rp.createElement(Box,{flexDirection:"column"},rp.createElement(Text,{dimColor:!0},"Summarized ",a.messagesSummarized," messages"," ",a.direction==="up_to"?"up to this point":"from this point"),a.userContext&&rp.createElement(Text,{dimColor:!0},"Context: ","\u201C",a.userContext,"\u201D"),rp.createElement(Text,{dimColor:!0},rp.createElement(lr,{action:"app:toggleTranscript",context:"Global",fallback:"ctrl+o",description:"expand history",parens:!0})))),t[4]=o,t[5]=a,t[6]=A;else A=t[6];let h;if(t[7]!==o||t[8]!==i)h=o&&rp.createElement(Gn,null,rp.createElement(Text,null,i)),t[7]=o,t[8]=i,t[9]=h;else h=t[9];let g;if(t[10]!==A||t[11]!==h)g=rp.createElement(Box,{flexDirection:"column",marginTop:1},rp.createElement(Box,{flexDirection:"row"},m,rp.createElement(Box,{flexDirection:"column"},f,A,h))),t[10]=A,t[11]=h,t[12]=g;else g=t[12];return g}let l;if(t[13]===Symbol.for("react.memo_cache_sentinel"))l=rp.createElement(Box,{minWidth:2},rp.createElement(Text,{"aria-hidden":!0,color:"text"},fc)),t[13]=l;else l=t[13];let c;if(t[14]!==o)c=!o&&rp.createElement(Text,{dimColor:!0}," ",rp.createElement(lr,{action:"app:toggleTranscript",context:"Global",fallback:"ctrl+o",description:"expand",parens:!0})),t[14]=o,t[15]=c;else c=t[15];let u;if(t[16]!==c)u=rp.createElement(Box,{flexDirection:"row"},l,rp.createElement(Box,{flexDirection:"column"},rp.createElement(Text,{bold:!0},"Compact summary",c))),t[16]=c,t[17]=u;else u=t[17];let d;if(t[18]!==o||t[19]!==i)d=o&&rp.createElement(Gn,null,rp.createElement(Text,null,i)),t[18]=o,t[19]=i,t[20]=d;else d=t[20];let p;if(t[21]!==u||t[22]!==d)p=rp.createElement(Box,{flexDirection:"column",marginTop:1},u,d),t[21]=u,t[22]=d,t[23]=p;else p=t[23];return p}
var dMa,rp;
var mMa=b(()=>{sl();ze();lo();readRoster();sc();dMa=M(rt(),1),rp=M(Te(),1)});
export {pMa,dMa,rp,mMa};
