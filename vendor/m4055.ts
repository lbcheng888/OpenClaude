// @ts-nocheck
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {FR} from "./m2215.ts";
import {hA,dM,Pa} from "./m720.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {gh,G1} from "./m3957.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function q4a(e){let t=D3n.c(2),{content:n}=e,r;if(t[0]!==n){let o=fl(n,"local-command-stdout"),s=fl(n,"local-command-stderr");if(r=[],o?.trim()&&o.trim()!==FR)r.push(z1.jsx($4a,{children:o.trim()},"stdout"));if(s?.trim())r.push(z1.jsx($4a,{children:s.trim()},"stderr"));t[0]=n,t[1]=r}else r=t[1];if(r.length===0)return null;return r}
function $4a(e){let t=D3n.c(5),{children:n}=e;if(n.startsWith(`${hA} `)||n.startsWith(`${dM} `)){let s;if(t[0]!==n)s=z1.jsx(ADp,{children:n}),t[0]=n,t[1]=s;else s=t[1];return s}let r;if(t[2]===Symbol.for("react.memo_cache_sentinel"))r=z1.jsx(Text,{dimColor:!0,children:"  \u23BF  "}),t[2]=r;else r=t[2];let o;if(t[3]!==n)o=z1.jsxs(Box,{flexDirection:"row",children:[r,z1.jsx(Box,{flexDirection:"column",flexGrow:1,children:z1.jsx(gh,{children:n})})]}),t[3]=n,t[4]=o;else o=t[4];return o}
function ADp(e){let t=D3n.c(19),{children:n}=e,r=n[0],o,s,i;if(t[0]!==n){let f=n.indexOf(`
`),h=f===-1?n.slice(2):n.slice(2,f);s=f===-1?"":n.slice(f+1).trim();let g=h.indexOf(" \xB7 ");o=g===-1?h:h.slice(0,g),i=g===-1?"":h.slice(g),t[0]=n,t[1]=o,t[2]=s,t[3]=i}else o=t[1],s=t[2],i=t[3];let a=i,l;if(t[4]!==r)l=z1.jsxs(Text,{color:"background",children:[r," "]}),t[4]=r,t[5]=l;else l=t[5];let c;if(t[6]!==o)c=z1.jsx(Text,{bold:!0,children:o}),t[6]=o,t[7]=c;else c=t[7];let u;if(t[8]!==a)u=a&&z1.jsx(Text,{dimColor:!0,children:a}),t[8]=a,t[9]=u;else u=t[9];let d;if(t[10]!==l||t[11]!==c||t[12]!==u)d=z1.jsxs(Text,{children:[l,c,u]}),t[10]=l,t[11]=c,t[12]=u,t[13]=d;else d=t[13];let p;if(t[14]!==s)p=s&&z1.jsxs(Box,{flexDirection:"row",children:[z1.jsx(Text,{dimColor:!0,children:"  \u23BF  "}),z1.jsx(Text,{dimColor:!0,children:s})]}),t[14]=s,t[15]=p;else p=t[15];let m;if(t[16]!==d||t[17]!==p)m=z1.jsxs(Box,{flexDirection:"column",children:[d,p]}),t[16]=d,t[17]=p,t[18]=m;else m=t[18];return m}
var D3n,z1;
var W4a=b(()=>{Pa();je();po();G1();D3n=x(tt(),1),z1=x(oe(),1)});
export {q4a,$4a,ADp,D3n,z1,W4a};
