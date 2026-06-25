// @ts-nocheck
import {getAllMcpConfigs,addMcpConfig,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {useTheme} from "./m2285.ts";
import {writeToStdout,LP} from "./m232.ts";
import {color} from "./m2431.ts";
import {Sn,lr} from "./m233.ts";
import {gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {Text} from "./m2433.ts";
import {nPe,N8t} from "./m4540.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Y8l(e){let t=j8l.c(36),{servers:n,scope:r,onDone:o}=e,s;if(t[0]!==n)s=Object.keys(n),t[0]=n,t[1]=s;else s=t[1];let i=s,a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a={},t[2]=a;else a=t[2];let[l,c]=tZn.useState(a),u,d;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>{getAllMcpConfigs().then((M)=>{let{servers:B}=M;return c(B)})},d=[],t[3]=u,t[4]=d;else u=t[3],d=t[4];tZn.useEffect(u,d);let p;if(t[5]!==l||t[6]!==i)p=i.filter((M)=>l[M]!==void 0),t[5]=l,t[6]=i,t[7]=p;else p=t[7];let m=p,f=async function(B){let N=0;for(let F of B){let V=n[F];if(V){let G=F;if(l[G]!==void 0){let z=1;while(l[`${F}_${z}`]!==void 0)z++;G=`${F}_${z}`}await addMcpConfig(G,V,r),N++}}_(N)},[h]=useTheme(),g;if(t[8]!==o||t[9]!==r||t[10]!==h)g=(M)=>{if(M>0)writeToStdout(`
${color("success",h)(`Successfully imported ${M} MCP ${Sn(M,"server")} to ${r} config.`)}
`);else writeToStdout(`
No servers were imported.`);o(),gracefulShutdown()},t[8]=o,t[9]=r,t[10]=h,t[11]=g;else g=t[11];let _=g,T;if(t[12]!==_)T=()=>{_(0)},t[12]=_,t[13]=T;else T=t[13];let y=T,S=i.length,E;if(t[14]!==i.length)E=Sn(i.length,"server"),t[14]=i.length,t[15]=E;else E=t[15];let R=`Found ${S} MCP ${E} in Claude Desktop.`,w;if(t[16]!==m.length)w=m.length>0&&y9.jsx(Text,{color:"warning",children:"Note: Some servers already exist with the same name. If selected, they will be imported with a numbered suffix."}),t[16]=m.length,t[17]=w;else w=t[17];let H;if(t[18]===Symbol.for("react.memo_cache_sentinel"))H=y9.jsx(Text,{children:"Please select the servers you want to import:"}),t[18]=H;else H=t[18];let k,I;if(t[19]!==m||t[20]!==i)k=i.map((M)=>({label:`${M}${m.includes(M)?" (already exists)":""}`,value:M})),I=i.filter((M)=>!m.includes(M)),t[19]=m,t[20]=i,t[21]=k,t[22]=I;else k=t[21],I=t[22];let D;if(t[23]!==y||t[24]!==f||t[25]!==k||t[26]!==I)D=y9.jsx(nPe,{options:k,defaultValue:I,onSubmit:f,onCancel:y,hideIndexes:!0}),t[23]=y,t[24]=f,t[25]=k,t[26]=I,t[27]=D;else D=t[27];let O;if(t[28]!==y||t[29]!==R||t[30]!==w||t[31]!==D)O=y9.jsxs(preInitQueue,{title:"Import MCP Servers from Claude Desktop",subtitle:R,color:"success",onCancel:y,hideInputGuide:!0,children:[w,H,D]}),t[28]=y,t[29]=R,t[30]=w,t[31]=D,t[32]=O;else O=t[32];let L;if(t[33]===Symbol.for("react.memo_cache_sentinel"))L=y9.jsx(Box,{paddingX:1,children:y9.jsx(Text,{dimColor:!0,italic:!0,children:y9.jsxs(bn,{children:[y9.jsx(at,{chord:"space",action:"select"}),y9.jsx(at,{chord:"enter",action:"confirm"}),y9.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]})})}),t[33]=L;else L=t[33];let P;if(t[34]!==O)P=y9.jsxs(y9.Fragment,{children:[O,L]}),t[34]=O,t[35]=P;else P=t[35];return P}
var j8l,tZn,y9;
var J8l=b(()=>{isAmberSentinelEnabled();LP();je();KA();lr();uc();N8t();Is();di();Wo();j8l=x(tt(),1),tZn=x(et(),1),y9=x(oe(),1)});
export {Y8l,j8l,tZn,y9,J8l};
