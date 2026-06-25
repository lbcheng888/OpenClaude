// @ts-nocheck
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {LD,oHe} from "./m2814.ts";
import {Fve,o4} from "./m2386.ts";
import {_r,ui} from "./m2463.ts";
import {useTheme,gZ} from "./m2285.ts";
import {$Wi,pjr} from "./m2815.ts";
import {tHe,L1t} from "./m2810.ts";
import {xWi,rHe} from "./m2813.ts";
import {Ansi} from "./m2441.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function BFd(e){try{let t=qt(e),n=TeamDeleteToolName(t),r=e.replaceAll("\\/","/").replace(/\s+/g,""),o=n.replace(/\s+/g,"");if(r!==o)return e;return TeamDeleteToolName(t,null,2)}catch{return e}}
function $Fd(e){if(e.length>UFd)return e;return e.split(`
`).map(BFd).join(`
`)}
function VWi(e,t){if(e.length>WFd)return e;let n=(r)=>r.replace(qFd,(o)=>LD(o,void 0,{themeName:t}));if(!e.includes(Fve))return n(e);return e.split(`
`).map((r)=>r.includes(Fve)?r:n(r)).join(`
`)}
function S1(e){let t=WWi.c(14),{content:n,verbose:r,isError:o,isWarning:s}=e,{columns:i}=_r(),[a]=useTheme(),l=$Wi(),c=GWi.useContext(tHe),u=r||l,d;if(t[0]!==n||t[1]!==a)d=VWi($Fd(n),a),t[0]=n,t[1]=a,t[2]=d;else d=t[2];let p=d,m;e:{if(u){let y;if(t[3]!==p)y=WIn(p),t[3]=p,t[4]=y;else y=t[4];m=y;break e}let T;if(t[5]!==i||t[6]!==p||t[7]!==c)T=WIn(xWi(p,i,c)),t[5]=i,t[6]=p,t[7]=c,t[8]=T;else T=t[8];m=T}let f=m,h=o?"error":s?"warning":void 0,g;if(t[9]!==f)g=qIn.jsx(Ansi,{children:f}),t[9]=f,t[10]=g;else g=t[10];let _;if(t[11]!==h||t[12]!==g)_=qIn.jsx(Yn,{children:qIn.jsx(Text,{color:h,children:g})}),t[11]=h,t[12]=g,t[13]=_;else _=t[13];return _}
function WIn(e){return e.replace(/\u001b\[([0-9]+;)*4(;[0-9]+)*m|\u001b\[4(;[0-9]+)*m|\u001b\[([0-9]+;)*4m/g,"")}
var WWi,GWi,qIn,UFd=1e4,qFd,WFd=1e5;
var sHe=b(()=>{ui();o4();je();oHe();tn();rHe();gZ();Pl();L1t();pjr();WWi=x(tt(),1),GWi=x(et(),1),qIn=x(oe(),1);qFd=/https?:\/\/[^\s"'<>\\\x00-\x1f]+/g});
export {BFd,$Fd,VWi,S1,WIn,WWi,GWi,qIn,UFd,qFd,WFd,sHe};
