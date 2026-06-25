// @ts-nocheck
import {QS,Q2} from "./m2552.ts";
import {Tz,c2e} from "./m2388.ts";
import {He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {Text} from "./m2433.ts";
import {p1i,m1i} from "./m2578.ts";
import {uDi,nwe} from "./m2476.ts";
import {Az} from "./m2471.ts";
import {sn,mc} from "./m237.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function h1i(e){let t=f1i.c(18),{boundary:n,fallback:r,order:o,omit:s,max:i,maxWidth:a}=e,l=r===void 0?null:r,c=i===void 0?jRd:i,u=QS(),{focusManager:d,rootNode:p}=Dhe.useContext(Tz),[m,f]=Dhe.useState(0),h,g;if(t[0]!==u||t[1]!==d)h=()=>{if(!u||!d)return;let k=()=>f(YRd),I=d.subscribe(k),D=u.keyHandlerRegistry.scopesChanged.subscribe(k);return k(),()=>{I(),D()}},g=[u,d],t[0]=u,t[1]=d,t[2]=h,t[3]=g;else h=t[2],g=t[3];Dhe.useEffect(h,g);let _=d?.activeElement??null,T=n?.current??p??null,y;if(t[4]!==u||t[5]!==c||t[6]!==a||t[7]!==s||t[8]!==o||t[9]!==_||t[10]!==T)y=JRd({ctx:u,activeElement:_,boundaryNode:T,order:o,omit:s,max:c,maxWidth:a}),t[4]=u,t[5]=c,t[6]=a,t[7]=s,t[8]=o,t[9]=_,t[10]=T,t[11]=y;else y=t[11];let S=y,E=Dhe.useRef(null),R,w;if(t[12]!==S.fellBack||t[13]!==S.hadEntryWithoutDescription)R=()=>{let k=S.fellBack?"fell_back":S.hadEntryWithoutDescription?"no_description":"ok";if(k===E.current)return;let I=E.current===null;if(E.current=k,I&&k==="fell_back")return;if(k==="ok")He("keybinding_auto_hints");else Pt("keybinding_auto_hints",k)},w=[S.fellBack,S.hadEntryWithoutDescription],t[12]=S.fellBack,t[13]=S.hadEntryWithoutDescription,t[14]=R,t[15]=w;else R=t[14],w=t[15];if(Dhe.useEffect(R,w),S.fellBack)return l;let H;if(t[16]!==S.text)H=g1i.jsx(Text,{dimColor:!0,italic:!0,children:S.text}),t[16]=S.text,t[17]=H;else H=t[17];return H}
function YRd(e){return e+1}
function JRd({ctx:e,activeElement:t,boundaryNode:n,order:r,omit:o,max:s,maxWidth:i}){let a={fellBack:!0,text:"",hadEntryWithoutDescription:!1};if(!e||!t||!n)return a;let l=[],c=!1,u=0,d=t;while(d){let H=d===n,k=e.keyHandlerRegistry.decls.get(d);if(k)for(let I of k.entriesRef.current){if(!I.action)continue;l.push({action:I.action,hint:I.hint,scope:k.scope,depth:u,isBoundary:H})}if(H){c=!0;break}d=d.parentNode,u++}if(!c)return a;if(!l.some((H)=>!H.isBoundary))return a;let m=new Set(o??[]),f=new Set,h=!1,g=[];for(let H of l){if(m.has(H.action))continue;let k=H.hint??p1i(H.action)?.description;if(!k){h=!0;continue}if(f.has(k))continue;let I=uDi(H.action,H.scope?[H.scope]:[],e.bindings);if(!I)continue;f.add(k),g.push({action:H.action,text:`${Az(I)} ${k}`,depth:H.depth})}let _=new Map;(r??[]).forEach((H,k)=>_.set(H,k)),g.sort((H,k)=>{let I=_.get(H.action)??1/0,D=_.get(k.action)??1/0;if(I!==D)return I-D;return H.depth-k.depth});let T=" \xB7 ",y=sn(T),S=0,E=[];for(;;){E=[];let H=0;for(let D of g){if(E.length>=s)break;let O=(E.length===0?0:y)+sn(D.text);if(i!==void 0&&H+O+S>i&&E.length>0)break;E.push(D.text),H+=O}let k=g.length-E.length;if(i===void 0||k===0)break;let I=sn(`${T}+${k} more`);if(I<=S)break;S=I}if(E.length===0)return a;let R=g.length-E.length;return{fellBack:!1,text:R>0?`${E.join(T)}${T}+${R} more`:E.join(T),hadEntryWithoutDescription:h}}
var f1i,Dhe,g1i,jRd=4;
var _1i=b(()=>{c2e();mc();je();mn();m1i();Q2();nwe();f1i=x(tt(),1),Dhe=x(et(),1),g1i=x(oe(),1)});
export {h1i,YRd,JRd,f1i,Dhe,g1i,jRd,_1i};
