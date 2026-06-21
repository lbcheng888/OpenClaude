// @ts-nocheck
import {getSettingsSchema,k$} from "./m2541.ts";
import {WK,dUe} from "./m2378.ts";
import {Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {Text} from "./m2423.ts";
import {FIi,UIi} from "./m2567.ts";
import {jwi,gwe} from "./m2466.ts";
import {JK} from "./m2461.ts";
import {tn,Hc} from "./m235.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qIi(e){let t=$Ii.c(18),{boundary:n,fallback:r,order:o,omit:s,max:i,maxWidth:a}=e,l=r===void 0?null:r,c=i===void 0?bAd:i,u=getSettingsSchema(),{focusManager:d,rootNode:p}=KZ.useContext(WK),[m,f]=KZ.useState(0),A,h;if(t[0]!==u||t[1]!==d)A=()=>{if(!u||!d)return;let x=()=>f(EAd),H=d.subscribe(x),I=u.keyHandlerRegistry.scopesChanged.subscribe(x);return x(),()=>{H(),I()}},h=[u,d],t[0]=u,t[1]=d,t[2]=A,t[3]=h;else A=t[2],h=t[3];KZ.useEffect(A,h);let g=d?.activeElement??null,_=n?.current??p??null,y;if(t[4]!==u||t[5]!==c||t[6]!==a||t[7]!==s||t[8]!==o||t[9]!==g||t[10]!==_)y=CAd({ctx:u,activeElement:g,boundaryNode:_,order:o,omit:s,max:c,maxWidth:a}),t[4]=u,t[5]=c,t[6]=a,t[7]=s,t[8]=o,t[9]=g,t[10]=_,t[11]=y;else y=t[11];let T=y,S=KZ.useRef(null),v,R;if(t[12]!==T.fellBack||t[13]!==T.hadEntryWithoutDescription)v=()=>{let x=T.fellBack?"fell_back":T.hadEntryWithoutDescription?"no_description":"ok";if(x===S.current)return;let H=S.current===null;if(S.current=x,H&&x==="fell_back")return;if(x==="ok")Ie("keybinding_auto_hints");else isTmuxControlMode("keybinding_auto_hints",x)},R=[T.fellBack,T.hadEntryWithoutDescription],t[12]=T.fellBack,t[13]=T.hadEntryWithoutDescription,t[14]=v,t[15]=R;else v=t[14],R=t[15];if(KZ.useEffect(v,R),T.fellBack)return l;let k;if(t[16]!==T.text)k=KZ.default.createElement(Text,{dimColor:!0,italic:!0},T.text),t[16]=T.text,t[17]=k;else k=t[17];return k}
function EAd(e){return e+1}
function CAd({ctx:e,activeElement:t,boundaryNode:n,order:r,omit:o,max:s,maxWidth:i}){let a={fellBack:!0,text:"",hadEntryWithoutDescription:!1};if(!e||!t||!n)return a;let l=[],c=!1,u=0,d=t;while(d){let k=d===n,x=e.keyHandlerRegistry.decls.get(d);if(x)for(let H of x.entriesRef.current){if(!H.action)continue;l.push({action:H.action,hint:H.hint,scope:x.scope,depth:u,isBoundary:k})}if(k){c=!0;break}d=d.parentNode,u++}if(!c)return a;if(!l.some((k)=>!k.isBoundary))return a;let m=new Set(o??[]),f=new Set,A=!1,h=[];for(let k of l){if(m.has(k.action))continue;let x=k.hint??FIi(k.action)?.description;if(!x){A=!0;continue}if(f.has(x))continue;let H=jwi(k.action,k.scope?[k.scope]:[],e.bindings);if(!H)continue;f.add(x),h.push({action:k.action,text:`${JK(H)} ${x}`,depth:k.depth})}let g=new Map;(r??[]).forEach((k,x)=>g.set(k,x)),h.sort((k,x)=>{let H=g.get(k.action)??1/0,I=g.get(x.action)??1/0;if(H!==I)return H-I;return k.depth-x.depth});let _=" \xB7 ",y=tn(_),T=0,S=[];for(;;){S=[];let k=0;for(let I of h){if(S.length>=s)break;let P=(S.length===0?0:y)+tn(I.text);if(i!==void 0&&k+P+T>i&&S.length>0)break;S.push(I.text),k+=P}let x=h.length-S.length;if(i===void 0||x===0)break;let H=tn(`${_}+${x} more`);if(H<=T)break;T=H}if(S.length===0)return a;let v=h.length-S.length;return{fellBack:!1,text:v>0?`${S.join(_)}${_}+${v} more`:S.join(_),hadEntryWithoutDescription:A}}
var $Ii,KZ,bAd=4;
var jIi=b(()=>{dUe();Hc();ze();ln();UIi();k$();gwe();$Ii=M(rt(),1),KZ=M(Te(),1)});
export {qIi,EAd,CAd,$Ii,KZ,bAd,jIi};
