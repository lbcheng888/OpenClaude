// @ts-nocheck
import {ZM,Ove} from "./m2375.ts";
import {NoSelect} from "./m2447.ts";
import {Text} from "./m2433.ts";
import {Ansi} from "./m2441.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {E$,ay} from "./m2821.ts";
import {je} from "./m2462.ts";
import {Xl,FK} from "../src/config/0651_maxBytes.ts";
import {tp,Cs} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {lr,nu} from "./m233.ts";
import {BBa,FBa} from "./m3917.ts";
import {u0n,xXi} from "../src/config/3020_u0n.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
import {useTheme} from "./m2285.ts";
import {measureElement} from "./m2461.ts";
function dkp(e){let t=Nuo.c(13),{line:n,gutterWidth:r}=e,o;if(t[0]!==r||t[1]!==n)o=ZM(n,0,r),t[0]=r,t[1]=n,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==r||t[4]!==n)i=ZM(n,r),t[3]=r,t[4]=n,t[5]=i;else i=t[5];let a=i,l;if(t[6]!==s)l=Bq.jsx(NoSelect,{fromLeftEdge:!0,children:Bq.jsx(Text,{children:Bq.jsx(Ansi,{children:s})})}),t[6]=s,t[7]=l;else l=t[7];let c;if(t[8]!==a)c=Bq.jsx(Text,{children:Bq.jsx(Ansi,{children:a})}),t[8]=a,t[9]=c;else c=t[9];let u;if(t[10]!==l||t[11]!==c)u=Bq.jsxs(Box,{flexDirection:"row",children:[l,c]}),t[10]=l,t[11]=c,t[12]=u;else u=t[12];return u}
var Nuo,z0e,Bq,ukp=80,xB;
var j0e=b(()=>{E$();je();Xl();tp();Ove();lr();BBa();u0n();Nuo=x(tt(),1),z0e=x(et(),1),Bq=x(oe(),1),xB=z0e.memo(function(t){let n=Nuo.c(21),{code:r,filePath:o,width:s,dim:i}=t,a=i===void 0?!1:i,l=z0e.useRef(null),[c,u]=z0e.useState(s||ukp),[d]=useTheme(),m=ay().syntaxHighlightingDisabled??!1,f;if(n[0]!==r||n[1]!==o||n[2]!==m){e:{if(m){f=null;break e}let w=xXi();if(!w){f=null;break e}f=new w(FK(r),o)}n[0]=r,n[1]=o,n[2]=m,n[3]=f}else f=n[3];let h=f,g,_;if(n[4]!==s)g=()=>{if(!s&&l.current){let{width:w}=measureElement(l.current);if(w>0)u(w-2)}},_=[s],n[4]=s,n[5]=g,n[6]=_;else g=n[5],_=n[6];z0e.useEffect(g,_);let T;e:{if(h===null){T=null;break e}let w;if(n[7]!==h||n[8]!==a||n[9]!==c||n[10]!==d)w=h.render(d,c,a),n[7]=h,n[8]=a,n[9]=c,n[10]=d,n[11]=w;else w=n[11];T=w}let y=T,S;e:{if(!Cs()){S=0;break e}let w=nu(r,`
`)+1,H;if(n[12]!==w)H=w.toString(),n[12]=w,n[13]=H;else H=n[13];S=H.length+2}let E=S,R;if(n[14]!==r||n[15]!==a||n[16]!==o||n[17]!==E||n[18]!==y||n[19]!==m)R=Bq.jsx(Box,{ref:l,children:y?Bq.jsx(Box,{flexDirection:"column",children:y.map((w,H)=>E>0?Bq.jsx(dkp,{line:w,gutterWidth:E},H):Bq.jsx(Text,{children:Bq.jsx(Ansi,{children:w})},H))}):Bq.jsx(FBa,{code:r,filePath:o,dim:a,skipColoring:m})}),n[14]=r,n[15]=a,n[16]=o,n[17]=E,n[18]=y,n[19]=m,n[20]=R;else R=n[20];return R})});
export {dkp,Nuo,z0e,Bq,ukp,xB,j0e};
