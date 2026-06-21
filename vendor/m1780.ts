// @ts-nocheck
import {gv,Fmn,s$,_v} from "./m1778.ts";
import {dxt,C7s} from "./m1779.ts";
import {em} from "./m1717.ts";
import {b,M} from "../runtime.ts";
import {AT} from "./m1775.ts";
class pxt{constructor(e,t){this.proxyUrl=e||"",this.customAgentOptions=t||{}}async sendGetRequestAsync(e,t,n){if(this.proxyUrl)return v7s(e,this.proxyUrl,gv.GET,t,this.customAgentOptions,n);else return w7s(e,gv.GET,t,this.customAgentOptions,n)}async sendPostRequestAsync(e,t){if(this.proxyUrl)return v7s(e,this.proxyUrl,gv.POST,t,this.customAgentOptions);else return w7s(e,gv.POST,t,this.customAgentOptions)}}
var qmn,M0r,v7s=(e,t,n,r,o,s)=>{let i=new URL(e),a=new URL(t),l=r?.headers||{},c={host:a.hostname,port:a.port,method:"CONNECT",path:i.hostname,headers:l};if(o&&Object.keys(o).length)c.agent=new qmn.default.Agent(o);let u="";if(n===gv.POST){let p=r?.body||"";u=`Content-Type: application/x-www-form-urlencoded\r
Content-Length: ${p.length}\r
\r
${p}`}else if(s)c.timeout=s;let d=`${n.toUpperCase()} ${i.href} HTTP/1.1\r
Host: ${i.host}\r
Connection: close\r
`+u+`\r
`;return new Promise((p,m)=>{let f=qmn.default.request(c);if(s)f.on("timeout",()=>{f.destroy(),m(Error("Request time out"))});f.end(),f.on("connect",(A,h)=>{let g=A?.statusCode||Fmn.SERVER_ERROR;if(g<Fmn.SUCCESS_RANGE_START||g>Fmn.SUCCESS_RANGE_END)f.destroy(),h.destroy(),m(Error(`Error connecting to proxy. Http status code: ${A.statusCode}. Http status message: ${A?.statusMessage||"Unknown"}`));h.write(d);let _=[];h.on("data",(y)=>{_.push(y)}),h.on("end",()=>{let T=Buffer.concat([..._]).toString().split(`\r
`),S=parseInt(T[0].split(" ")[1]),v=T[0].split(" ").slice(2).join(" "),R=T[T.length-1],k=T.slice(1,T.length-2),x=new Map;k.forEach((L)=>{let D=L.split(new RegExp(/:\s(.*)/s)),N=D[0],O=D[1];try{let $=JSON.parse(O);if($&&typeof $==="object")O=$}catch($){}x.set(N,O)});let I=Object.fromEntries(x),P=dxt.getNetworkResponse(I,R7s(S,v,I,R),S);if((S<em.SUCCESS_RANGE_START||S>em.SUCCESS_RANGE_END)&&P.body.error!==s$.AUTHORIZATION_PENDING)f.destroy();p(P)}),h.on("error",(y)=>{f.destroy(),h.destroy(),m(Error(y.toString()))})}),f.on("error",(A)=>{f.destroy(),m(Error(A.toString()))})})},w7s=(e,t,n,r,o)=>{let s=t===gv.POST,i=n?.body||"",a=new URL(e),l=n?.headers||{},c={method:t,headers:l,...dxt.urlToHttpOptions(a)};if(r&&Object.keys(r).length)c.agent=new M0r.default.Agent(r);if(s)c.headers={...c.headers,"Content-Length":i.length};else if(o)c.timeout=o;return new Promise((u,d)=>{let p;if(c.protocol==="http:")p=qmn.default.request(c);else p=M0r.default.request(c);if(s)p.write(i);if(o)p.on("timeout",()=>{p.destroy(),d(Error("Request time out"))});p.end(),p.on("response",(m)=>{let{headers:f,statusCode:A,statusMessage:h}=m,g=[];m.on("data",(_)=>{g.push(_)}),m.on("end",()=>{let _=Buffer.concat([...g]).toString(),y=f,T=dxt.getNetworkResponse(y,R7s(A,h,y,_),A);if((A<em.SUCCESS_RANGE_START||A>em.SUCCESS_RANGE_END)&&T.body.error!==s$.AUTHORIZATION_PENDING)p.destroy();u(T)})}),p.on("error",(m)=>{p.destroy(),d(Error(m.toString()))})})},R7s=(e,t,n,r)=>{let o;try{o=JSON.parse(r)}catch(s){let i,a;if(e>=em.CLIENT_ERROR_RANGE_START&&e<=em.CLIENT_ERROR_RANGE_END)i="client_error",a="A client";else if(e>=em.SERVER_ERROR_RANGE_START&&e<=em.SERVER_ERROR_RANGE_END)i="server_error",a="A server";else i="unknown_error",a="An unknown";o={error:i,error_description:`${a} error occured.
Http status code: ${e}
Http status message: ${t||"Unknown"}
Headers: ${JSON.stringify(n)}`}}return o};
var x7s=b(()=>{AT();_v();C7s();qmn=M(require("http")),M0r=M(require("https"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {pxt,qmn,M0r,v7s,w7s,R7s,x7s};
