// @ts-nocheck
import {Nf,Krt} from "./m2720.ts";
import {Vns} from "./m617.ts";
import {ay,E$} from "./m2821.ts";
import {yIe,x3e} from "./m3323.ts";
import {useTheme} from "./m2285.ts";
import {o9n,BI,m3t} from "./m3955.ts";
import {vAn,a4} from "./m2436.ts";
import {oxe,po} from "../src/tools/5224_userPromptCount.ts";
import {Ansi} from "./m2441.ts";
import {O2a,L2a} from "./m3956.ts";
import {Box} from "./m2432.ts";
import {bt,Gc} from "./m588.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function UHp(e){return BHp.test(e.length>500?e.slice(0,500):e)}
function $Hp(e,t=!0){if(!UHp(e))return[{type:"paragraph",raw:e,text:e,tokens:[{type:"text",raw:e,text:e}]}];if(!t)return Nf.lexer(e);let n=Vns(e),r=o6e.get(n);if(r)return o6e.delete(n),o6e.set(n,r),r;let o=Nf.lexer(e);if(o6e.size>=FHp){let s=o6e.keys().next().value;if(s!==void 0)o6e.delete(s)}return o6e.set(n,o),o}
function gh(e){let t=i9n.c(5),n=ay(),r;if(t[0]!==n.syntaxHighlightingDisabled)r=n.syntaxHighlightingDisabled?null:yIe(),t[0]=n.syntaxHighlightingDisabled,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==o||t[3]!==e)s=gY.jsx(qHp,{...e,highlight:o}),t[2]=o,t[3]=e,t[4]=s;else s=t[4];return s}
function qHp(e){let t=i9n.c(12),{children:n,dimColor:r,italic:o,stripPromptTags:s,tailWrap:i,skipTokenCache:a,highlight:l}=e,c=s===void 0?!0:s,u=a===void 0?!1:a,[d]=useTheme();o9n();let p=vAn(),m;if(t[0]!==n||t[1]!==r||t[2]!==l||t[3]!==o||t[4]!==p||t[5]!==u||t[6]!==c||t[7]!==i||t[8]!==d){let g=c?oxe(n):n,_=$Hp(g,!u);m=[];let T="",y=function(E){if(T)m.push(gY.jsx(Ansi,{dimColor:r,italic:o,wrap:E,children:T.replace(/^\n+/,"").trimEnd()},m.length)),T=""};for(let S of _)if(S.type==="table")y(),m.push(gY.jsx(O2a,{token:S,highlight:l,linkCap:p},m.length));else if(S.type==="blockquote")y(),m.push(gY.jsx(WHp,{token:S,theme:d,highlight:l,dimColor:r,linkCap:p},m.length));else T=T+BI(S,d,0,null,null,l,!1,p);y(i),t[0]=n,t[1]=r,t[2]=l,t[3]=o,t[4]=p,t[5]=u,t[6]=c,t[7]=i,t[8]=d,t[9]=m}else m=t[9];let f=m,h;if(t[10]!==f)h=gY.jsx(Box,{flexDirection:"column",gap:1,children:f}),t[10]=f,t[11]=h;else h=t[11];return h}
function WHp(e){let t=i9n.c(12),{token:n,theme:r,highlight:o,dimColor:s,linkCap:i}=e,a;if(t[0]!==o||t[1]!==i||t[2]!==r||t[3]!==n.tokens){let u;if(t[5]!==o||t[6]!==i||t[7]!==r)u=(d)=>BI(d,r,0,null,null,o,!1,i),t[5]=o,t[6]=i,t[7]=r,t[8]=u;else u=t[8];a=bt.italic(n.tokens.map(u).join("").replace(/^\n+/,"").trimEnd()),t[0]=o,t[1]=i,t[2]=r,t[3]=n.tokens,t[4]=a}else a=t[4];let l=a,c;if(t[9]!==s||t[10]!==l)c=gY.jsx(Box,{borderStyle:"quote",borderTop:!1,borderBottom:!1,borderRight:!1,borderDimColor:!0,paddingLeft:1,children:gY.jsx(Ansi,{dimColor:s,children:l})}),t[9]=s,t[10]=l,t[11]=c;else c=t[11];return c}
function N2a({children:e,hideTrailingLine:t=!1}){o9n();let n=oxe(e),r=M2a.useRef("");if(!n.startsWith(r.current))r.current="";let o=r.current.length,s=Nf.lexer(n.substring(o)),i=s.length-1;while(i>=0&&s[i].type==="space")i--;let a=0;for(let d=0;d<i;d++)a+=s[d].raw.length;if(a>0)r.current=n.substring(0,o+a);let l=r.current,c=n.substring(l.length),u=!c.endsWith(`
`);return gY.jsxs(Box,{flexDirection:"column",gap:1,children:[l&&gY.jsx(gh,{skipTokenCache:!0,children:l}),c&&gY.jsx(gh,{tailWrap:t&&u?"wrap-stream":void 0,skipTokenCache:!0,children:c})]})}
var i9n,M2a,gY,FHp=500,o6e,BHp;
var G1=b(()=>{Gc();Krt();E$();a4();je();x3e();m3t();po();L2a();i9n=x(tt(),1),M2a=x(et(),1),gY=x(oe(),1),o6e=new Map,BHp=/[#*`|[>\-_~]|\n\n|(?:^|\n) {0,3}\d+\. |https?:\/\/|www\./});
export {UHp,$Hp,gh,qHp,WHp,N2a,i9n,M2a,gY,FHp,o6e,BHp,G1};
