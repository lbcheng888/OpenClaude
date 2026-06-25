// @ts-nocheck
import {_xe,Y3t} from "./m4045.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {blc,Elc} from "./m5597.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function o2o(e,t=!1){if(e==="4")return t;return e==="0"||e==="1"||e==="2"||e==="3"}
function _nr(e){let t=vlc.c(25),{onSelect:n,inputValue:r,setInputValue:o,message:s,messageBold:i,mountDelayMs:a,showNotSure:l}=e,c=s===void 0?VWm:s,u=i===void 0?!0:i,d=l===void 0?!1:l,p;if(t[0]!==d)p=d?[...Alc,WWm,Rlc]:[...Alc,Rlc],t[0]=d,t[1]=p;else p=t[1];let m=p,f;if(t[2]!==d)f=(R)=>o2o(R,d),t[2]=d,t[3]=f;else f=t[3];let h;if(t[4]!==n)h=(R)=>n(Clc[R]),t[4]=n,t[5]=h;else h=t[5];let g;if(t[6]!==r||t[7]!==a||t[8]!==o||t[9]!==f||t[10]!==h)g={inputValue:r,setInputValue:o,isValidDigit:f,onDigit:h,mountDelayMs:a},t[6]=r,t[7]=a,t[8]=o,t[9]=f,t[10]=h,t[11]=g;else g=t[11];_xe(g);let _;if(t[12]===Symbol.for("react.memo_cache_sentinel"))_=iLe.jsx(Box,{minWidth:2,children:iLe.jsx(Text,{color:"ansi:cyan",children:"\u25CF"})}),t[12]=_;else _=t[12];let T;if(t[13]!==c||t[14]!==u)T=iLe.jsxs(Box,{children:[_,iLe.jsx(Text,{bold:u,wrap:"wrap",children:c})]}),t[13]=c,t[14]=u,t[15]=T;else T=t[15];let y;if(t[16]!==n||t[17]!==o)y=(R)=>{o(""),n(Clc[R])},t[16]=n,t[17]=o,t[18]=y;else y=t[18];let S;if(t[19]!==m||t[20]!==y)S=iLe.jsx(blc,{options:m,optionWidth:GWm,onSelect:y}),t[19]=m,t[20]=y,t[21]=S;else S=t[21];let E;if(t[22]!==S||t[23]!==T)E=iLe.jsxs(Box,{flexDirection:"column",marginTop:1,children:[T,S]}),t[22]=S,t[23]=T,t[24]=E;else E=t[24];return E}
var vlc,iLe,Clc,Alc,WWm,Rlc,GWm=10,VWm="How is Claude doing this session? (optional)";
var s2o=b(()=>{je();Elc();Y3t();vlc=x(tt(),1),iLe=x(oe(),1),Clc={"0":"dismissed","1":"bad","2":"fine","3":"good","4":"not_sure"},Alc=[{key:"1",label:"Bad"},{key:"2",label:"Fine"},{key:"3",label:"Good"}],WWm={key:"4",label:"Unsure"},Rlc={key:"0",label:"Dismiss"}});
export {o2o,_nr,vlc,iLe,Clc,Alc,WWm,Rlc,GWm,VWm,s2o};
