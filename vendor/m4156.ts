// @ts-nocheck
import {Q} from "../runtime.ts";
import {q4n} from "./m4153.ts";
import {G4n} from "./m4154.ts";
import {X4n} from "./m4155.ts";
import {agentMcpClients} from "./m4115.ts";
import {R4n} from "./m4124.ts";
var M4t=Q((qAy,FGa)=>{FGa.exports=NGa;var LGa=q4n(),MGa=G4n(),E1p=X4n(),Q4n=agentMcpClients(),C1p=R4n();function NGa(e){this.contextObject=e}var A1p={xml:{"":!0,"1.0":!0,"2.0":!0},core:{"":!0,"2.0":!0},html:{"":!0,"1.0":!0,"2.0":!0},xhtml:{"":!0,"1.0":!0,"2.0":!0}};NGa.prototype={hasFeature:function(t,n){var r=A1p[(t||"").toLowerCase()];return r&&r[n||""]||!1},createDocumentType:function(t,n,r){if(!C1p.isValidQName(t))Q4n.InvalidCharacterError();return new MGa(this.contextObject,t,n,r)},createDocument:function(t,n,r){var o=new LGa(!1,null),s;if(n)s=o.createElementNS(t,n);else s=null;if(r)o.appendChild(r);if(s)o.appendChild(s);if(t===Q4n.NAMESPACE.HTML)o._contentType="application/xhtml+xml";else if(t===Q4n.NAMESPACE.SVG)o._contentType="image/svg+xml";else o._contentType="application/xml";return o},createHTMLDocument:function(t){var n=new LGa(!0,null);n.appendChild(new MGa(n,"html"));var r=n.createElement("html");n.appendChild(r);var o=n.createElement("head");if(r.appendChild(o),t!==void 0){var s=n.createElement("title");o.appendChild(s),s.appendChild(n.createTextNode(t))}return r.appendChild(n.createElement("body")),n.modclock=1,n},mozSetOutputMutationHandler:function(e,t){e.mutationHandler=t},mozGetInputMutationHandler:function(e){Q4n.nyi()},mozHTMLParser:E1p}});
export {M4t};
