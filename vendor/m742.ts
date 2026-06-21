// @ts-nocheck
import {X} from "../runtime.ts";
import {JVe} from "./m538.ts";
var yrs=X((fKe)=>{var QQc=fKe&&fKe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(fKe,"__esModule",{value:!0});fKe.parseProxyResponse=void 0;var ZQc=QQc(JVe()),qnn=(0,ZQc.default)("https-proxy-agent:parse-proxy-response");function eZc(e){return new Promise((t,n)=>{let r=0,o=[];function s(){let u=e.read();if(u)c(u);else e.once("readable",s)}function i(){e.removeListener("end",a),e.removeListener("error",l),e.removeListener("readable",s)}function a(){i(),qnn("onend"),n(Error("Proxy connection ended before receiving CONNECT response"))}function l(u){i(),qnn("onerror %o",u),n(u)}function c(u){o.push(u),r+=u.length;let d=Buffer.concat(o,r),p=d.indexOf(`\r
\r
`);if(p===-1){qnn("have not received end of HTTP headers yet..."),s();return}let m=d.slice(0,p).toString("ascii").split(`\r
`),f=m.shift();if(!f)return e.destroy(),n(Error("No header received from proxy CONNECT response"));let A=f.split(" "),h=+A[1],g=A.slice(2).join(" "),_={};for(let y of m){if(!y)continue;let T=y.indexOf(":");if(T===-1)return e.destroy(),n(Error(`Invalid header from proxy CONNECT response: "${y}"`));let S=y.slice(0,T).toLowerCase(),v=y.slice(T+1).trimStart(),R=_[S];if(typeof R==="string")_[S]=[R,v];else if(Array.isArray(R))R.push(v);else _[S]=v}qnn("got proxy server response: %o %o",f,_),i(),t({connect:{statusCode:h,statusText:g,headers:_},buffered:d})}e.on("error",l),e.on("end",a),s()})}fKe.parseProxyResponse=eZc});
export {yrs};
