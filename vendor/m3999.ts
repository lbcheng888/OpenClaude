// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {vbt,initKp,xpe} from "./m609.ts";
import {Text} from "./m2423.ts";
import {X7e,sl} from "./m715.ts";
import {Box} from "./m2422.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var WNa={};
isFullscreenWithTTY(WNa,{UserForkBoilerplateMessage:()=>UserForkBoilerplateMessage});
function UserForkBoilerplateMessage(e){let t=jNa.c(8),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o){let d=o.replace(XEp,"");s=d.startsWith(vbt)?d.slice(vbt.length):d,t[0]=o,t[1]=s}else s=t[1];let i=s,a=n?1:0,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=r_e.createElement(Text,{dimColor:!0},X7e),t[2]=l;else l=t[2];let c;if(t[3]!==i)c=r_e.createElement(Box,{paddingLeft:1},r_e.createElement(Text,null,i)),t[3]=i,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==c)u=r_e.createElement(Box,{marginTop:a,backgroundColor:"userMessageBackground",paddingRight:1},l,c),t[5]=a,t[6]=c,t[7]=u;else u=t[7];return u}
var jNa,r_e,XEp;
var GNa=b(()=>{sl();initKp();ze();jNa=M(rt(),1),r_e=M(Te(),1),XEp=new RegExp(`<${xpe}>[\\s\\S]*?</${xpe}>\\n*`)});
export {WNa,UserForkBoilerplateMessage,jNa,r_e,XEp,GNa};
