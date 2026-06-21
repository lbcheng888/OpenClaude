// @ts-nocheck
import {useTheme} from "./m2274.ts";
import {Box} from "./m2422.ts";
import {S5r} from "./m2757.ts";
import {$1} from "./m2366.ts";
import {tn,Hc} from "./m235.ts";
import {Text} from "./m2423.ts";
import {NoSelect} from "./m2437.ts";
import {b,M} from "../runtime.ts";
import {W2e} from "./m2761.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function UGi(e){let t=FGi.c(10),{patch:n,dim:r,width:o}=e,[s]=useTheme(),i;if(t[0]!==r||t[1]!==n.lines||t[2]!==n.oldStart||t[3]!==s||t[4]!==o)i=CMd(n.lines,n.oldStart,o,r,s),t[0]=r,t[1]=n.lines,t[2]=n.oldStart,t[3]=s,t[4]=o,t[5]=i;else i=t[5];let a=i,l;if(t[6]!==a)l=a.map(yMd),t[6]=a,t[7]=l;else l=t[7];let c;if(t[8]!==l)c=ux.createElement(Box,{flexDirection:"column",flexGrow:1},l),t[8]=l,t[9]=c;else c=t[9];return c}
function yMd(e,t){return ux.createElement(Box,{key:t},e)}
function TMd(e){return e.map((t)=>{if(t.startsWith("+"))return{code:t.slice(1),i:0,type:"add",originalCode:t.slice(1)};if(t.startsWith("-"))return{code:t.slice(1),i:0,type:"remove",originalCode:t.slice(1)};return{code:t.slice(1),i:0,type:"nochange",originalCode:t.slice(1)}})}
function SMd(e){let t=[],n=0;while(n<e.length){let r=e[n];if(!r){n++;continue}if(r.type==="remove"){let o=[r],s=n+1;while(s<e.length&&e[s]?.type==="remove"){let a=e[s];if(a)o.push(a);s++}let i=[];while(s<e.length&&e[s]?.type==="add"){let a=e[s];if(a)i.push(a);s++}if(o.length>0&&i.length>0){let a=Math.min(o.length,i.length);for(let l=0;l<a;l++){let c=o[l],u=i[l];if(c&&u)c.wordDiff=!0,u.wordDiff=!0,c.matchedLine=u,u.matchedLine=c}t.push(...o.filter(Boolean)),t.push(...i.filter(Boolean)),n=s}else t.push(r),n++}else t.push(r),n++}return t}
function bMd(e,t){return S5r(e,t,{ignoreCase:!1})}
function EMd(e,t,n,r,o){let{type:s,i,wordDiff:a,matchedLine:l,originalCode:c}=e;if(!a||!l)return null;let u=s==="remove"?c:l.originalCode,d=s==="remove"?l.originalCode:c,p=bMd(u,d),m=u.length+d.length;if(p.filter((v)=>v.added||v.removed).reduce((v,R)=>v+R.value.length,0)/m>_Md||r)return null;let h=s==="add"?"+":"-",g=h.length,_=Math.max(1,t-n-1-g),y=[],T=[],S=0;if(p.forEach((v,R)=>{let k=!1,x;if(s==="add"){if(v.added)k=!0,x="diffAddedWord";else if(!v.removed)k=!0}else if(s==="remove"){if(v.removed)k=!0,x="diffRemovedWord";else if(!v.added)k=!0}if(!k)return;$1(v.value,_,"wrap").split(`
`).forEach((P,L)=>{if(!P)return;if(L>0||S+tn(P)>_){if(T.length>0)y.push({content:[...T],contentWidth:S}),T=[],S=0}T.push(ux.createElement(Text,{key:`part-${R}-${L}`,backgroundColor:x},P)),S+=tn(P)})}),T.length>0)y.push({content:T,contentWidth:S});return y.map(({content:v,contentWidth:R},k)=>{let x=`${s}-${i}-${k}`,H=s==="add"?r?"diffAddedDimmed":"diffAdded":r?"diffRemovedDimmed":"diffRemoved",I=k===0?i:void 0,P=(I!==void 0?I.toString().padStart(n):" ".repeat(n))+" ",L=P.length+g+R,D=Math.max(0,t-L);return ux.createElement(Box,{key:x,flexDirection:"row"},ux.createElement(NoSelect,{fromLeftEdge:!0},ux.createElement(Text,{color:o?"text":void 0,backgroundColor:H,dimColor:r},P,h)),ux.createElement(Text,{color:o?"text":void 0,backgroundColor:H,dimColor:r},v," ".repeat(D)))})}
function CMd(e,t,n,r,o){let s=Math.max(1,Math.floor(n)),i=TMd(e),a=SMd(i),l=vMd(a,t),c=Math.max(...l.map(({i:d})=>d),0),u=Math.max(c.toString().length+1,0);return l.flatMap((d)=>{let{type:p,code:m,i:f,wordDiff:A,matchedLine:h}=d;if(A&&h){let S=EMd(d,s,u,r,o);if(S!==null)return S}let g=2,_=Math.max(1,s-u-1-g);return $1(m,_,"wrap").split(`
`).map((S,v)=>{let R=`${p}-${f}-${v}`,k=v===0?f:void 0,x=(k!==void 0?k.toString().padStart(u):" ".repeat(u))+" ",H=p==="add"?"+":p==="remove"?"-":" ",I=x.length+1+tn(S),P=Math.max(0,s-I),L=p==="add"?r?"diffAddedDimmed":"diffAdded":p==="remove"?r?"diffRemovedDimmed":"diffRemoved":void 0;return ux.createElement(Box,{key:R,flexDirection:"row"},ux.createElement(NoSelect,{fromLeftEdge:!0},ux.createElement(Text,{color:o?"text":void 0,backgroundColor:L,dimColor:r||p==="nochange"},x,H)),ux.createElement(Text,{color:o?"text":void 0,backgroundColor:L,dimColor:r},S," ".repeat(P)))})})}
function vMd(e,t){let n=t,r=[],o=[...e];while(o.length>0){let s=o.shift(),{code:i,type:a,originalCode:l,wordDiff:c,matchedLine:u}=s,d={code:i,type:a,i:n,originalCode:l,wordDiff:c,matchedLine:u};switch(a){case"nochange":n++,r.push(d);break;case"add":n++,r.push(d);break;case"remove":{r.push(d);let p=0;while(o[0]?.type==="remove"){n++;let m=o.shift(),{code:f,type:A,originalCode:h,wordDiff:g,matchedLine:_}=m,y={code:f,type:A,i:n,originalCode:h,wordDiff:g,matchedLine:_};r.push(y),p++}n-=p;break}}}return r}
var FGi,ux,_Md=0.4;
var $Gi=b(()=>{W2e();Hc();ze();FGi=M(rt(),1),ux=M(Te(),1)});
export {UGi,yMd,TMd,SMd,bMd,EMd,CMd,vMd,FGi,ux,_Md,$Gi};
