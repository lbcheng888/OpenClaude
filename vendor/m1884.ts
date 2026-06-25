// @ts-nocheck
import {LR,$It} from "./m1789.ts";
import {Co,Sp} from "./m1722.ts";
import {NM} from "./m1742.ts";
import {k2,RA} from "./m1783.ts";
import {b,x} from "../runtime.ts";
import {iT} from "./m1780.ts";
class h1r{async listenForAuthCode(e,t){if(this.server)throw LR.createLoopbackServerAlreadyExistsError();return new Promise((n,r)=>{this.server=Ini.default.createServer((o,s)=>{let i=o.url;if(!i){s.end(t||"Error occurred loading redirectUrl"),r(LR.createUnableToLoadRedirectUrlError());return}else if(i===Co.FORWARD_SLASH){s.end(e||"Auth code was successfully acquired. You can close this window now.");return}let a=this.getRedirectUri(),l=new URL(i,a),c=NM.getDeserializedResponse(l.search)||{};if(c.code)s.writeHead(Sp.REDIRECT,{location:a}),s.end();if(c.error)s.end(t||`Error occurred: ${c.error}`);n(c)}),this.server.listen(0,"127.0.0.1")})}getRedirectUri(){if(!this.server||!this.server.listening)throw LR.createNoLoopbackServerExistsError();let e=this.server.address();if(!e||typeof e==="string"||!e.port)throw this.closeServer(),LR.createInvalidLoopbackAddressTypeError();let t=e&&e.port;return`${k2.HTTP_PROTOCOL}${k2.LOCALHOST}:${t}`}closeServer(){if(this.server){if(this.server.close(),typeof this.server.closeAllConnections==="function")this.server.closeAllConnections();this.server.unref(),this.server=void 0}}}
var Ini;
var xni=b(()=>{iT();$It();RA();Ini=x(require("http"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {h1r,Ini,xni};
