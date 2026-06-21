// @ts-nocheck
import {_Fn,vlt,bte} from "./m3882.ts";
import {qH,Iwe} from "../src/tui/2545_current.ts";
import {at,rs} from "./m2546.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function BCp(e){let n=[...e].filter((o)=>{let s=o.codePointAt(0)??0;if(s<32||s===127)return!1;if(s>=128&&s<=159)return!1;if(s>=8203&&s<=8207||s>=8234&&s<=8238||s>=8294&&s<=8297||s===65279)return!1;return!0}).join("").trim();return(n.length>64?`${n.slice(0,64)}\u2026`:n)||"agent"}
function FCp(e){let t=e,n=NCp.find((o)=>t.startsWith(o));if(n)t=t.slice(n.length);let r=t.lastIndexOf(Wao)+Wao.length;if(r>Wao.length-1){let o=t.slice(r);if(_Fn.includes(o))t=t.slice(0,r)}return t.replace(/^<agent-message[^>]*>\n/,"").replace(/\n<\/agent-message>$/,"")}
function OBa(e){let t=PBa.c(20),{addMargin:n,param:r,fromName:o,isTranscriptMode:s}=e,i;if(t[0]!==o)i=BCp(o),t[0]=o,t[1]=i;else i=t[1];let a=i,l=typeof r.text==="string"?r.text:"",c=qH("app:toggleTranscript","Global","ctrl+o");if(!s){let h=n?1:0,g;if(t[2]!==c)g=w9.createElement(at,{chord:c,action:"expand",parens:!0}),t[2]=c,t[3]=g;else g=t[3];let _;if(t[4]!==a||t[5]!==g)_=w9.createElement(Text,{dimColor:!0},et.pointerSmall," Message from ",a," ",g),t[4]=a,t[5]=g,t[6]=_;else _=t[6];let y;if(t[7]!==h||t[8]!==_)y=w9.createElement(Box,{marginTop:h,width:"100%"},_),t[7]=h,t[8]=_,t[9]=y;else y=t[9];return y}let u=n?1:0,d=`${et.pointerSmall} Message from ${a}`,p;if(t[10]!==d)p=w9.createElement(Text,{dimColor:!0},d),t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==l)m=FCp(l),t[12]=l,t[13]=m;else m=t[13];let f;if(t[14]!==m)f=w9.createElement(Box,{paddingLeft:2},w9.createElement(Text,{wrap:"wrap"},m)),t[14]=m,t[15]=f;else f=t[15];let A;if(t[16]!==u||t[17]!==p||t[18]!==f)A=w9.createElement(Box,{flexDirection:"column",marginTop:u,width:"100%"},p,f),t[16]=u,t[17]=p,t[18]=f,t[19]=A;else A=t[19];return A}
var PBa,w9,NCp,Wao="</agent-message>";
var LBa=b(()=>{Ai();vlt();ze();Iwe();rs();PBa=M(rt(),1),w9=M(Te(),1),NCp=[`${bte} while you were working:
`,`${bte}:
`]});
export {BCp,FCp,OBa,PBa,w9,NCp,Wao,LBa};
