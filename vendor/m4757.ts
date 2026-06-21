// @ts-nocheck
import {Box} from "./m2422.ts";
import {QM,tnn,sl,onn,lv,fc} from "./m715.ts";
import {Text} from "./m2423.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {sy,e9} from "./m2808.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {q0,Khe} from "./m3291.ts";
import {useTimeout} from "./m2450.ts";
import {tn,Hc} from "./m235.ts";
import {TBn,mte} from "./m3821.ts";
import {ju,wk} from "../src/tui/2564_current.ts";
import {Wo,Ts} from "./m2542.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function pgl(e){let t=Ijt.c(10),{live:n,boxRef:r,children:o}=e,s;if(t[0]!==o)s=uA.createElement(Box,{flexDirection:"column",width:fEo-4,height:cgl},o),t[0]=o,t[1]=s;else s=t[1];let i=!n,a=n?"claude":void 0,l=n?`${QM} try it`:`  ${tnn} demo`,c;if(t[2]!==i||t[3]!==a||t[4]!==l)c=uA.createElement(Box,{position:"absolute",marginLeft:fEo-12},uA.createElement(Text,{dimColor:i,color:a},l)),t[2]=i,t[3]=a,t[4]=l,t[5]=c;else c=t[5];let u;if(t[6]!==r||t[7]!==s||t[8]!==c)u=uA.createElement(Box,{ref:r,borderStyle:"round",borderColor:"inactive",paddingX:1,width:fEo,height:cgl+2},s,c),t[6]=r,t[7]=s,t[8]=c,t[9]=u;else u=t[9];return u}
function gZp(e){let t=e.startsWith("#"),n=t?e.slice(1):e,r=[],o=0;for(let s of n.matchAll(hZp)){if(s.index>o)r.push({text:n.slice(o,s.index)});r.push({text:s[2],color:s[1]}),o=s.index+s[0].length}if(o<n.length)r.push({text:n.slice(o)});if(r.length===0)r.push({text:""});return{dim:t,segments:r}}
function Cue(e){let t=Ijt.c(7),{frames:n}=e,r;if(t[0]!==n)r=n.map(TZp),t[0]=n,t[1]=r;else r=t[1];let o=r,s=Dv(sy().prefersReducedMotion),[i,a]=useAnimationFrame(s?null:lgl),l=Math.floor(a/lgl)%o.length,c=o[l],u;if(t[2]!==c)u=c.map(_Zp),t[2]=c,t[3]=u;else u=t[3];let d;if(t[4]!==i||t[5]!==u)d=uA.createElement(pgl,{boxRef:i},u),t[4]=i,t[5]=u,t[6]=d;else d=t[6];return d}
function _Zp(e,t){return uA.createElement(Text,{key:t,dimColor:e.dim},e.segments.map(yZp))}
function yZp(e,t){return uA.createElement(Text,{key:t,color:e.color},e.text)}
function TZp(e){return e.split(`
`).map(gZp)}
function vZp(e){let t=[];for(let n=0;n<e;n++)t.push({x:Math.floor(Math.random()*fgl),delay:Math.random()*400,speed:0.7+Math.random()*0.6,char:q0(EZp),color:q0(CZp)});return t}
function Agl({onDone:e}){let t=Lmt.useMemo(()=>vZp(40),[]),n=Dv(sy().prefersReducedMotion),[r,o]=useAnimationFrame(n?null:SZp),s=Lmt.useRef(o),i=o-s.current;useTimeout(e,dgl+600,[e]);let a=Array.from({length:NWn},()=>[]);for(let l of t){let c=Math.max(0,i-l.delay),u=Math.floor(c/dgl*NWn*l.speed);if(u>=0&&u<NWn)a[u].push(l)}for(let l of a)l.sort((c,u)=>c.x-u.x);return uA.createElement(Box,{ref:r,position:"absolute",marginLeft:bZp,flexDirection:"column",width:fgl,height:NWn},a.map((l,c)=>{let u=0;return uA.createElement(Box,{key:c,height:1},l.map((d,p)=>{let m=Math.max(0,d.x-u);return u=Math.max(u,d.x)+1,uA.createElement(Text,{key:p}," ".repeat(m),uA.createElement(Text,{color:d.color},d.char))}))}))}
function hgl(e){let t=Ijt.c(14),{text:n}=e,r=tn(n),o=Dv(sy().prefersReducedMotion),[s,i]=useAnimationFrame(o?null:ugl),a=r+20,l=Math.floor(i/ugl)%a-10,c;if(t[0]!==l||t[1]!==n)c=TBn(n,l),t[0]=l,t[1]=n,t[2]=c;else c=t[2];let{before:u,shimmer:d,after:p}=c,m;if(t[3]!==u)m=uA.createElement(Text,{bold:!0,color:"claude"},u),t[3]=u,t[4]=m;else m=t[4];let f;if(t[5]!==d)f=uA.createElement(Text,{bold:!0,color:"claudeShimmer"},d),t[5]=d,t[6]=f;else f=t[6];let A;if(t[7]!==p)A=uA.createElement(Text,{bold:!0,color:"claude"},p),t[7]=p,t[8]=A;else A=t[8];let h;if(t[9]!==s||t[10]!==m||t[11]!==f||t[12]!==A)h=uA.createElement(Box,{ref:s},m,f,A),t[9]=s,t[10]=m,t[11]=f,t[12]=A,t[13]=h;else h=t[13];return h}
function ggl(){let e=Ijt.c(11),[t,n]=Lmt.useState(0),r=mgl[t],o=ju("chat:cycleMode","Chat","shift+tab"),s,i;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={"confirm:cycleMode":()=>n(wZp)},i={context:"Confirmation"},e[0]=s,e[1]=i;else s=e[0],i=e[1];Wo(s,i);let a;if(e[2]!==o)a=uA.createElement(Text,{dimColor:!0},"Press ",o," now",`

`),e[2]=o,e[3]=a;else a=e[3];let l=r.symbol?`${r.symbol} `:"  ",c;if(e[4]!==r.color||e[5]!==r.label||e[6]!==l)c=uA.createElement(Text,{color:r.color},l,r.label),e[4]=r.color,e[5]=r.label,e[6]=l,e[7]=c;else c=e[7];let u;if(e[8]!==a||e[9]!==c)u=uA.createElement(pgl,{live:!0},uA.createElement(Text,null,a,c)),e[8]=a,e[9]=c,e[10]=u;else u=e[10];return u}
function wZp(e){return(e+1)%mgl.length}
var Ijt,uA,Lmt,lgl=3000,fEo=48,cgl=3,hZp,mgl,ugl=80,SZp=60,dgl=1400,NWn=16,bZp=60,fgl=100,EZp,CZp;
var AEo=b(()=>{Khe();mte();sl();e9();Hc();ze();Ts();wk();VZ();Ijt=M(rt(),1),uA=M(Te(),1),Lmt=M(Te(),1);hZp=/\[(\w+):([^\]]*)\]/g;mgl=[{label:"default",symbol:"",color:"text"},{label:"accept edits on",symbol:"\u23F5\u23F5",color:"autoAccept"},{label:"plan mode on",symbol:onn,color:"planMode"},{label:"auto mode on",symbol:"\u23F5\u23F5",color:"warning"}],EZp=[QM,lv,fc,"\xB7"],CZp=["claude","success","warning","suggestion","autoAccept"]});
export {pgl,gZp,Cue,_Zp,yZp,TZp,vZp,Agl,hgl,ggl,wZp,Ijt,uA,Lmt,lgl,fEo,cgl,hZp,mgl,ugl,SZp,dgl,NWn,bZp,fgl,EZp,CZp,AEo};
