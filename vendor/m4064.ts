// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {XAt,Ud,Mpe} from "./m615.ts";
import {Text} from "./m2433.ts";
import {Yje,Pa} from "./m720.ts";
import {Box} from "./m2432.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var gqa={};
ft(gqa,{UserForkBoilerplateMessage:()=>UserForkBoilerplateMessage});
function UserForkBoilerplateMessage(e){let t=hqa.c(8),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o){let d=o.replace(VDp,"");s=d.startsWith(XAt)?d.slice(XAt.length):d,t[0]=o,t[1]=s}else s=t[1];let i=s,a=n?1:0,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=Bdt.jsx(Text,{dimColor:!0,children:Yje}),t[2]=l;else l=t[2];let c;if(t[3]!==i)c=Bdt.jsx(Box,{paddingLeft:1,children:Bdt.jsx(Text,{children:i})}),t[3]=i,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==c)u=Bdt.jsxs(Box,{marginTop:a,backgroundColor:"userMessageBackground",paddingRight:1,children:[l,c]}),t[5]=a,t[6]=c,t[7]=u;else u=t[7];return u}
var hqa,Bdt,VDp;
var _qa=b(()=>{Pa();Ud();je();hqa=x(tt(),1),Bdt=x(oe(),1),VDp=new RegExp(`<${Mpe}>[\\s\\S]*?</${Mpe}>\\n*`)});
export {gqa,UserForkBoilerplateMessage,hqa,Bdt,VDp,_qa};
