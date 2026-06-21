// @ts-nocheck
import {X} from "../runtime.ts";
var cQo=X((kyf,lQo)=>{lQo.exports=aQo;aQo.sync=Uzc;var sQo=require("fs");function Fzc(e,t){var n=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!n)return!0;if(n=n.split(";"),n.indexOf("")!==-1)return!0;for(var r=0;r<n.length;r++){var o=n[r].toLowerCase();if(o&&e.substr(-o.length).toLowerCase()===o)return!0}return!1}function iQo(e,t,n){if(!e.isSymbolicLink()&&!e.isFile())return!1;return Fzc(t,n)}function aQo(e,t,n){sQo.stat(e,function(r,o){n(r,r?!1:iQo(o,e,t))})}function Uzc(e,t){return iQo(sQo.statSync(e),e,t)}});
export {cQo};
