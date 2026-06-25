// @ts-nocheck
import {AA,bgn,k2,RA} from "./m1783.ts";
import {FIt,TQs} from "./m1784.ts";
import {Sp} from "./m1722.ts";
import {b,x} from "../runtime.ts";
import {iT} from "./m1780.ts";
class BIt{constructor(e,t){this.proxyUrl=e||"",this.customAgentOptions=t||{}}async sendGetRequestAsync(e,t,n){if(this.proxyUrl)return SQs(e,this.proxyUrl,AA.GET,t,this.customAgentOptions,n);else return bQs(e,AA.GET,t,this.customAgentOptions,n)}async sendPostRequestAsync(e,t){if(this.proxyUrl)return SQs(e,this.proxyUrl,AA.POST,t,this.customAgentOptions);else return bQs(e,AA.POST,t,this.customAgentOptions)}}
var Agn,pMr,SQs=(e,t,n,r,o,s)=>{let i=new URL(e),a=new URL(t),l=r?.headers||{},c={host:a.hostname,port:a.port,method:"CONNECT",path:i.hostname,headers:l};if(o&&Object.keys(o).length)c.agent=new Agn.default.Agent(o);let u="";if(n===AA.POST){let p=r?.body||"";u=`Content-Type: application/x-www-form-urlencoded\r
Content-Length: ${p.length}\r
\r
${p}`}else if(s)c.timeout=s;let d=`${n.toUpperCase()} ${i.href} HTTP/1.1\r
Host: ${i.host}\r
Connection: close\r
`+u+`\r
`;return new Promise((p,m)=>{let f=Agn.default.request(c);if(s)f.on("timeout",()=>{f.destroy(),m(Error("Request time out"))});f.end(),f.on("connect",(h,g)=>{let _=h?.statusCode||bgn.SERVER_ERROR;if(_<bgn.SUCCESS_RANGE_START||_>bgn.SUCCESS_RANGE_END)f.destroy(),g.destroy(),m(Error(`Error connecting to proxy. Http status code: ${h.statusCode}. Http status message: ${h?.statusMessage||"Unknown"}`));g.write(d);let T=[];g.on("data",(y)=>{T.push(y)}),g.on("end",()=>{let S=Buffer.concat([...T]).toString().split(`\r
`),E=parseInt(S[0].split(" ")[1]),R=S[0].split(" ").slice(2).join(" "),w=S[S.length-1],H=S.slice(1,S.length-2),k=new Map;H.forEach((L)=>{let P=L.split(new RegExp(/:\s(.*)/s)),M=P[0],B=P[1];try{let N=JSON.parse(B);if(N&&typeof N==="object")B=N}catch(N){}k.set(M,B)});let D=Object.fromEntries(k),O=FIt.getNetworkResponse(D,EQs(E,R,D,w),E);if((E<Sp.SUCCESS_RANGE_START||E>Sp.SUCCESS_RANGE_END)&&O.body.error!==k2.AUTHORIZATION_PENDING)f.destroy();p(O)}),g.on("error",(y)=>{f.destroy(),g.destroy(),m(Error(y.toString()))})}),f.on("error",(h)=>{f.destroy(),m(Error(h.toString()))})})},bQs=(e,t,n,r,o)=>{let s=t===AA.POST,i=n?.body||"",a=new URL(e),l=n?.headers||{},c={method:t,headers:l,...FIt.urlToHttpOptions(a)};if(r&&Object.keys(r).length)c.agent=new pMr.default.Agent(r);if(s)c.headers={...c.headers,"Content-Length":i.length};else if(o)c.timeout=o;return new Promise((u,d)=>{let p;if(c.protocol==="http:")p=Agn.default.request(c);else p=pMr.default.request(c);if(s)p.write(i);if(o)p.on("timeout",()=>{p.destroy(),d(Error("Request time out"))});p.end(),p.on("response",(m)=>{let{headers:f,statusCode:h,statusMessage:g}=m,_=[];m.on("data",(T)=>{_.push(T)}),m.on("end",()=>{let T=Buffer.concat([..._]).toString(),y=f,S=FIt.getNetworkResponse(y,EQs(h,g,y,T),h);if((h<Sp.SUCCESS_RANGE_START||h>Sp.SUCCESS_RANGE_END)&&S.body.error!==k2.AUTHORIZATION_PENDING)p.destroy();u(S)})}),p.on("error",(m)=>{p.destroy(),d(Error(m.toString()))})})},EQs=(e,t,n,r)=>{let o;try{o=JSON.parse(r)}catch(s){let i,a;if(e>=Sp.CLIENT_ERROR_RANGE_START&&e<=Sp.CLIENT_ERROR_RANGE_END)i="client_error",a="A client";else if(e>=Sp.SERVER_ERROR_RANGE_START&&e<=Sp.SERVER_ERROR_RANGE_END)i="server_error",a="A server";else i="unknown_error",a="An unknown";o={error:i,error_description:`${a} error occured.
Http status code: ${e}
Http status message: ${t||"Unknown"}
Headers: ${JSON.stringify(n)}`}}return o};
var CQs=b(()=>{iT();RA();TQs();Agn=x(require("http")),pMr=x(require("https"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {BIt,Agn,pMr,SQs,bQs,EQs,CQs};
