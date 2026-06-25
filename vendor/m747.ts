// @ts-nocheck
import {Q} from "../runtime.ts";
import {jze} from "./m544.ts";
var mcs=Q((pYe)=>{var fcu=pYe&&pYe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(pYe,"__esModule",{value:!0});pYe.parseProxyResponse=void 0;var hcu=fcu(jze()),Rsn=(0,hcu.default)("https-proxy-agent:parse-proxy-response");function gcu(e){return new Promise((t,n)=>{let r=0,o=[];function s(){let u=e.read();if(u)c(u);else e.once("readable",s)}function i(){e.removeListener("end",a),e.removeListener("error",l),e.removeListener("readable",s)}function a(){i(),Rsn("onend"),n(Error("Proxy connection ended before receiving CONNECT response"))}function l(u){i(),Rsn("onerror %o",u),n(u)}function c(u){o.push(u),r+=u.length;let d=Buffer.concat(o,r),p=d.indexOf(`\r
\r
`);if(p===-1){Rsn("have not received end of HTTP headers yet..."),s();return}let m=d.slice(0,p).toString("ascii").split(`\r
`),f=m.shift();if(!f)return e.destroy(),n(Error("No header received from proxy CONNECT response"));let h=f.split(" "),g=+h[1],_=h.slice(2).join(" "),T={};for(let y of m){if(!y)continue;let S=y.indexOf(":");if(S===-1)return e.destroy(),n(Error(`Invalid header from proxy CONNECT response: "${y}"`));let E=y.slice(0,S).toLowerCase(),R=y.slice(S+1).trimStart(),w=T[E];if(typeof w==="string")T[E]=[w,R];else if(Array.isArray(w))w.push(R);else T[E]=R}Rsn("got proxy server response: %o %o",f,T),i(),t({connect:{statusCode:g,statusText:_,headers:T},buffered:d})}e.on("error",l),e.on("end",a),s()})}pYe.parseProxyResponse=gcu});
export {mcs};
