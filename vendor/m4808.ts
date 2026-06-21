// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {qu,bk} from "./m2291.ts";
import {mCo,Kmt,Vmt,STl} from "./m4805.ts";
import {apiKeyHelperCache,tAe} from "./m2352.ts";
import {bGn,bTl} from "./m4806.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {Y6,X0e} from "./m4460.ts";
import {fCo,ACo} from "./m4807.ts";
import {qK,N4} from "./m2376.ts";
import {oAe,t0t} from "./m2403.ts";
import {hUe,AUe,r0t,o0t} from "./m2409.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function wTl({scrollable:e,bottom:t,pushUp:n,overlay:r,scrollRef:o}){let s=mr(),i=s.columns,a=s.rows,l=jN.useRef(null),c=jN.useRef(null),u=jN.useRef(null),d=jN.useRef(null),p=jN.useRef(null),m=o??p;jN.useInsertionEffect(()=>{let A=qu.get(process.stdout);if(!A)return;let h=new mCo(process.stdout,i,a);h.setup(),l.current=h;let g=!1;return A.frameSink=(_,y)=>{let T=l.current;if(!T)return!1;if(A.isAltScreenActive){if(!g)T.suspend(),g=!0;return!1}if(g)g=!1,T.resume(T.cols,T.rows);let S=T.tickPump(),v=vTl(_,y,c.current),R=vTl(_,y,u.current),k=T.computeLayout(v,R),x=m.current?.getDomElement()??null;if(x){let I=apiKeyHelperCache.get(x),P=[];if(I&&I.height>0){let N=Math.min(I.y+I.height,_.screen.height);for(let O=I.y;O<N;O++)P.push(bGn(_.screen,y,O))}let L=x.scrollHeight??0,D=dnm(d.current,x)??L;T.syncViewport({lines:P,scrollTop:x.scrollTop??0,scrollHeight:L,transcriptEnd:D},k.contentHeight)}let H=!1;if(x){let I=T.consumeGapRange(),P=T.consumeBackfillNeeded();if(I||P){let L=I?I.from:0,D=I?I.to:x.scrollTop??0,N=pnm(x,L,D,T.cols,A.getStylePool());if(N.length>0)T.primeBackfill(N),H=!0}}return T.draw(k),S||H?"tick":!0},()=>{A.frameSink=null,h.restore(),l.current=null}},[]);let f=jN.useRef({cols:i,rows:a});return jN.useLayoutEffect(()=>{if(i===f.current.cols&&a===f.current.rows)return;f.current={cols:i,rows:a},l.current?.handleResize(i,a)},[i,a]),jN.default.createElement(BaseBox,{flexDirection:"column",height:a,width:"100%",flexShrink:0},jN.default.createElement(Y6,{ref:(A)=>{if(m)m.current=A},flexGrow:1,flexDirection:"column",stickyScroll:!0},jN.default.createElement(fCo.Provider,{value:d},e)),jN.default.createElement(BaseBox,{ref:c,flexDirection:"column",flexShrink:0,minHeight:Kmt,maxHeight:a-2},n,t),r!=null?jN.default.createElement(BaseBox,{ref:u,flexDirection:"column",flexShrink:0,position:"absolute",bottom:0,left:0,right:0,opaque:!0},r):null)}
function dnm(e,t){if(!e)return;let n=0,r=e;while(r&&r.parentNode!==t)n+=r.yogaNode?.getComputedTop()??0,r=r.parentNode;return r?n:void 0}
function pnm(e,t,n,r,o){let s=e.childNodes[0];if(!s)return[];if((e.scrollHeight??0)<=0||n<=t)return[];let a=qu.get(process.stdout);if(!a)return[];let l=Math.ceil(n),c=Math.max(0,Math.floor(t),l-Vmt),u=l-c;if(u<=0)return[];let d=qK(r,u,o,a.getCharPool(),a.getHyperlinkPool()),p=new oAe({width:r,height:u,stylePool:o,screen:d});p.clip({x1:void 0,x2:void 0,y1:0,y2:u});let m=apiKeyHelperCache.get(s);if(hUe(s,p,AUe(),{offsetX:0,offsetY:-c,prevScreen:void 0}),p.unclip(),r0t(s),m)apiKeyHelperCache.set(s,m);let f=p.get();s.dirty=!0;let A=[];for(let h=0;h<u;h++)A.push(bGn(f,o,h));return A}
function vTl(e,t,n){if(!n)return[];let r=apiKeyHelperCache.get(n);if(!r||r.height<=0)return[];let o=[],s=Math.min(r.y+r.height,e.screen.height);for(let i=Math.max(0,r.y);i<s;i++)o.push(bGn(e.screen,t,i));return o}
var jN;
var RTl=b(()=>{ki();LZ();X0e();bk();tAe();t0t();o0t();N4();STl();bTl();ACo();jN=M(Te(),1)});
export {wTl,dnm,pnm,vTl,jN,RTl};
