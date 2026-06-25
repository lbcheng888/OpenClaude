// @ts-nocheck
import {WN,Ud} from "./m615.ts";
import {_te,_$n,wut} from "./m3900.ts";
import {Zke,Yk} from "./m2796.ts";
import {_t,gc,uo} from "./m2468.ts";
import {_G,U6e} from "./m4040.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {C3n,Zpo} from "./m4044.ts";
import {l4a,Xpo} from "./m4042.ts";
import {b3n,E3n} from "./m4043.ts";
import {parseFrameForDisplay,IdleNotificationMessageSchema,TaskCompletedMessageSchema,ShutdownApprovedMessageSchema,TeammateTerminatedMessageSchema,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {Yn,Pl} from "./m2465.ts";
import {bs,ff} from "./m2561.ts";
import {gh,G1} from "./m3957.ts";
import {bw,EW} from "./m2811.ts";
import {Ql,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function k3n(e){if(e.startsWith(`<${WN} `))return!0;return e.startsWith(_te)&&e.startsWith(`<${WN} `,e.indexOf(`
`)+1)}
function hDp(e){for(let o of _$n)if(e.endsWith(o)){e=e.slice(0,-o.length);break}for(let o of[`${_te} while you were working:
`,`${_te}:
`])if(e.startsWith(o)&&e.startsWith(`<${WN} `,o.length)){e=e.slice(o.length);break}let t=new RegExp(`<${WN}\\s+teammate_id="([^"]+)"(?:\\s+color="([^"]+)")?(?:\\s+summary="([^"]+)")?>\\n?`,"y"),n=[],r=0;while(r<e.length){t.lastIndex=r;let o=t.exec(e);if(!o)return{messages:n,unparsed:e.slice(r)};let s=r+o[0].length,i=-1,a=e.length;for(let c=e.indexOf(omo,s);c!==-1;c=e.indexOf(omo,c+1)){let u=c+omo.length;while(u<e.length&&/\s/.test(e.charAt(u)))u++;if(t.lastIndex=u,u===e.length||t.test(e)){i=c,a=u;break}}if(i===-1)i=e.length;let l=e.slice(s,i).trim();n.push({teammateId:Zke(o[1]??""),color:o[2]?Zke(o[2]):void 0,summary:o[3]?Zke(o[3]):void 0,content:l}),r=a}return{messages:n,unparsed:""}}
function gDp(){let e=Ndt.c(7),t=_t(_Dp),n=gc(),r;if(e[0]!==t||e[1]!==n){r=new Map;let i;if(e[3]!==n)i=Object.values(n.getState().tasks),e[3]=n,e[4]=i;else i=e[4];for(let a of i)if(a.type==="in_process_teammate")r.set(a.id,a.identity.agentName);for(let[a,l]of t)r.set(l,a);e[0]=t,e[1]=n,e[2]=r}else r=e[2];let o=r,s;if(e[5]!==o)s=(i)=>i==="leader"?"leader":o.get(i)??i,e[5]=o,e[6]=s;else s=e[6];return s}
function _Dp(e){return e.agentNameRegistry}
function smo(e){let t=[];for(let n of e){if(n.kind==="panel"){t.push(n);continue}let r=t.at(-1);if(r&&r.kind==="coalesced"&&r.displayName===n.displayName)r.count++;else t.push({kind:"coalesced",displayName:n.displayName,count:1})}return t}
function w4a(e){let t=Ndt.c(22),{addMargin:n,param:r,verbose:o,isTranscriptMode:s}=e,{text:i}=r,a=gDp(),l=o||s,c,u,d,p,m,f,h;if(t[0]!==n||t[1]!==l||t[2]!==a||t[3]!==i){f=Symbol.for("react.early_return_sentinel");e:{let{messages:T,unparsed:y}=hDp(i),S=T.filter(SDp);if(h=y.trim(),S.length===0&&!h){f=null;break e}let E;if(t[11]!==a)E=(w,H)=>{let k=_G(w.color),I=a(w.teammateId),D=w.summary?Vh.jsxs(Box,{children:[Vh.jsxs(Text,{color:k,children:["@ ",I,Vh.jsx(Text,{"aria-hidden":!0,children:Xe.pointer})]}),Vh.jsxs(Text,{children:[" ",w.summary]})]}):null,O=C3n(w.content,I)??l4a(w.content)??b3n(w.content);if(O)return{kind:"panel",node:Vh.jsxs(v4a.Fragment,{children:[D,O]},H)};let L=parseFrameForDisplay(IdleNotificationMessageSchema(),w.content);if(L&&!w.summary)return{kind:"panel",node:Vh.jsx(lmo,{displayName:I,inkColor:k,idleReason:L.idleReason},H)};let P=parseFrameForDisplay(TaskCompletedMessageSchema(),w.content);if(P)return{kind:"panel",node:Vh.jsxs(Box,{flexDirection:"column",marginTop:1,children:[Vh.jsxs(Box,{children:[Vh.jsxs(Text,{color:k,children:["@ ",I,Vh.jsx(Text,{"aria-hidden":!0,children:Xe.pointer})]}),w.summary&&Vh.jsxs(Text,{children:[" ",w.summary]})]}),Vh.jsxs(Yn,{children:[Vh.jsx(bs,{status:"success"}),Vh.jsxs(Text,{children:[" ","Completed task #",P.taskId,P.taskSubject&&Vh.jsxs(Text,{dimColor:!0,children:[" (",P.taskSubject,")"]})]})]})]},H)};return{kind:"text",displayName:I,inkColor:k,content:w.content,summary:w.summary}},t[11]=a,t[12]=E;else E=t[12];let R=S.map(E);c=Box,u="column",d=n?1:0,p="100%",m=l?R.map(TDp):smo(R).map(yDp)}t[0]=n,t[1]=l,t[2]=a,t[3]=i,t[4]=c,t[5]=u,t[6]=d,t[7]=p,t[8]=m,t[9]=f,t[10]=h}else c=t[4],u=t[5],d=t[6],p=t[7],m=t[8],f=t[9],h=t[10];if(f!==Symbol.for("react.early_return_sentinel"))return f;let g;if(t[13]!==h)g=h&&Vh.jsx(Box,{children:Vh.jsx(Text,{children:h})}),t[13]=h,t[14]=g;else g=t[14];let _;if(t[15]!==c||t[16]!==u||t[17]!==d||t[18]!==p||t[19]!==m||t[20]!==g)_=Vh.jsxs(c,{flexDirection:u,marginTop:d,width:p,children:[m,g]}),t[15]=c,t[16]=u,t[17]=d,t[18]=p,t[19]=m,t[20]=g,t[21]=_;else _=t[21];return _}
function yDp(e,t){return e.kind==="panel"?e.node:Vh.jsx(amo,{displayName:e.displayName,count:e.count},t)}
function TDp(e,t){return e.kind==="panel"?e.node:Vh.jsx(imo,{displayName:e.displayName,inkColor:e.inkColor,content:e.content,summary:e.summary},t)}
function SDp(e){if(e.summary)return!0;if(parseFrameForDisplay(ShutdownApprovedMessageSchema(),e.content))return!1;if(parseFrameForDisplay(TeammateTerminatedMessageSchema(),e.content))return!1;return!0}
function imo(e){let t=Ndt.c(14),{displayName:n,inkColor:r,content:o,summary:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=Vh.jsx(Text,{"aria-hidden":!0,children:Xe.pointer}),t[0]=i;else i=t[0];let a;if(t[1]!==n||t[2]!==r)a=Vh.jsxs(Text,{color:r,children:["@ ",n,i]}),t[1]=n,t[2]=r,t[3]=a;else a=t[3];let l;if(t[4]!==s)l=s&&Vh.jsxs(Text,{children:[" ",s]}),t[4]=s,t[5]=l;else l=t[5];let c;if(t[6]!==a||t[7]!==l)c=Vh.jsxs(Box,{children:[a,l]}),t[6]=a,t[7]=l,t[8]=c;else c=t[8];let u;if(t[9]!==o)u=o&&Vh.jsx(Box,{paddingLeft:2,children:Vh.jsx(gh,{stripPromptTags:!1,children:o})}),t[9]=o,t[10]=u;else u=t[10];let d;if(t[11]!==c||t[12]!==u)d=Vh.jsxs(Box,{flexDirection:"column",marginTop:1,children:[c,u]}),t[11]=c,t[12]=u,t[13]=d;else d=t[13];return d}
function amo(e){let t=Ndt.c(4),{displayName:n,count:r}=e,o=r===1?"Message":`${r} messages`,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=Vh.jsx(bw,{}),t[0]=s;else s=t[0];let i;if(t[1]!==n||t[2]!==o)i=Vh.jsx(Box,{marginTop:1,children:Vh.jsxs(Text,{dimColor:!0,children:[Xe.pointerSmall," ",o," ","from @",n," ",s]})}),t[1]=n,t[2]=o,t[3]=i;else i=t[3];return i}
function lmo(e){let t=Ndt.c(9),{displayName:n,inkColor:r,idleReason:o}=e,s=o==="failed"?"error":o==="interrupted"?"warning":"success",i=o==="failed"?"failed":o==="interrupted"?"was interrupted":"finished",a;if(t[0]!==s)a=Vh.jsx(Text,{color:s,children:Ql}),t[0]=s,t[1]=a;else a=t[1];let l;if(t[2]!==n||t[3]!==r)l=Vh.jsxs(Text,{color:r,bold:!0,children:["@",n]}),t[2]=n,t[3]=r,t[4]=l;else l=t[4];let c;if(t[5]!==i||t[6]!==a||t[7]!==l)c=Vh.jsx(Box,{marginTop:1,children:Vh.jsxs(Text,{children:[a," Teammate"," ",l," ",i]})}),t[5]=i,t[6]=a,t[7]=l,t[8]=c;else c=t[8];return c}
var Ndt,v4a,Vh,omo;
var H3n=b(()=>{Zs();Pa();wut();Ud();je();uo();U6e();Pw();Yk();EW();ff();G1();Pl();Zpo();Xpo();E3n();Ndt=x(tt(),1),v4a=x(et(),1),Vh=x(oe(),1),omo=`</${WN}>`});
export {k3n,hDp,gDp,_Dp,smo,w4a,yDp,TDp,SDp,imo,amo,lmo,Ndt,v4a,Vh,omo,H3n};
