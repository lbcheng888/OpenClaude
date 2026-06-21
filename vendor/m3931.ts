// @ts-nocheck
import {buildSystemPrompt,ope} from "./m236.ts";
import {useTheme} from "./m2274.ts";
import {mr,ki} from "./m2453.ts";
import {z0,dUn,V2t} from "./m3930.ts";
import {Ec} from "./m2449.ts";
import {tn,Hc} from "./m235.ts";
import {Ansi} from "./m2431.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Y2t(e,t,n){if(t<=0)return[e];let r=e.trimEnd(),s=buildSystemPrompt(r,t,{hard:n?.hard??!1,trim:!1,wordWrap:!0}).split(`
`).filter((i)=>i.length>0);return s.length>0?s:[""]}
function tMa({token:e,highlight:t,forceWidth:n,linkCap:r}){let[o]=useTheme(),{columns:s}=mr(),i=n??s;function a(I){return I?.map((P)=>z0(P,o,0,null,null,t,!1,r)).join("")??""}function l(I){return Ec(a(I))}function c(I){let L=l(I).split(/\s+/).filter((D)=>D.length>0);if(L.length===0)return K2t;return Math.max(...L.map((D)=>tn(D)),K2t)}function u(I){return Math.max(tn(l(I)),K2t)}let d=e.header.map((I,P)=>{let L=c(I.tokens);for(let D of e.rows)L=Math.max(L,c(D[P]?.tokens));return L}),p=e.header.map((I,P)=>{let L=u(I.tokens);for(let D of e.rows)L=Math.max(L,u(D[P]?.tokens));return L}),m=e.header.length,f=1+m*3,A=Math.max(i-f-QLa,m*K2t),h=d.reduce((I,P)=>I+P,0),g=p.reduce((I,P)=>I+P,0),_=!1,y;if(g<=A)y=p;else if(h<=A){let I=A-h,P=p.map((D,N)=>D-d[N]),L=P.reduce((D,N)=>D+N,0);y=d.map((D,N)=>{if(L===0)return D;let O=Math.floor(P[N]/L*I);return D+O})}else{_=!0;let I=A/h;y=d.map((P)=>Math.max(Math.floor(P*I),K2t))}function T(){let I=1;for(let P=0;P<e.header.length;P++){let L=a(e.header[P].tokens),D=Y2t(L,y[P],{hard:_});I=Math.max(I,D.length)}for(let P of e.rows)for(let L=0;L<P.length;L++){let D=a(P[L]?.tokens),N=Y2t(D,y[L],{hard:_});I=Math.max(I,N.length)}return I}let v=T()>bSp;function R(I,P){let L=I.map(($,U)=>{let W=a($.tokens),G=y[U];return Y2t(W,G,{hard:_})}),D=Math.max(...L.map(($)=>$.length),1),N=L.map(($)=>Math.floor((D-$.length)/2)),O=[];for(let $=0;$<D;$++){let U="\u2502";for(let W=0;W<I.length;W++){let G=L[W],V=N[W],Q=$-V,K=Q>=0&&Q<G.length?G[Q]:"",Y=y[W],J=P?"center":e.align?.[W]??"left";U+=" "+dUn(K,tn(K),Y,J)+" \u2502"}O.push(U)}return O}function k(I){let[P,L,D,N]={top:["\u250C","\u2500","\u252C","\u2510"],middle:["\u251C","\u2500","\u253C","\u2524"],bottom:["\u2514","\u2500","\u2534","\u2518"]}[I],O=P;return y.forEach(($,U)=>{O+=L.repeat($+2),O+=U<y.length-1?D:N}),O}if(v)return z2t.default.createElement(ZLa,{headers:e.header.map((I)=>l(I.tokens)),rows:e.rows.map((I)=>I.map((P)=>a(P.tokens))),terminalWidth:i});let x=[];if(x.push(k("top")),x.push(...R(e.header,!0)),x.push(k("middle")),e.rows.forEach((I,P)=>{if(x.push(...R(I,!1)),P<e.rows.length-1)x.push(k("middle"))}),x.push(k("bottom")),Math.max(...x.map((I)=>tn(Ec(I))))>i-QLa)return z2t.default.createElement(ZLa,{headers:e.header.map((I)=>l(I.tokens)),rows:e.rows.map((I)=>I.map((P)=>a(P.tokens))),terminalWidth:i});return z2t.default.createElement(Ansi,null,x.join(`
`))}
function ZLa(e){let t=eMa.c(6),{headers:n,rows:r,terminalWidth:o}=e,s;if(t[0]!==n||t[1]!==r||t[2]!==o){s=[];let l=Math.min(o-1,40),c="\u2500".repeat(l);r.forEach((u)=>{let d=[];if(u.forEach((p,m)=>{let f=n[m]||"",A=p.trimEnd().replace(/\n+/g," ").replace(/\s+/g," ").trim();if(!f&&!A)return;let h=f?o-tn(f)-3:o-1,g=o-2-1,_=Y2t(A,Math.max(h,10)),y=_[0]||"",T;if(_.length<=1)T=_;else{let S=_.slice(1).map(vSp).join(" "),v=Y2t(S,g);T=[y,...v]}d.push(f?`${ESp}${f}:${CSp} ${T[0]||""}`:T[0]||"");for(let S=1;S<T.length;S++){let v=T[S];if(!v.trim())continue;d.push(`  ${v}`)}}),d.length===0)return;if(s.length>0)s.push(c);s.push(...d)}),t[0]=n,t[1]=r,t[2]=o,t[3]=s}else s=t[3];let i=s.join(`
`),a;if(t[4]!==i)a=z2t.default.createElement(Ansi,null,i),t[4]=i,t[5]=a;else a=t[5];return a}
function vSp(e){return e.trim()}
var eMa,z2t,QLa=4,K2t=3,bSp=4,ESp="\x1B[1m",CSp="\x1B[22m";
var nMa=b(()=>{ki();Hc();ope();ze();V2t();eMa=M(rt(),1),z2t=M(Te(),1)});
export {Y2t,tMa,ZLa,vSp,eMa,z2t,QLa,K2t,bSp,ESp,CSp,nMa};
