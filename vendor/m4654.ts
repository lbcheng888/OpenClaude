// @ts-nocheck
import {useTheme} from "./m2274.ts";
import {Mc,configProtoStore} from "./m2458.ts";
import {lmt,Sue} from "./m4650.ts";
import {Text} from "./m2423.ts";
import {Jc,vE} from "./m3837.ts";
import {Box} from "./m2422.ts";
import {No} from "./m2421.ts";
import {et,Ai} from "./m2208.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function OSo(e){let t=Qpl.c(25),{serverName:n,onComplete:r}=e,[o]=useTheme(),s=Mc(),i=lmt(),[a,l]=W9.useState(!0),[c,u]=W9.useState(null),d,p;if(t[0]!==r||t[1]!==i||t[2]!==n||t[3]!==s)d=()=>{(async function(){try{if(!s.getState().mcp.clients.find((g)=>g.name===n)){u(`MCP server "${n}" not found`),l(!1),r(`MCP server "${n}" not found`);return}let h=await i(n);e:switch(h.client.type){case"connected":{l(!1),r(`Successfully reconnected to ${n}`);break e}case"needs-auth":{u(`${n} requires authentication`),l(!1),r(`${n} requires authentication. Use /mcp to authenticate.`);break e}case"pending":case"failed":case"disabled":u(`Failed to reconnect to ${n}`),l(!1),r(`Failed to reconnect to ${n}`)}}catch(A){let h=A,g=h instanceof Error?h.message:String(h);u(g),l(!1),r(`Error: ${g}`)}})()},p=[n,i,s,r],t[0]=r,t[1]=i,t[2]=n,t[3]=s,t[4]=d,t[5]=p;else d=t[4],p=t[5];if(W9.useEffect(d,p),a){let m;if(t[6]!==n)m=W9.default.createElement(Text,{color:"text"},"Reconnecting to ",W9.default.createElement(Text,{bold:!0},n)),t[6]=n,t[7]=m;else m=t[7];let f;if(t[8]===Symbol.for("react.memo_cache_sentinel"))f=W9.default.createElement(Jc,{message:"Establishing connection to MCP server"}),t[8]=f;else f=t[8];let A;if(t[9]!==m)A=W9.default.createElement(Box,{flexDirection:"column",gap:1,padding:1},m,f),t[9]=m,t[10]=A;else A=t[10];return A}if(c){let m;if(t[11]!==o)m=No("error",o)(et.cross),t[11]=o,t[12]=m;else m=t[12];let f;if(t[13]!==m)f=W9.default.createElement(Text,null,m," "),t[13]=m,t[14]=f;else f=t[14];let A;if(t[15]!==n)A=W9.default.createElement(Text,{color:"error"},"Failed to reconnect to ",n),t[15]=n,t[16]=A;else A=t[16];let h;if(t[17]!==f||t[18]!==A)h=W9.default.createElement(Box,null,f,A),t[17]=f,t[18]=A,t[19]=h;else h=t[19];let g;if(t[20]!==c)g=W9.default.createElement(Text,{dimColor:!0},"Error: ",c),t[20]=c,t[21]=g;else g=t[21];let _;if(t[22]!==h||t[23]!==g)_=W9.default.createElement(Box,{flexDirection:"column",gap:1,padding:1},h,g),t[22]=h,t[23]=g,t[24]=_;else _=t[24];return _}return null}
var Qpl,W9;
var LSo=b(()=>{Ai();ze();Sue();configProtoStore();vE();Qpl=M(rt(),1),W9=M(Te(),1)});
export {OSo,Qpl,W9,LSo};
