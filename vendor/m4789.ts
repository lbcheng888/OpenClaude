// @ts-nocheck
import {Box} from "./m2432.ts";
import {dM,Mon,Pa,Bon,hA,Ql} from "./m720.ts";
import {Text} from "./m2433.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {ay,E$} from "./m2821.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {tx,i_e} from "./m3307.ts";
import {useTimeout} from "./m2460.ts";
import {sn,mc} from "./m237.ts";
import {f2n,ate} from "./m3839.ts";
import {wu,$k} from "../src/tui/2575_current.ts";
import {Oo,ss} from "./m2553.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function lRl(e){let t=YWt.c(10),{live:n,boxRef:r,children:o}=e,s;if(t[0]!==o)s=JI.jsx(Box,{flexDirection:"column",width:Pko-4,height:sRl,children:o}),t[0]=o,t[1]=s;else s=t[1];let i=!n,a=n?"claude":void 0,l=n?`${dM} try it`:`  ${Mon} demo`,c;if(t[2]!==i||t[3]!==a||t[4]!==l)c=JI.jsx(Box,{position:"absolute",marginLeft:Pko-12,children:JI.jsx(Text,{dimColor:i,color:a,children:l})}),t[2]=i,t[3]=a,t[4]=l,t[5]=c;else c=t[5];let u;if(t[6]!==r||t[7]!==s||t[8]!==c)u=JI.jsxs(Box,{ref:r,borderStyle:"round",borderColor:"inactive",paddingX:1,width:Pko,height:sRl+2,children:[s,c]}),t[6]=r,t[7]=s,t[8]=c,t[9]=u;else u=t[9];return u}
function Ilm(e){let t=e.startsWith("#"),n=t?e.slice(1):e,r=[],o=0;for(let s of n.matchAll(Hlm)){if(s.index>o)r.push({text:n.slice(o,s.index)});r.push({text:s[2],color:s[1]}),o=s.index+s[0].length}if(o<n.length)r.push({text:n.slice(o)});if(r.length===0)r.push({text:""});return{dim:t,segments:r}}
function Cue(e){let t=YWt.c(7),{frames:n}=e,r;if(t[0]!==n)r=n.map(Plm),t[0]=n,t[1]=r;else r=t[1];let o=r,s=MA(ay().prefersReducedMotion),[i,a]=useAnimationFrame(s?null:oRl),l=Math.floor(a/oRl)%o.length,c=o[l],u;if(t[2]!==c)u=c.map(xlm),t[2]=c,t[3]=u;else u=t[3];let d;if(t[4]!==i||t[5]!==u)d=JI.jsx(lRl,{boxRef:i,children:u}),t[4]=i,t[5]=u,t[6]=d;else d=t[6];return d}
function xlm(e,t){return JI.jsx(Text,{dimColor:e.dim,children:e.segments.map(Dlm)},t)}
function Dlm(e,t){return JI.jsx(Text,{color:e.color,children:e.text},t)}
function Plm(e){return e.split(`
`).map(Ilm)}
function Flm(e){let t=[];for(let n=0;n<e;n++)t.push({x:Math.floor(Math.random()*uRl),delay:Math.random()*400,speed:0.7+Math.random()*0.6,char:tx(Mlm),color:tx(Nlm)});return t}
function dRl({onDone:e}){let t=zht.useMemo(()=>Flm(40),[]),n=MA(ay().prefersReducedMotion),[r,o]=useAnimationFrame(n?null:Olm),s=zht.useRef(o),i=o-s.current;useTimeout(e,aRl+600,[e]);let a=Array.from({length:Czn},()=>[]);for(let l of t){let c=Math.max(0,i-l.delay),u=Math.floor(c/aRl*Czn*l.speed);if(u>=0&&u<Czn)a[u].push(l)}for(let l of a)l.sort((c,u)=>c.x-u.x);return JI.jsx(Box,{ref:r,position:"absolute",marginLeft:Llm,flexDirection:"column",width:uRl,height:Czn,children:a.map((l,c)=>{let u=0;return JI.jsx(Box,{height:1,children:l.map((d,p)=>{let m=Math.max(0,d.x-u);return u=Math.max(u,d.x)+1,JI.jsxs(Text,{children:[" ".repeat(m),JI.jsx(Text,{color:d.color,children:d.char})]},p)})},c)})})}
function pRl(e){let t=YWt.c(14),{text:n}=e,r=sn(n),o=MA(ay().prefersReducedMotion),[s,i]=useAnimationFrame(o?null:iRl),a=r+20,l=Math.floor(i/iRl)%a-10,c;if(t[0]!==l||t[1]!==n)c=f2n(n,l),t[0]=l,t[1]=n,t[2]=c;else c=t[2];let{before:u,shimmer:d,after:p}=c,m;if(t[3]!==u)m=JI.jsx(Text,{bold:!0,color:"claude",children:u}),t[3]=u,t[4]=m;else m=t[4];let f;if(t[5]!==d)f=JI.jsx(Text,{bold:!0,color:"claudeShimmer",children:d}),t[5]=d,t[6]=f;else f=t[6];let h;if(t[7]!==p)h=JI.jsx(Text,{bold:!0,color:"claude",children:p}),t[7]=p,t[8]=h;else h=t[8];let g;if(t[9]!==s||t[10]!==m||t[11]!==f||t[12]!==h)g=JI.jsxs(Box,{ref:s,children:[m,f,h]}),t[9]=s,t[10]=m,t[11]=f,t[12]=h,t[13]=g;else g=t[13];return g}
function mRl(){let e=YWt.c(11),[t,n]=zht.useState(0),r=cRl[t],o=wu("chat:cycleMode","Chat","shift+tab"),s,i;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={"confirm:cycleMode":()=>n(Blm)},i={context:"Confirmation"},e[0]=s,e[1]=i;else s=e[0],i=e[1];Oo(s,i);let a;if(e[2]!==o)a=JI.jsxs(Text,{dimColor:!0,children:["Press ",o," now",`

`]}),e[2]=o,e[3]=a;else a=e[3];let l=r.symbol?`${r.symbol} `:"  ",c;if(e[4]!==r.color||e[5]!==r.label||e[6]!==l)c=JI.jsxs(Text,{color:r.color,children:[l,r.label]}),e[4]=r.color,e[5]=r.label,e[6]=l,e[7]=c;else c=e[7];let u;if(e[8]!==a||e[9]!==c)u=JI.jsx(lRl,{live:!0,children:JI.jsxs(Text,{children:[a,c]})}),e[8]=a,e[9]=c,e[10]=u;else u=e[10];return u}
function Blm(e){return(e+1)%cRl.length}
var YWt,zht,JI,oRl=3000,Pko=48,sRl=3,Hlm,cRl,iRl=80,Olm=60,aRl=1400,Czn=16,Llm=60,uRl=100,Mlm,Nlm;
var Oko=b(()=>{i_e();ate();Pa();E$();mc();je();ss();$k();qZ();YWt=x(tt(),1),zht=x(et(),1),JI=x(oe(),1);Hlm=/\[(\w+):([^\]]*)\]/g;cRl=[{label:"default",symbol:"",color:"text"},{label:"accept edits on",symbol:"\u23F5\u23F5",color:"autoAccept"},{label:"plan mode on",symbol:Bon,color:"planMode"},{label:"auto mode on",symbol:"\u23F5\u23F5",color:"warning"}],Mlm=[dM,hA,Ql,"\xB7"],Nlm=["claude","success","warning","suggestion","autoAccept"]});
export {lRl,Ilm,Cue,xlm,Dlm,Plm,Flm,dRl,pRl,mRl,Blm,YWt,zht,JI,oRl,Pko,sRl,Hlm,cRl,iRl,Olm,aRl,Czn,Llm,uRl,Mlm,Nlm,Oko};
