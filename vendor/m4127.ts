// @ts-nocheck
import {X} from "../runtime.ts";
var ruo=X((Jd_,c3a)=>{var pendingInteractionFlush=c3a.exports={nextSkippingChildren:rkp,nextAncestorSibling:nuo,next:okp,previous:skp,deepLastChild:l3a};function rkp(e,t){if(e===t)return null;if(e.nextSibling!==null)return e.nextSibling;return nuo(e,t)}function nuo(e,t){for(e=e.parentNode;e!==null;e=e.parentNode){if(e===t)return null;if(e.nextSibling!==null)return e.nextSibling}return null}function okp(e,t){var n=e.firstChild;if(n!==null)return n;if(e===t)return null;if(n=e.nextSibling,n!==null)return n;return nuo(e,t)}function l3a(e){while(e.lastChild)e=e.lastChild;return e}function skp(e,t){var n=e.previousSibling;if(n!==null)return l3a(n);if(n=e.parentNode,n===t)return null;return n}});
export {ruo};
