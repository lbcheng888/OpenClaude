// @ts-nocheck
import {dIe,a$t} from "./m3980.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {PZl,OZl} from "./m5559.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function LMo(e,t=!1){if(e==="4")return t;return e==="0"||e==="1"||e==="2"||e==="3"}
function fQn(e){let t=BZl.c(25),{onSelect:n,inputValue:r,setInputValue:o,message:s,messageBold:i,mountDelayMs:a,showNotSure:l}=e,c=s===void 0?m2m:s,u=i===void 0?!0:i,d=l===void 0?!1:l,p;if(t[0]!==d)p=d?[...MZl,d2m,NZl]:[...MZl,NZl],t[0]=d,t[1]=p;else p=t[1];let m=p,f;if(t[2]!==d)f=(v)=>LMo(v,d),t[2]=d,t[3]=f;else f=t[3];let A;if(t[4]!==n)A=(v)=>n(LZl[v]),t[4]=n,t[5]=A;else A=t[5];let h;if(t[6]!==r||t[7]!==a||t[8]!==o||t[9]!==f||t[10]!==A)h={inputValue:r,setInputValue:o,isValidDigit:f,onDigit:A,mountDelayMs:a},t[6]=r,t[7]=a,t[8]=o,t[9]=f,t[10]=A,t[11]=h;else h=t[11];dIe(h);let g;if(t[12]===Symbol.for("react.memo_cache_sentinel"))g=C5e.default.createElement(Box,{minWidth:2},C5e.default.createElement(Text,{color:"ansi:cyan"},"\u25CF")),t[12]=g;else g=t[12];let _;if(t[13]!==c||t[14]!==u)_=C5e.default.createElement(Box,null,g,C5e.default.createElement(Text,{bold:u,wrap:"wrap"},c)),t[13]=c,t[14]=u,t[15]=_;else _=t[15];let y;if(t[16]!==n||t[17]!==o)y=(v)=>{o(""),n(LZl[v])},t[16]=n,t[17]=o,t[18]=y;else y=t[18];let T;if(t[19]!==m||t[20]!==y)T=C5e.default.createElement(PZl,{options:m,optionWidth:p2m,onSelect:y}),t[19]=m,t[20]=y,t[21]=T;else T=t[21];let S;if(t[22]!==T||t[23]!==_)S=C5e.default.createElement(Box,{flexDirection:"column",marginTop:1},_,T),t[22]=T,t[23]=_,t[24]=S;else S=t[24];return S}
var BZl,C5e,LZl,MZl,d2m,NZl,p2m=10,m2m="How is Claude doing this session? (optional)";
var MMo=b(()=>{ze();OZl();a$t();BZl=M(rt(),1),C5e=M(Te(),1),LZl={"0":"dismissed","1":"bad","2":"fine","3":"good","4":"not_sure"},MZl=[{key:"1",label:"Bad"},{key:"2",label:"Fine"},{key:"3",label:"Good"}],d2m={key:"4",label:"Unsure"},NZl={key:"0",label:"Dismiss"}});
export {LMo,fQn,BZl,C5e,LZl,MZl,d2m,NZl,p2m,m2m,MMo};
