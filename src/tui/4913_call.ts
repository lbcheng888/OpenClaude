// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {RRr,vA,l4,uc,Woe,gYe,tE} from "../api/1448_month.ts";
import {getMainLoopModel,getCanonicalName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {$B,_Ye,P8} from "../telemetry/1449_model.ts";
import {fVn,Uvo,AVn,$vo} from "../session/4912_cacheBreakerPhrase.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {XDe,cvl,mVn} from "../../vendor/m4910.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {Text} from "../../vendor/m2423.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {Box} from "../../vendor/m2422.ts";
import {nl,v_} from "../../vendor/m2573.ts";
import {formatDuration,ps} from "../../vendor/m238.ts";
import {aD,bne} from "../../vendor/m4590.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var pvl={};
isFullscreenWithTTY(pvl,{call:()=>Rim,FastModePicker:()=>FastModePicker});
function FastModePicker(e){let t=uvl.c(32),{onDone:n,unavailableReason:r}=e,o=mt(wim),{addNotification:s}=Ui(),i=mt(vim),a=bo(),[l,c]=dvl.useState(i??!1),u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=RRr(),t[0]=u;else u=t[0];let d=u,p=d.status==="cooldown",m=r!==null,f;if(t[1]===Symbol.for("react.memo_cache_sentinel")){let N=getMainLoopModel(),O=vA(N)?getCanonicalName(N):"claude-opus-4-8";f=$B(_Ye(!0,O)),t[1]=f}else f=t[1];let A=f,h;if(t[2]!==s||t[3]!==l||t[4]!==m||t[5]!==o||t[6]!==n||t[7]!==a)h=function(){if(m)return;if(fVn(l,a),logEvent("tengu_fast_mode_toggled",{enabled:l,source:Qe("picker")}),l){let O=XDe(l),$=!vA(o)?` \xB7 model set to ${l4()}`:"",U=Uvo();if(U)s(U);n(`${O} Fast mode ON${$} \xB7 ${A}`)}else a(Cim),n("Fast mode OFF")},t[2]=s,t[3]=l,t[4]=m,t[5]=o,t[6]=n,t[7]=a,t[8]=h;else h=t[8];let g=h,_;if(t[9]!==i||t[10]!==m||t[11]!==n||t[12]!==a)_=function(){if(m){if(i)fVn(!1,a);n("Fast mode OFF",{display:"system"});return}let O=i?`${XDe()} Kept Fast mode ON`:"Kept Fast mode OFF";n(O,{display:"system"})},t[9]=i,t[10]=m,t[11]=n,t[12]=a,t[13]=_;else _=t[13];let y=_,T;if(t[14]!==m)T=function(){if(m)return;c(Eim)},t[14]=m,t[15]=T;else T=t[15];let S=T,v;if(t[16]!==g||t[17]!==S)v={"confirm:yes":g,"confirm:nextField":S,"confirm:next":S,"confirm:previous":S,"confirm:cycleMode":S,"confirm:toggle":S},t[16]=g,t[17]=S,t[18]=v;else v=t[18];let R;if(t[19]===Symbol.for("react.memo_cache_sentinel"))R={context:"Confirmation"},t[19]=R;else R=t[19];Wo(v,R);let k;if(t[20]===Symbol.for("react.memo_cache_sentinel"))k=Sm.createElement(Text,null,Sm.createElement(cvl,{cooldown:p})," Fast mode (research preview)"),t[20]=k;else k=t[20];let x=k,H;if(t[21]===Symbol.for("react.memo_cache_sentinel"))H=l4(),t[21]=H;else H=t[21];let I;if(t[22]!==m)I=m?Sm.createElement(at,{chord:"escape",action:"cancel"}):Sm.createElement(Tn,null,Sm.createElement(at,{chord:"tab",action:"toggle"}),Sm.createElement(at,{chord:"enter",action:"confirm"}),Sm.createElement(at,{chord:"escape",action:"cancel"})),t[22]=m,t[23]=I;else I=t[23];let P;if(t[24]!==l||t[25]!==r)P=r?Sm.createElement(Box,{marginLeft:2},Sm.createElement(nl,{error:r})):Sm.createElement(Sm.Fragment,null,Sm.createElement(Box,{flexDirection:"column",gap:0,marginLeft:2},Sm.createElement(Box,{flexDirection:"row",gap:2},Sm.createElement(Text,{bold:!0},"Fast mode"),Sm.createElement(Text,{color:l?"fastMode":void 0,bold:l},l?"ON ":"OFF"),Sm.createElement(Text,{dimColor:!0},A))),p&&d.status==="cooldown"&&Sm.createElement(Box,{marginLeft:2},Sm.createElement(Text,{color:"warning"},d.reason==="overloaded"?"Fast mode overloaded and is temporarily unavailable":"You've hit your fast limit"," \xB7 resets in ",formatDuration(d.resetAt-Date.now(),{hideTrailingZeros:!0})))),t[24]=l,t[25]=r,t[26]=P;else P=t[26];let L;if(t[27]===Symbol.for("react.memo_cache_sentinel"))L=Sm.createElement(aD,{url:"https://code.claude.com/docs/en/fast-mode"}),t[27]=L;else L=t[27];let D;if(t[28]!==y||t[29]!==I||t[30]!==P)D=Sm.createElement(Kn,{title:x,subtitle:`High-speed mode for ${H}. Draws from usage credits at a higher rate. Separate rate limits apply.`,onCancel:y,color:"fastMode",inputGuide:I},P,L),t[28]=y,t[29]=I,t[30]=P,t[31]=D;else D=t[31];return D}
function Eim(e){return!e}
function Cim(e){return{...e,fastMode:!1}}
function vim(e){return e.fastMode}
function wim(e){return e.mainLoopModel}
async function Rim(e,t,n){if(!uc())return e(Woe()??"Fast mode is not available"),null;await gYe();let r=n?.trim().toLowerCase();if(r==="on"||r==="off"){let s=await AVn(r==="on",t.getAppState,t.setAppState,"shortcut",t.onQueryEvent);return e(s),null}let o=Woe();return logEvent("tengu_fast_mode_picker_shown",{unavailable_reason:o??""}),Sm.createElement(FastModePicker,{onDone:e,unavailableReason:o})}
var uvl,Sm,dvl;
var qvo=b(()=>{zs();Li();bne();v_();rs();mVn();Ld();ze();Ts();Ct();configProtoStore();tE();ps();Mo();P8();$vo();uvl=M(rt(),1),Sm=M(Te(),1),dvl=M(Te(),1)});
export {pvl,FastModePicker,Eim,Cim,vim,wim,Rim,uvl,Sm,dvl,qvo};
