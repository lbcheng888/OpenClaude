// @ts-nocheck
import {U1,Yve} from "./m2365.ts";
import {NoSelect} from "./m2437.ts";
import {Text} from "./m2423.ts";
import {Ansi} from "./m2431.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {e9,sy} from "./m2808.ts";
import {ze} from "./m2452.ts";
import {mc,d7} from "../src/config/0645_maxBytes.ts";
import {Pp,Ms} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {dr,Uu} from "./m231.ts";
import {kUa,xUa} from "./m4050.ts";
import {Txn,NGi} from "../src/config/3007_Txn.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
import {useTheme} from "./m2274.ts";
import {measureElement} from "./m2451.ts";
function Zvp(e){let t=klo.c(13),{line:n,gutterWidth:r}=e,o;if(t[0]!==r||t[1]!==n)o=U1(n,0,r),t[0]=r,t[1]=n,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==r||t[4]!==n)i=U1(n,r),t[3]=r,t[4]=n,t[5]=i;else i=t[5];let a=i,l;if(t[6]!==s)l=Kv.createElement(NoSelect,{fromLeftEdge:!0},Kv.createElement(Text,null,Kv.createElement(Ansi,null,s))),t[6]=s,t[7]=l;else l=t[7];let c;if(t[8]!==a)c=Kv.createElement(Text,null,Kv.createElement(Ansi,null,a)),t[8]=a,t[9]=c;else c=t[9];let u;if(t[10]!==l||t[11]!==c)u=Kv.createElement(Box,{flexDirection:"row"},l,c),t[10]=l,t[11]=c,t[12]=u;else u=t[12];return u}
var klo,Kv,xIe,Qvp=80,mU;
var kIe=b(()=>{e9();ze();mc();Pp();Yve();dr();kUa();Txn();klo=M(rt(),1),Kv=M(Te(),1),xIe=M(Te(),1),mU=xIe.memo(function(t){let n=klo.c(21),{code:r,filePath:o,width:s,dim:i}=t,a=i===void 0?!1:i,l=xIe.useRef(null),[c,u]=xIe.useState(s||Qvp),[d]=useTheme(),m=sy().syntaxHighlightingDisabled??!1,f;if(n[0]!==r||n[1]!==o||n[2]!==m){e:{if(m){f=null;break e}let R=NGi();if(!R){f=null;break e}f=new R(d7(r),o)}n[0]=r,n[1]=o,n[2]=m,n[3]=f}else f=n[3];let A=f,h,g;if(n[4]!==s)h=()=>{if(!s&&l.current){let{width:R}=measureElement(l.current);if(R>0)u(R-2)}},g=[s],n[4]=s,n[5]=h,n[6]=g;else h=n[5],g=n[6];xIe.useEffect(h,g);let _;e:{if(A===null){_=null;break e}let R;if(n[7]!==A||n[8]!==a||n[9]!==c||n[10]!==d)R=A.render(d,c,a),n[7]=A,n[8]=a,n[9]=c,n[10]=d,n[11]=R;else R=n[11];_=R}let y=_,T;e:{if(!Ms()){T=0;break e}let R=Uu(r,`
`)+1,k;if(n[12]!==R)k=R.toString(),n[12]=R,n[13]=k;else k=n[13];T=k.length+2}let S=T,v;if(n[14]!==r||n[15]!==a||n[16]!==o||n[17]!==S||n[18]!==y||n[19]!==m)v=Kv.createElement(Box,{ref:l},y?Kv.createElement(Box,{flexDirection:"column"},y.map((R,k)=>S>0?Kv.createElement(Zvp,{key:k,line:R,gutterWidth:S}):Kv.createElement(Text,{key:k},Kv.createElement(Ansi,null,R)))):Kv.createElement(xUa,{code:r,filePath:o,dim:a,skipColoring:m})),n[14]=r,n[15]=a,n[16]=o,n[17]=S,n[18]=y,n[19]=m,n[20]=v;else v=n[20];return v})});
export {Zvp,klo,Kv,xIe,Qvp,mU,kIe};
