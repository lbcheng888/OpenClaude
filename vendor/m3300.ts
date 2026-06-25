// @ts-nocheck
import {cc} from "./m2459.ts";
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {ND,s_e} from "./m3298.ts";
import {C3e,nOn} from "./m3299.ts";
import {Box} from "./m2432.ts";
import {formatFileSize,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Git(e){let t=Zma.c(30),{output:n,fullOutput:r,elapsedTimeSeconds:o,totalLines:s,totalBytes:i,timeoutMs:a,verbose:l}=e,c;if(t[0]!==r)c=cc(r.trim()),t[0]=r,t[1]=c;else c=t[1];let u=c,d,p;if(t[2]!==n||t[3]!==u||t[4]!==l)d=cc(n.trim()).split(`
`).filter(QXd),p=l?u:d.slice(-5).join(`
`),t[2]=n,t[3]=u,t[4]=l,t[5]=d,t[6]=p;else d=t[5],p=t[6];let m=p;if(!d.length){let H;if(t[7]===Symbol.for("react.memo_cache_sentinel"))H=N$.jsx(Text,{dimColor:!0,children:"Running\u2026 "}),t[7]=H;else H=t[7];let k;if(t[8]!==o||t[9]!==a)k=N$.jsx(Yn,{children:N$.jsxs(ND,{children:[H,N$.jsx(C3e,{elapsedTimeSeconds:o,timeoutMs:a})]})}),t[8]=o,t[9]=a,t[10]=k;else k=t[10];return k}let f=s?Math.max(0,s-5):0,h="";if(!l&&i&&s)h=`~${s} lines`;else if(!l&&f>0)h=`+${f} lines`;let g=l?void 0:Math.min(5,d.length),_;if(t[11]!==m)_=N$.jsx(Text,{dimColor:!0,children:m}),t[11]=m,t[12]=_;else _=t[12];let T;if(t[13]!==g||t[14]!==_)T=N$.jsx(Box,{height:g,flexDirection:"column",overflow:"hidden",children:_}),t[13]=g,t[14]=_,t[15]=T;else T=t[15];let y;if(t[16]!==h)y=h?N$.jsx(Text,{dimColor:!0,children:h}):null,t[16]=h,t[17]=y;else y=t[17];let S;if(t[18]!==o||t[19]!==a)S=N$.jsx(C3e,{elapsedTimeSeconds:o,timeoutMs:a}),t[18]=o,t[19]=a,t[20]=S;else S=t[20];let E;if(t[21]!==i)E=i?N$.jsx(Text,{dimColor:!0,children:formatFileSize(i)}):null,t[21]=i,t[22]=E;else E=t[22];let R;if(t[23]!==y||t[24]!==S||t[25]!==E)R=N$.jsxs(Box,{flexDirection:"row",gap:1,children:[y,S,E]}),t[23]=y,t[24]=S,t[25]=E,t[26]=R;else R=t[26];let w;if(t[27]!==T||t[28]!==R)w=N$.jsx(Yn,{children:N$.jsx(ND,{children:N$.jsxs(Box,{flexDirection:"column",children:[T,R]})})}),t[27]=T,t[28]=R,t[29]=w;else w=t[29];return w}
function QXd(e){return e}
var Zma,N$;
var rOn=b(()=>{je();Xo();Pl();s_e();nOn();Zma=x(tt(),1),N$=x(oe(),1)});
export {Git,QXd,Zma,N$,rOn};
