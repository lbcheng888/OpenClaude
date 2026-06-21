// @ts-nocheck
import {SB,initKp} from "./m609.ts";
import {bte,_Fn,vlt} from "./m3882.ts";
import {mxe,QH} from "./m2784.ts";
import {mt,Mc,configProtoStore} from "./m2458.ts";
import {zW,aqe} from "./m3972.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {FUn,Aao} from "./m3979.ts";
import {$1a,mao} from "./m3977.ts";
import {NUn,BUn} from "./m3978.ts";
import {parseFrameForDisplay,IdleNotificationMessageSchema,TaskCompletedMessageSchema,ShutdownApprovedMessageSchema,TeammateTerminatedMessageSchema,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {Gn,sc} from "./m2455.ts";
import {Bs,rA} from "./m2550.ts";
import {l_,dU} from "./m3932.ts";
import {cx,iW} from "./m2798.ts";
import {fc,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function WUn(e){if(e.startsWith(`<${SB} `))return!0;return e.startsWith(bte)&&e.startsWith(`<${SB} `,e.indexOf(`
`)+1)}
function SEp(e){for(let o of _Fn)if(e.endsWith(o)){e=e.slice(0,-o.length);break}for(let o of[`${bte} while you were working:
`,`${bte}:
`])if(e.startsWith(o)&&e.startsWith(`<${SB} `,o.length)){e=e.slice(o.length);break}let t=new RegExp(`<${SB}\\s+teammate_id="([^"]+)"(?:\\s+color="([^"]+)")?(?:\\s+summary="([^"]+)")?>\\n?`,"y"),n=[],r=0;while(r<e.length){t.lastIndex=r;let o=t.exec(e);if(!o)return{messages:n,unparsed:e.slice(r)};let s=r+o[0].length,i=-1,a=e.length;for(let c=e.indexOf(Tao,s);c!==-1;c=e.indexOf(Tao,c+1)){let u=c+Tao.length;while(u<e.length&&/\s/.test(e.charAt(u)))u++;if(t.lastIndex=u,u===e.length||t.test(e)){i=c,a=u;break}}if(i===-1)i=e.length;let l=e.slice(s,i).trim();n.push({teammateId:mxe(o[1]??""),color:o[2]?mxe(o[2]):void 0,summary:o[3]?mxe(o[3]):void 0,content:l}),r=a}return{messages:n,unparsed:""}}
function bEp(){let e=bct.c(7),t=mt(EEp),n=Mc(),r;if(e[0]!==t||e[1]!==n){r=new Map;let i;if(e[3]!==n)i=Object.values(n.getState().tasks),e[3]=n,e[4]=i;else i=e[4];for(let a of i)if(a.type==="in_process_teammate")r.set(a.id,a.identity.agentName);for(let[a,l]of t)r.set(l,a);e[0]=t,e[1]=n,e[2]=r}else r=e[2];let o=r,s;if(e[5]!==o)s=(i)=>i==="leader"?"leader":o.get(i)??i,e[5]=o,e[6]=s;else s=e[6];return s}
function EEp(e){return e.agentNameRegistry}
function Sao(e){let t=[];for(let n of e){if(n.kind==="panel"){t.push(n);continue}let r=t.at(-1);if(r&&r.kind==="coalesced"&&r.displayName===n.displayName)r.count++;else t.push({kind:"coalesced",displayName:n.displayName,count:1})}return t}
function rNa(e){let t=bct.c(22),{addMargin:n,param:r,verbose:o,isTranscriptMode:s}=e,{text:i}=r,a=bEp(),l=o||s,c,u,d,p,m,f,A;if(t[0]!==n||t[1]!==l||t[2]!==a||t[3]!==i){f=Symbol.for("react.early_return_sentinel");e:{let{messages:_,unparsed:y}=SEp(i),T=_.filter(wEp);if(A=y.trim(),T.length===0&&!A){f=null;break e}let S;if(t[11]!==a)S=(R,k)=>{let x=zW(R.color),H=a(R.teammateId),I=R.summary?bl.createElement(Box,null,bl.createElement(Text,{color:x},"@ ",H,bl.createElement(Text,{"aria-hidden":!0},et.pointer)),bl.createElement(Text,null," ",R.summary)):null,P=FUn(R.content,H)??$1a(R.content)??NUn(R.content);if(P)return{kind:"panel",node:bl.createElement(bl.Fragment,{key:k},I,P)};let L=parseFrameForDisplay(IdleNotificationMessageSchema(),R.content);if(L&&!R.summary)return{kind:"panel",node:bl.createElement(Cao,{key:k,displayName:H,inkColor:x,idleReason:L.idleReason})};let D=parseFrameForDisplay(TaskCompletedMessageSchema(),R.content);if(D)return{kind:"panel",node:bl.createElement(Box,{key:k,flexDirection:"column",marginTop:1},bl.createElement(Box,null,bl.createElement(Text,{color:x},"@ ",H,bl.createElement(Text,{"aria-hidden":!0},et.pointer)),R.summary&&bl.createElement(Text,null," ",R.summary)),bl.createElement(Gn,null,bl.createElement(Bs,{status:"success"}),bl.createElement(Text,null," ","Completed task #",D.taskId,D.taskSubject&&bl.createElement(Text,{dimColor:!0}," (",D.taskSubject,")"))))};return{kind:"text",displayName:H,inkColor:x,content:R.content,summary:R.summary}},t[11]=a,t[12]=S;else S=t[12];let v=T.map(S);c=Box,u="column",d=n?1:0,p="100%",m=l?v.map(vEp):Sao(v).map(CEp)}t[0]=n,t[1]=l,t[2]=a,t[3]=i,t[4]=c,t[5]=u,t[6]=d,t[7]=p,t[8]=m,t[9]=f,t[10]=A}else c=t[4],u=t[5],d=t[6],p=t[7],m=t[8],f=t[9],A=t[10];if(f!==Symbol.for("react.early_return_sentinel"))return f;let h;if(t[13]!==A)h=A&&bl.createElement(Box,null,bl.createElement(Text,null,A)),t[13]=A,t[14]=h;else h=t[14];let g;if(t[15]!==c||t[16]!==u||t[17]!==d||t[18]!==p||t[19]!==m||t[20]!==h)g=bl.createElement(c,{flexDirection:u,marginTop:d,width:p},m,h),t[15]=c,t[16]=u,t[17]=d,t[18]=p,t[19]=m,t[20]=h,t[21]=g;else g=t[21];return g}
function CEp(e,t){return e.kind==="panel"?e.node:bl.createElement(Eao,{key:t,displayName:e.displayName,count:e.count})}
function vEp(e,t){return e.kind==="panel"?e.node:bl.createElement(bao,{key:t,displayName:e.displayName,inkColor:e.inkColor,content:e.content,summary:e.summary})}
function wEp(e){if(e.summary)return!0;if(parseFrameForDisplay(ShutdownApprovedMessageSchema(),e.content))return!1;if(parseFrameForDisplay(TeammateTerminatedMessageSchema(),e.content))return!1;return!0}
function bao(e){let t=bct.c(14),{displayName:n,inkColor:r,content:o,summary:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=bl.createElement(Text,{"aria-hidden":!0},et.pointer),t[0]=i;else i=t[0];let a;if(t[1]!==n||t[2]!==r)a=bl.createElement(Text,{color:r},"@ ",n,i),t[1]=n,t[2]=r,t[3]=a;else a=t[3];let l;if(t[4]!==s)l=s&&bl.createElement(Text,null," ",s),t[4]=s,t[5]=l;else l=t[5];let c;if(t[6]!==a||t[7]!==l)c=bl.createElement(Box,null,a,l),t[6]=a,t[7]=l,t[8]=c;else c=t[8];let u;if(t[9]!==o)u=o&&bl.createElement(Box,{paddingLeft:2},bl.createElement(l_,{stripPromptTags:!1},o)),t[9]=o,t[10]=u;else u=t[10];let d;if(t[11]!==c||t[12]!==u)d=bl.createElement(Box,{flexDirection:"column",marginTop:1},c,u),t[11]=c,t[12]=u,t[13]=d;else d=t[13];return d}
function Eao(e){let t=bct.c(4),{displayName:n,count:r}=e,o=r===1?"Message":`${r} messages`,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=bl.createElement(cx,null),t[0]=s;else s=t[0];let i;if(t[1]!==n||t[2]!==o)i=bl.createElement(Box,{marginTop:1},bl.createElement(Text,{dimColor:!0},et.pointerSmall," ",o," ","from @",n," ",s)),t[1]=n,t[2]=o,t[3]=i;else i=t[3];return i}
function Cao(e){let t=bct.c(9),{displayName:n,inkColor:r,idleReason:o}=e,s=o==="failed"?"error":o==="interrupted"?"warning":"success",i=o==="failed"?"failed":o==="interrupted"?"was interrupted":"came to rest",a;if(t[0]!==s)a=bl.createElement(Text,{color:s},fc),t[0]=s,t[1]=a;else a=t[1];let l;if(t[2]!==n||t[3]!==r)l=bl.createElement(Text,{color:r,bold:!0},"@",n),t[2]=n,t[3]=r,t[4]=l;else l=t[4];let c;if(t[5]!==i||t[6]!==a||t[7]!==l)c=bl.createElement(Box,{marginTop:1},bl.createElement(Text,null,a," Teammate"," ",l," ",i)),t[5]=i,t[6]=a,t[7]=l,t[8]=c;else c=t[8];return c}
var bct,bl,Tao;
var GUn=b(()=>{Ai();sl();vlt();initKp();ze();configProtoStore();aqe();Tx();QH();iW();rA();dU();sc();Aao();mao();BUn();bct=M(rt(),1),bl=M(Te(),1),Tao=`</${SB}>`});
export {WUn,SEp,bEp,EEp,Sao,rNa,CEp,vEp,wEp,bao,Eao,Cao,bct,bl,Tao,GUn};
