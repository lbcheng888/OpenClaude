// @ts-nocheck
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {Pw} from "./m2207.ts";
import {lv,QM,sl} from "./m715.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {l_,dU} from "./m3932.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function gNa(e){let t=zUn.c(2),{content:n}=e,r;if(t[0]!==n){let o=Dl(n,"local-command-stdout"),s=Dl(n,"local-command-stderr");if(r=[],o?.trim()&&o.trim()!==Pw)r.push(qy.createElement(hNa,{key:"stdout"},o.trim()));if(s?.trim())r.push(qy.createElement(hNa,{key:"stderr"},s.trim()));t[0]=n,t[1]=r}else r=t[1];if(r.length===0)return null;return r}
function hNa(e){let t=zUn.c(5),{children:n}=e;if(n.startsWith(`${lv} `)||n.startsWith(`${QM} `)){let s;if(t[0]!==n)s=qy.createElement(HEp,null,n),t[0]=n,t[1]=s;else s=t[1];return s}let r;if(t[2]===Symbol.for("react.memo_cache_sentinel"))r=qy.createElement(Text,{dimColor:!0},"  \u23BF  "),t[2]=r;else r=t[2];let o;if(t[3]!==n)o=qy.createElement(Box,{flexDirection:"row"},r,qy.createElement(Box,{flexDirection:"column",flexGrow:1},qy.createElement(l_,null,n))),t[3]=n,t[4]=o;else o=t[4];return o}
function HEp(e){let t=zUn.c(19),{children:n}=e,r=n[0],o,s,i;if(t[0]!==n){let f=n.indexOf(`
`),A=f===-1?n.slice(2):n.slice(2,f);s=f===-1?"":n.slice(f+1).trim();let h=A.indexOf(" \xB7 ");o=h===-1?A:A.slice(0,h),i=h===-1?"":A.slice(h),t[0]=n,t[1]=o,t[2]=s,t[3]=i}else o=t[1],s=t[2],i=t[3];let a=i,l;if(t[4]!==r)l=qy.createElement(Text,{color:"background"},r," "),t[4]=r,t[5]=l;else l=t[5];let c;if(t[6]!==o)c=qy.createElement(Text,{bold:!0},o),t[6]=o,t[7]=c;else c=t[7];let u;if(t[8]!==a)u=a&&qy.createElement(Text,{dimColor:!0},a),t[8]=a,t[9]=u;else u=t[9];let d;if(t[10]!==l||t[11]!==c||t[12]!==u)d=qy.createElement(Text,null,l,c,u),t[10]=l,t[11]=c,t[12]=u,t[13]=d;else d=t[13];let p;if(t[14]!==s)p=s&&qy.createElement(Box,{flexDirection:"row"},qy.createElement(Text,{dimColor:!0},"  \u23BF  "),qy.createElement(Text,{dimColor:!0},s)),t[14]=s,t[15]=p;else p=t[15];let m;if(t[16]!==d||t[17]!==p)m=qy.createElement(Box,{flexDirection:"column"},d,p),t[16]=d,t[17]=p,t[18]=m;else m=t[18];return m}
var zUn,qy;
var _Na=b(()=>{sl();ze();lo();dU();zUn=M(rt(),1),qy=M(Te(),1)});
export {gNa,hNa,HEp,zUn,qy,_Na};
