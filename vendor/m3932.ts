// @ts-nocheck
import {OA,Wtt} from "./m2708.ts";
import {zJo} from "./m611.ts";
import {sy,e9} from "./m2808.ts";
import {Ike,T9e} from "./m3307.ts";
import {useTheme} from "./m2274.ts";
import {pUn,z0,V2t} from "./m3930.ts";
import {FSn,U4} from "./m2426.ts";
import {rIe,lo} from "../src/tools/5190_userPromptCount.ts";
import {Ansi} from "./m2431.ts";
import {tMa,nMa} from "./m3931.ts";
import {Box} from "./m2422.ts";
import {_t,cu} from "./m582.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function xSp(e){return RSp.test(e.length>500?e.slice(0,500):e)}
function kSp(e,t=!0){if(!xSp(e))return[{type:"paragraph",raw:e,text:e,tokens:[{type:"text",raw:e,text:e}]}];if(!t)return OA.lexer(e);let n=zJo(e),r=Y4e.get(n);if(r)return Y4e.delete(n),Y4e.set(n,r),r;let o=OA.lexer(e);if(Y4e.size>=wSp){let s=Y4e.keys().next().value;if(s!==void 0)Y4e.delete(s)}return Y4e.set(n,o),o}
function l_(e){let t=fUn.c(5),n=sy(),r;if(t[0]!==n.syntaxHighlightingDisabled)r=n.syntaxHighlightingDisabled?null:Ike(),t[0]=n.syntaxHighlightingDisabled,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==o||t[3]!==e)s=GW.default.createElement(HSp,{...e,highlight:o}),t[2]=o,t[3]=e,t[4]=s;else s=t[4];return s}
function HSp(e){let t=fUn.c(12),{children:n,dimColor:r,italic:o,stripPromptTags:s,tailWrap:i,skipTokenCache:a,highlight:l}=e,c=s===void 0?!0:s,u=a===void 0?!1:a,[d]=useTheme();pUn();let p=FSn(),m;if(t[0]!==n||t[1]!==r||t[2]!==l||t[3]!==o||t[4]!==p||t[5]!==u||t[6]!==c||t[7]!==i||t[8]!==d){let h=c?rIe(n):n,g=kSp(h,!u);m=[];let _="",y=function(S){if(_)m.push(GW.default.createElement(Ansi,{key:m.length,dimColor:r,italic:o,wrap:S},_.replace(/^\n+/,"").trimEnd())),_=""};for(let T of g)if(T.type==="table")y(),m.push(GW.default.createElement(tMa,{key:m.length,token:T,highlight:l,linkCap:p}));else if(T.type==="blockquote")y(),m.push(GW.default.createElement(ISp,{key:m.length,token:T,theme:d,highlight:l,dimColor:r,linkCap:p}));else _=_+z0(T,d,0,null,null,l,!1,p);y(i),t[0]=n,t[1]=r,t[2]=l,t[3]=o,t[4]=p,t[5]=u,t[6]=c,t[7]=i,t[8]=d,t[9]=m}else m=t[9];let f=m,A;if(t[10]!==f)A=GW.default.createElement(Box,{flexDirection:"column",gap:1},f),t[10]=f,t[11]=A;else A=t[11];return A}
function ISp(e){let t=fUn.c(12),{token:n,theme:r,highlight:o,dimColor:s,linkCap:i}=e,a;if(t[0]!==o||t[1]!==i||t[2]!==r||t[3]!==n.tokens){let u;if(t[5]!==o||t[6]!==i||t[7]!==r)u=(d)=>z0(d,r,0,null,null,o,!1,i),t[5]=o,t[6]=i,t[7]=r,t[8]=u;else u=t[8];a=_t.italic(n.tokens.map(u).join("").replace(/^\n+/,"").trimEnd()),t[0]=o,t[1]=i,t[2]=r,t[3]=n.tokens,t[4]=a}else a=t[4];let l=a,c;if(t[9]!==s||t[10]!==l)c=GW.default.createElement(Box,{borderStyle:"quote",borderTop:!1,borderBottom:!1,borderRight:!1,borderDimColor:!0,paddingLeft:1},GW.default.createElement(Ansi,{dimColor:s},l)),t[9]=s,t[10]=l,t[11]=c;else c=t[11];return c}
function rMa({children:e,hideTrailingLine:t=!1}){pUn();let n=rIe(e),r=GW.useRef("");if(!n.startsWith(r.current))r.current="";let o=r.current.length,s=OA.lexer(n.substring(o)),i=s.length-1;while(i>=0&&s[i].type==="space")i--;let a=0;for(let d=0;d<i;d++)a+=s[d].raw.length;if(a>0)r.current=n.substring(0,o+a);let l=r.current,c=n.substring(l.length),u=!c.endsWith(`
`);return GW.default.createElement(Box,{flexDirection:"column",gap:1},l&&GW.default.createElement(l_,{skipTokenCache:!0},l),c&&GW.default.createElement(l_,{tailWrap:t&&u?"wrap-stream":void 0,skipTokenCache:!0},c))}
var fUn,GW,wSp=500,Y4e,RSp;
var dU=b(()=>{cu();Wtt();e9();U4();ze();T9e();V2t();lo();nMa();fUn=M(rt(),1),GW=M(Te(),1),Y4e=new Map,RSp=/[#*`|[>\-_~]|\n\n|(?:^|\n) {0,3}\d+\. |https?:\/\/|www\./});
export {xSp,kSp,l_,HSp,ISp,rMa,fUn,GW,wSp,Y4e,RSp,dU};
