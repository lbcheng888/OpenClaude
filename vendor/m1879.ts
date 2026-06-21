// @ts-nocheck
import {Iw,fxt} from "./m1784.ts";
import {Ho,em} from "./m1717.ts";
import {E1} from "./m1737.ts";
import {s$,_v} from "./m1778.ts";
import {b,M} from "../runtime.ts";
import {AT} from "./m1775.ts";
class FDr{async listenForAuthCode(e,t){if(this.server)throw Iw.createLoopbackServerAlreadyExistsError();return new Promise((n,r)=>{this.server=LJs.default.createServer((o,s)=>{let i=o.url;if(!i){s.end(t||"Error occurred loading redirectUrl"),r(Iw.createUnableToLoadRedirectUrlError());return}else if(i===Ho.FORWARD_SLASH){s.end(e||"Auth code was successfully acquired. You can close this window now.");return}let a=this.getRedirectUri(),l=new URL(i,a),c=E1.getDeserializedResponse(l.search)||{};if(c.code)s.writeHead(em.REDIRECT,{location:a}),s.end();if(c.error)s.end(t||`Error occurred: ${c.error}`);n(c)}),this.server.listen(0,"127.0.0.1")})}getRedirectUri(){if(!this.server||!this.server.listening)throw Iw.createNoLoopbackServerExistsError();let e=this.server.address();if(!e||typeof e==="string"||!e.port)throw this.closeServer(),Iw.createInvalidLoopbackAddressTypeError();let t=e&&e.port;return`${s$.HTTP_PROTOCOL}${s$.LOCALHOST}:${t}`}closeServer(){if(this.server){if(this.server.close(),typeof this.server.closeAllConnections==="function")this.server.closeAllConnections();this.server.unref(),this.server=void 0}}}
var LJs;
var MJs=b(()=>{AT();fxt();_v();LJs=M(require("http"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {FDr,LJs,MJs};
