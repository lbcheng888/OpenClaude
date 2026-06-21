// @ts-nocheck
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {MF,s$e} from "./m2801.ts";
import {Zve,N4} from "./m2376.ts";
import {mr,ki} from "./m2453.ts";
import {useTheme,SZ} from "./m2274.ts";
import {z9i,HWr} from "./m2802.ts";
import {Axe,sLt} from "./m2797.ts";
import {F9i,o$e} from "./m2800.ts";
import {Ansi} from "./m2431.ts";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Zkd(e){try{let t=qt(e),n=Le(t),r=e.replaceAll("\\/","/").replace(/\s+/g,""),o=n.replace(/\s+/g,"");if(r!==o)return e;return Le(t,null,2)}catch{return e}}
function tHd(e){if(e.length>eHd)return e;return e.split(`
`).map(Zkd).join(`
`)}
function X9i(e,t){if(e.length>rHd)return e;let n=(r)=>r.replace(nHd,(o)=>MF(o,void 0,{themeName:t}));if(!e.includes(Zve))return n(e);return e.split(`
`).map((r)=>r.includes(Zve)?r:n(r)).join(`
`)}
function Sq(e){let t=Y9i.c(14),{content:n,verbose:r,isError:o,isWarning:s}=e,{columns:i}=mr(),[a]=useTheme(),l=z9i(),c=J9i.useContext(Axe),u=r||l,d;if(t[0]!==n||t[1]!==a)d=X9i(tHd(n),a),t[0]=n,t[1]=a,t[2]=d;else d=t[2];let p=d,m;e:{if(u){let y;if(t[3]!==p)y=exn(p),t[3]=p,t[4]=y;else y=t[4];m=y;break e}let _;if(t[5]!==i||t[6]!==p||t[7]!==c)_=exn(F9i(p,i,c)),t[5]=i,t[6]=p,t[7]=c,t[8]=_;else _=t[8];m=_}let f=m,A=o?"error":s?"warning":void 0,h;if(t[9]!==f)h=i$e.createElement(Ansi,null,f),t[9]=f,t[10]=h;else h=t[10];let g;if(t[11]!==A||t[12]!==h)g=i$e.createElement(Gn,null,i$e.createElement(Text,{color:A},h)),t[11]=A,t[12]=h,t[13]=g;else g=t[13];return g}
function exn(e){return e.replace(/\u001b\[([0-9]+;)*4(;[0-9]+)*m|\u001b\[4(;[0-9]+)*m|\u001b\[([0-9]+;)*4m/g,"")}
var Y9i,i$e,J9i,eHd=1e4,nHd,rHd=1e5;
var a$e=b(()=>{ki();N4();ze();s$e();Xt();o$e();SZ();sc();sLt();HWr();Y9i=M(rt(),1),i$e=M(Te(),1),J9i=M(Te(),1);nHd=/https?:\/\/[^\s"'<>\\\x00-\x1f]+/g});
export {Zkd,tHd,X9i,Sq,exn,Y9i,i$e,J9i,eHd,nHd,rHd,a$e};
