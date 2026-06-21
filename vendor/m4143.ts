// @ts-nocheck
import {X} from "../runtime.ts";
import {W$n} from "./m4140.ts";
import {V$n} from "./m4141.ts";
import {Z$n} from "./m4142.ts";
import {Xk} from "./m4102.ts";
import {R$n} from "./m4111.ts";
var T9t=X((pp_,k4a)=>{k4a.exports=x4a;var w4a=W$n(),R4a=V$n(),sHp=Z$n(),e9n=Xk(),iHp=R$n();function x4a(e){this.contextObject=e}var aHp={xml:{"":!0,"1.0":!0,"2.0":!0},core:{"":!0,"2.0":!0},html:{"":!0,"1.0":!0,"2.0":!0},xhtml:{"":!0,"1.0":!0,"2.0":!0}};x4a.prototype={hasFeature:function(t,n){var r=aHp[(t||"").toLowerCase()];return r&&r[n||""]||!1},createDocumentType:function(t,n,r){if(!iHp.isValidQName(t))e9n.InvalidCharacterError();return new R4a(this.contextObject,t,n,r)},createDocument:function(t,n,r){var o=new w4a(!1,null),s;if(n)s=o.createElementNS(t,n);else s=null;if(r)o.appendChild(r);if(s)o.appendChild(s);if(t===e9n.NAMESPACE.HTML)o._contentType="application/xhtml+xml";else if(t===e9n.NAMESPACE.SVG)o._contentType="image/svg+xml";else o._contentType="application/xml";return o},createHTMLDocument:function(t){var n=new w4a(!0,null);n.appendChild(new R4a(n,"html"));var r=n.createElement("html");n.appendChild(r);var o=n.createElement("head");if(r.appendChild(o),t!==void 0){var s=n.createElement("title");o.appendChild(s),s.appendChild(n.createTextNode(t))}return r.appendChild(n.createElement("body")),n.modclock=1,n},mozSetOutputMutationHandler:function(e,t){e.mutationHandler=t},mozGetInputMutationHandler:function(e){e9n.nyi()},mozHTMLParser:sHp}});
export {T9t};
