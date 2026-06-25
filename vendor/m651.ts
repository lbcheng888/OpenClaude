// @ts-nocheck
import {Q} from "../runtime.ts";
var ios=Q((J0f,sos)=>{sos.exports=oos;oos.sync=rsu;var nos=require("fs");function nsu(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n)return!0;if(n=n.split(";"),n.indexOf("")!==-1)return!0;for(var r=0;r<n.length;r++){var o=n[r].toLowerCase();if(o&&e.substr(-o.length).toLowerCase()===o)return!0}return!1}function ros(e,t,n){if(!e.isSymbolicLink()&&!e.isFile())return!1;return nsu(t,n)}function oos(e,t,n){nos.stat(e,function(r,o){n(r,r?!1:ros(o,e,t))})}function rsu(e,t){return ros(nos.statSync(e),e,t)}});
export {ios};
