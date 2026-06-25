// @ts-nocheck
import {Q} from "../runtime.ts";
var Vfo=Q((vAy,yWa)=>{var RAy=yWa.exports={nextSkippingChildren:SMp,nextAncestorSibling:Gfo,next:bMp,previous:EMp,deepLastChild:_Wa};function SMp(e,t){if(e===t)return null;if(e.nextSibling!==null)return e.nextSibling;return Gfo(e,t)}function Gfo(e,t){for(e=e.parentNode;e!==null;e=e.parentNode){if(e===t)return null;if(e.nextSibling!==null)return e.nextSibling}return null}function bMp(e,t){var n=e.firstChild;if(n!==null)return n;if(e===t)return null;if(n=e.nextSibling,n!==null)return n;return Gfo(e,t)}function _Wa(e){while(e.lastChild)e=e.lastChild;return e}function EMp(e,t){var n=e.previousSibling;if(n!==null)return _Wa(n);if(n=e.parentNode,n===t)return null;return n}});
export {Vfo};
