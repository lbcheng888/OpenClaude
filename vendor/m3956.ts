// @ts-nocheck
import {DN,ppe} from "./m238.ts";
import {useTheme} from "./m2285.ts";
import {_r,ui} from "./m2463.ts";
import {BI,r9n,m3t} from "./m3955.ts";
import {cc} from "./m2459.ts";
import {sn,mc} from "./m237.ts";
import {Ansi} from "./m2441.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function h3t(e,t,n){if(t<=0)return[e];let r=e.trimEnd(),s=DN(r,t,{hard:n?.hard??!1,trim:!1,wordWrap:!0}).split(`
`).filter((i)=>i.length>0);return s.length>0?s:[""]}
function O2a({token:e,highlight:t,forceWidth:n,linkCap:r}){let[o]=useTheme(),{columns:s}=_r(),i=n??s;function a(D){return D?.map((O)=>BI(O,o,0,null,null,t,!1,r)).join("")??""}function l(D){return cc(a(D))}function c(D){let L=l(D).split(/\s+/).filter((P)=>P.length>0);if(L.length===0)return f3t;return Math.max(...L.map((P)=>sn(P)),f3t)}function u(D){return Math.max(sn(l(D)),f3t)}let d=e.header.map((D,O)=>{let L=c(D.tokens);for(let P of e.rows)L=Math.max(L,c(P[O]?.tokens));return L}),p=e.header.map((D,O)=>{let L=u(D.tokens);for(let P of e.rows)L=Math.max(L,u(P[O]?.tokens));return L}),m=e.header.length,f=1+m*3,h=Math.max(i-f-x2a,m*f3t),g=d.reduce((D,O)=>D+O,0),_=p.reduce((D,O)=>D+O,0),T=!1,y;if(_<=h)y=p;else if(g<=h){let D=h-g,O=p.map((P,M)=>P-d[M]),L=O.reduce((P,M)=>P+M,0);y=d.map((P,M)=>{if(L===0)return P;let B=Math.floor(O[M]/L*D);return P+B})}else{T=!0;let D=h/g;y=d.map((O)=>Math.max(Math.floor(O*D),f3t))}function S(){let D=1;for(let O=0;O<e.header.length;O++){let L=a(e.header[O].tokens),P=h3t(L,y[O],{hard:T});D=Math.max(D,P.length)}for(let O of e.rows)for(let L=0;L<O.length;L++){let P=a(O[L]?.tokens),M=h3t(P,y[L],{hard:T});D=Math.max(D,M.length)}return D}let R=S()>OHp;function w(D,O){let L=D.map((N,F)=>{let V=a(N.tokens),G=y[F];return h3t(V,G,{hard:T})}),P=Math.max(...L.map((N)=>N.length),1),M=L.map((N)=>Math.floor((P-N.length)/2)),B=[];for(let N=0;N<P;N++){let F="\u2502";for(let V=0;V<D.length;V++){let G=L[V],z=M[V],J=N-z,K=J>=0&&J<G.length?G[J]:"",j=y[V],X=O?"center":e.align?.[V]??"left";F+=" "+r9n(K,sn(K),j,X)+" \u2502"}B.push(F)}return B}function H(D){let[O,L,P,M]={top:["\u250C","\u2500","\u252C","\u2510"],middle:["\u251C","\u2500","\u253C","\u2524"],bottom:["\u2514","\u2500","\u2534","\u2518"]}[D],B=O;return y.forEach((N,F)=>{B+=L.repeat(N+2),B+=F<y.length-1?P:M}),B}if(R)return g3t.jsx(D2a,{headers:e.header.map((D)=>l(D.tokens)),rows:e.rows.map((D)=>D.map((O)=>a(O.tokens))),terminalWidth:i});let k=[];if(k.push(H("top")),k.push(...w(e.header,!0)),k.push(H("middle")),e.rows.forEach((D,O)=>{if(k.push(...w(D,!1)),O<e.rows.length-1)k.push(H("middle"))}),k.push(H("bottom")),Math.max(...k.map((D)=>sn(cc(D))))>i-x2a)return g3t.jsx(D2a,{headers:e.header.map((D)=>l(D.tokens)),rows:e.rows.map((D)=>D.map((O)=>a(O.tokens))),terminalWidth:i});return g3t.jsx(Ansi,{children:k.join(`
`)})}
function D2a(e){let t=P2a.c(6),{headers:n,rows:r,terminalWidth:o}=e,s;if(t[0]!==n||t[1]!==r||t[2]!==o){s=[];let l=Math.min(o-1,40),c="\u2500".repeat(l);r.forEach((u)=>{let d=[];if(u.forEach((p,m)=>{let f=n[m]||"",h=p.trimEnd().replace(/\n+/g," ").replace(/\s+/g," ").trim();if(!f&&!h)return;let g=f?o-sn(f)-3:o-1,_=o-2-1,T=h3t(h,Math.max(g,10)),y=T[0]||"",S;if(T.length<=1)S=T;else{let E=T.slice(1).map(NHp).join(" "),R=h3t(E,_);S=[y,...R]}d.push(f?`${LHp}${f}:${MHp} ${S[0]||""}`:S[0]||"");for(let E=1;E<S.length;E++){let R=S[E];if(!R.trim())continue;d.push(`  ${R}`)}}),d.length===0)return;if(s.length>0)s.push(c);s.push(...d)}),t[0]=n,t[1]=r,t[2]=o,t[3]=s}else s=t[3];let i=s.join(`
`),a;if(t[4]!==i)a=g3t.jsx(Ansi,{children:i}),t[4]=i,t[5]=a;else a=t[5];return a}
function NHp(e){return e.trim()}
var P2a,g3t,x2a=4,f3t=3,OHp=4,LHp="\x1B[1m",MHp="\x1B[22m";
var L2a=b(()=>{ui();mc();ppe();je();m3t();P2a=x(tt(),1),g3t=x(oe(),1)});
export {h3t,O2a,D2a,NHp,P2a,g3t,x2a,f3t,OHp,LHp,MHp,L2a};
