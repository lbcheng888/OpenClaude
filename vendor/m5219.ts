// @ts-nocheck
import {getAllMcpConfigs,addMcpConfig,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {useTheme} from "./m2274.ts";
import {writeToStdout,fO} from "./m230.ts";
import {No} from "./m2421.ts";
import {Cn,dr} from "./m231.ts";
import {gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {Text} from "./m2423.ts";
import {sDe,d6t} from "./m4520.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function i2l(e){let t=s2l.c(36),{servers:n,scope:r,onDone:o}=e,s;if(t[0]!==n)s=Object.keys(n),t[0]=n,t[1]=s;else s=t[1];let i=s,a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a={},t[2]=a;else a=t[2];let[l,c]=JN.useState(a),u,d;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>{getAllMcpConfigs().then((N)=>{let{servers:O}=N;return c(O)})},d=[],t[3]=u,t[4]=d;else u=t[3],d=t[4];JN.useEffect(u,d);let p;if(t[5]!==l||t[6]!==i)p=i.filter((N)=>l[N]!==void 0),t[5]=l,t[6]=i,t[7]=p;else p=t[7];let m=p,f=async function(O){let $=0;for(let U of O){let W=n[U];if(W){let G=U;if(l[G]!==void 0){let V=1;while(l[`${U}_${V}`]!==void 0)V++;G=`${U}_${V}`}await addMcpConfig(G,W,r),$++}}g($)},[A]=useTheme(),h;if(t[8]!==o||t[9]!==r||t[10]!==A)h=(N)=>{if(N>0)writeToStdout(`
${No("success",A)(`Successfully imported ${N} MCP ${Cn(N,"server")} to ${r} config.`)}
`);else writeToStdout(`
No servers were imported.`);o(),gracefulShutdown()},t[8]=o,t[9]=r,t[10]=A,t[11]=h;else h=t[11];let g=h,_;if(t[12]!==g)_=()=>{g(0)},t[12]=g,t[13]=_;else _=t[13];let y=_,T=i.length,S;if(t[14]!==i.length)S=Cn(i.length,"server"),t[14]=i.length,t[15]=S;else S=t[15];let v=`Found ${T} MCP ${S} in Claude Desktop.`,R;if(t[16]!==m.length)R=m.length>0&&JN.default.createElement(Text,{color:"warning"},"Note: Some servers already exist with the same name. If selected, they will be imported with a numbered suffix."),t[16]=m.length,t[17]=R;else R=t[17];let k;if(t[18]===Symbol.for("react.memo_cache_sentinel"))k=JN.default.createElement(Text,null,"Please select the servers you want to import:"),t[18]=k;else k=t[18];let x,H;if(t[19]!==m||t[20]!==i)x=i.map((N)=>({label:`${N}${m.includes(N)?" (already exists)":""}`,value:N})),H=i.filter((N)=>!m.includes(N)),t[19]=m,t[20]=i,t[21]=x,t[22]=H;else x=t[21],H=t[22];let I;if(t[23]!==y||t[24]!==f||t[25]!==x||t[26]!==H)I=JN.default.createElement(sDe,{options:x,defaultValue:H,onSubmit:f,onCancel:y,hideIndexes:!0}),t[23]=y,t[24]=f,t[25]=x,t[26]=H,t[27]=I;else I=t[27];let P;if(t[28]!==y||t[29]!==v||t[30]!==R||t[31]!==I)P=JN.default.createElement(Kn,{title:"Import MCP Servers from Claude Desktop",subtitle:v,color:"success",onCancel:y,hideInputGuide:!0},R,k,I),t[28]=y,t[29]=v,t[30]=R,t[31]=I,t[32]=P;else P=t[32];let L;if(t[33]===Symbol.for("react.memo_cache_sentinel"))L=JN.default.createElement(Box,{paddingX:1},JN.default.createElement(Text,{dimColor:!0,italic:!0},JN.default.createElement(Tn,null,JN.default.createElement(at,{chord:"space",action:"select"}),JN.default.createElement(at,{chord:"enter",action:"confirm"}),JN.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})))),t[33]=L;else L=t[33];let D;if(t[34]!==P)D=JN.default.createElement(JN.default.Fragment,null,P,L),t[34]=P,t[35]=D;else D=t[35];return D}
var s2l,JN;
var a2l=b(()=>{ym();fO();ze();px();dr();readRoster();d6t();zs();Li();rs();s2l=M(rt(),1),JN=M(Te(),1)});
export {i2l,s2l,JN,a2l};
