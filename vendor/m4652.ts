// @ts-nocheck
import {useTheme} from "./m2274.ts";
import {Or,Ts} from "./m2542.ts";
import {Rae,xae,Gnt} from "../src/config/3017_hosts.ts";
import {Nae,Kz,Bae} from "../src/config/3151_error.ts";
import {Xx,dr} from "./m231.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {tp,_x} from "../src/tui/3835_mode.ts";
import {Link} from "./m2427.ts";
import {lr,readRoster} from "./m2547.ts";
import {Kn,Li} from "./m2572.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {cA,hje} from "./m4517.ts";
import {No} from "./m2421.ts";
import {et,Ai} from "./m2208.ts";
import {nl,v_} from "./m2573.ts";
import {pr} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {Te} from "./m2253.ts";
function HSo({agentServer:e,onCancel:t,onComplete:n}){let[r]=useTheme(),[o,s]=Bc.useState(!1),[i,a]=Bc.useState(null),[l,c]=Bc.useState(null),u=Bc.useRef(null);Bc.useEffect(()=>()=>u.current?.abort(),[]);let d=Bc.useCallback(()=>{if(o)u.current?.abort(),u.current=null,s(!1),c(null)},[o]);Or("confirm:no",d,{context:"Confirmation",isActive:o});let p=Bc.useCallback(async()=>{if(!e.needsAuth||!e.url)return;if((e.transport==="http"||e.transport==="sse")&&Rae(e.url)){a(xae(e.name));return}s(!0),a(null);let A=new AbortController;u.current=A;try{let h={type:e.transport,url:e.url};await Nae(e.name,h,c,A.signal),n(`Authentication successful for ${e.name}. The server will connect when the agent runs.`)}catch(h){if(h instanceof Error&&!(h instanceof Kz))a(h.message)}finally{s(!1),u.current=null}},[e,n]),m=Xx(String(e.name));if(o)return Bc.default.createElement(Box,{flexDirection:"column",gap:1,padding:1},Bc.default.createElement(Text,{color:"claude"},"Authenticating with ",e.name,"\u2026"),Bc.default.createElement(Box,null,Bc.default.createElement(tp,null),Bc.default.createElement(Text,null," A browser window will open for authentication")),l&&Bc.default.createElement(Box,{flexDirection:"column"},Bc.default.createElement(Text,{dimColor:!0},"If your browser doesn't open automatically, copy this URL manually:"),Bc.default.createElement(Link,{url:l})),Bc.default.createElement(Box,{marginLeft:3},Bc.default.createElement(Text,{dimColor:!0},"Return here after authenticating in your browser."," ",Bc.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"}))));let f=[];if(e.needsAuth)f.push({label:e.isAuthenticated?"Re-authenticate":"Authenticate",value:"auth"});return f.push({label:"Back",value:"back"}),Bc.default.createElement(Kn,{title:`${m} MCP Server`,subtitle:"agent-only",onCancel:t,inputGuide:Bc.default.createElement(Tn,null,Bc.default.createElement(at,{chord:["up","down"],action:"navigate"}),Bc.default.createElement(at,{chord:"enter",action:"confirm"}),Bc.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"}))},Bc.default.createElement(cA,{box:"plain",columns:[{bold:!0,width:8},{}]},Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"Type:"),Bc.default.createElement(Text,{dimColor:!0},e.transport)),e.url&&Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"URL:"),Bc.default.createElement(Text,{dimColor:!0},e.url)),e.command&&Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"Command:"),Bc.default.createElement(Text,{dimColor:!0},e.command)),Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"Used by:"),Bc.default.createElement(Text,{dimColor:!0},e.sourceAgents.join(", ")))),Bc.default.createElement(Box,null,Bc.default.createElement(cA,{box:"plain",columns:[{bold:!0,width:8},{}]},Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"Status:"),Bc.default.createElement(Text,null,No("inactive",r)(et.radioOff)," not connected (agent-only)")),e.needsAuth&&Bc.default.createElement(cA.Row,null,Bc.default.createElement(Bc.default.Fragment,null,"Auth:"),e.isAuthenticated?Bc.default.createElement(Text,null,No("success",r)(et.tick)," authenticated"):Bc.default.createElement(Text,null,No("warning",r)(et.triangleUpOutline)," may need authentication")))),Bc.default.createElement(Box,null,Bc.default.createElement(Text,{dimColor:!0},"This server connects only when running the agent.")),i&&Bc.default.createElement(Box,null,Bc.default.createElement(nl,{error:i})),Bc.default.createElement(Box,null,Bc.default.createElement(pr,{options:f,onChange:async(A)=>{switch(A){case"auth":await p();break;case"back":t();break}},onCancel:t})))}
var Bc;
var ISo=b(()=>{Ai();ze();Ts();Gnt();Bae();dr();readRoster();yb();zs();Li();v_();rs();hje();_x();Bc=M(Te(),1)});
export {HSo,Bc,ISo};
