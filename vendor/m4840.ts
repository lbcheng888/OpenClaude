// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {du,iw} from "./m2302.ts";
import {xHo,sgt,ogt,Rkl} from "./m4837.ts";
import {Zg,dhe} from "./m2362.ts";
import {ujn,vkl} from "./m4838.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {f6,zDe} from "./m4482.ts";
import {DHo,PHo} from "./m4839.ts";
import {_z,o4} from "./m2386.ts";
import {hhe,DPt} from "./m2413.ts";
import {m2e,p2e,OPt,LPt} from "./m2419.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function xkl({scrollable:e,bottom:t,pushUp:n,overlay:r,scrollRef:o}){let s=_r(),i=s.columns,a=s.rows,l=Ane.useRef(null),c=Ane.useRef(null),u=Ane.useRef(null),d=Ane.useRef(null),p=Ane.useRef(null),m=o??p;Ane.useInsertionEffect(()=>{let h=du.get(process.stdout);if(!h)return;let g=new xHo(process.stdout,i,a);g.setup(),l.current=g;let _=!1;return h.frameSink=(T,y)=>{let S=l.current;if(!S)return!1;if(h.isAltScreenActive){if(!_)S.suspend(),_=!0;return!1}if(_)_=!1,S.resume(S.cols,S.rows);let E=S.tickPump(),R=Ikl(T,y,c.current),w=Ikl(T,y,u.current),H=S.computeLayout(R,w),k=m.current?.getDomElement()??null;if(k){let D=Zg.get(k),O=[];if(D&&D.height>0){let M=Math.min(D.y+D.height,T.screen.height);for(let B=D.y;B<M;B++)O.push(ujn(T.screen,y,B))}let L=k.scrollHeight??0,P=vdm(d.current,k)??L;S.syncViewport({lines:O,scrollTop:k.scrollTop??0,scrollHeight:L,transcriptEnd:P},H.contentHeight)}let I=!1;if(k){let D=S.consumeGapRange(),O=S.consumeBackfillNeeded();if(D||O){let L=D?D.from:0,P=D?D.to:k.scrollTop??0,M=wdm(k,L,P,S.cols,h.getStylePool());if(M.length>0)S.primeBackfill(M),I=!0}}return S.draw(H),E||I?"tick":!0},()=>{h.frameSink=null,g.restore(),l.current=null}},[]);let f=Ane.useRef({cols:i,rows:a});return Ane.useLayoutEffect(()=>{if(i===f.current.cols&&a===f.current.rows)return;f.current={cols:i,rows:a},l.current?.handleResize(i,a)},[i,a]),HWe.jsxs(BaseBox,{flexDirection:"column",height:a,width:"100%",flexShrink:0,children:[HWe.jsx(f6,{ref:(h)=>{if(m)m.current=h},flexGrow:1,flexDirection:"column",stickyScroll:!0,children:HWe.jsx(DHo.Provider,{value:d,children:e})}),HWe.jsxs(BaseBox,{ref:c,flexDirection:"column",flexShrink:0,minHeight:sgt,maxHeight:a-2,children:[n,t]}),r!=null?HWe.jsx(BaseBox,{ref:u,flexDirection:"column",flexShrink:0,position:"absolute",bottom:0,left:0,right:0,opaque:!0,children:r}):null]})}
function vdm(e,t){if(!e)return;let n=0,r=e;while(r&&r.parentNode!==t)n+=r.yogaNode?.getComputedTop()??0,r=r.parentNode;return r?n:void 0}
function wdm(e,t,n,r,o){let s=e.childNodes[0];if(!s)return[];if((e.scrollHeight??0)<=0||n<=t)return[];let a=du.get(process.stdout);if(!a)return[];let l=Math.ceil(n),c=Math.max(0,Math.floor(t),l-ogt),u=l-c;if(u<=0)return[];let d=_z(r,u,o,a.getCharPool(),a.getHyperlinkPool()),p=new hhe({width:r,height:u,stylePool:o,screen:d});p.clip({x1:void 0,x2:void 0,y1:0,y2:u});let m=Zg.get(s);if(m2e(s,p,p2e(),{offsetX:0,offsetY:-c,prevScreen:void 0}),p.unclip(),OPt(s),m)Zg.set(s,m);let f=p.get();s.dirty=!0;let h=[];for(let g=0;g<u;g++)h.push(ujn(f,o,g));return h}
function Ikl(e,t,n){if(!n)return[];let r=Zg.get(n);if(!r||r.height<=0)return[];let o=[],s=Math.min(r.y+r.height,e.screen.height);for(let i=Math.max(0,r.y);i<s;i++)o.push(ujn(e.screen,t,i));return o}
var Ane,HWe;
var Dkl=b(()=>{ui();xZ();zDe();iw();dhe();DPt();LPt();o4();Rkl();vkl();PHo();Ane=x(et(),1),HWe=x(oe(),1)});
export {xkl,vdm,wdm,Ikl,Ane,HWe,Dkl};
