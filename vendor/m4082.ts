// @ts-nocheck
import {_$n,wut,_te} from "./m3900.ts";
import {yI,gwe} from "../src/tui/2556_current.ts";
import {at,Wo} from "./m2557.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function DPp(e){let n=[...e].filter((o)=>{let s=o.codePointAt(0)??0;if(s<32||s===127)return!1;if(s>=128&&s<=159)return!1;if(s>=8203&&s<=8207||s>=8234&&s<=8238||s>=8294&&s<=8297||s===65279)return!1;return!0}).join("").trim();return(n.length>64?`${n.slice(0,64)}\u2026`:n)||"agent"}
function PPp(e){let t=e,n=xPp.find((o)=>t.startsWith(o));if(n)t=t.slice(n.length);let r=t.lastIndexOf(Hmo)+Hmo.length;if(r>Hmo.length-1){let o=t.slice(r);if(_$n.includes(o))t=t.slice(0,r)}return t.replace(/^<agent-message[^>]*>\n/,"").replace(/\n<\/agent-message>$/,"")}
function i6a(e){let t=s6a.c(20),{addMargin:n,param:r,fromName:o,isTranscriptMode:s}=e,i;if(t[0]!==o)i=DPp(o),t[0]=o,t[1]=i;else i=t[1];let a=i,l=typeof r.text==="string"?r.text:"",c=yI("app:toggleTranscript","Global","ctrl+o");if(!s){let g=n?1:0,_;if(t[2]!==c)_=vye.jsx(at,{chord:c,action:"expand",parens:!0}),t[2]=c,t[3]=_;else _=t[3];let T;if(t[4]!==a||t[5]!==_)T=vye.jsxs(Text,{dimColor:!0,children:[Xe.pointerSmall," Message from ",a," ",_]}),t[4]=a,t[5]=_,t[6]=T;else T=t[6];let y;if(t[7]!==g||t[8]!==T)y=vye.jsx(Box,{marginTop:g,width:"100%",children:T}),t[7]=g,t[8]=T,t[9]=y;else y=t[9];return y}let u=n?1:0,d=`${Xe.pointerSmall} Message from ${a}`,p;if(t[10]!==d)p=vye.jsx(Text,{dimColor:!0,children:d}),t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==l)m=PPp(l),t[12]=l,t[13]=m;else m=t[13];let f;if(t[14]!==m)f=vye.jsx(Box,{paddingLeft:2,children:vye.jsx(Text,{wrap:"wrap",children:m})}),t[14]=m,t[15]=f;else f=t[15];let h;if(t[16]!==u||t[17]!==p||t[18]!==f)h=vye.jsxs(Box,{flexDirection:"column",marginTop:u,width:"100%",children:[p,f]}),t[16]=u,t[17]=p,t[18]=f,t[19]=h;else h=t[19];return h}
var s6a,vye,xPp,Hmo="</agent-message>";
var a6a=b(()=>{Zs();wut();je();gwe();Wo();s6a=x(tt(),1),vye=x(oe(),1),xPp=[`${_te} while you were working:
`,`${_te}:
`]});
export {DPp,PPp,i6a,s6a,vye,xPp,Hmo,a6a};
