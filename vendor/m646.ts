// @ts-nocheck
import {X} from "../runtime.ts";
var fQo=X((Hyf,mQo)=>{mQo.exports=dQo;dQo.sync=$zc;var uQo=require("fs");function dQo(e,t,n){uQo.stat(e,function(r,o){n(r,r?!1:pQo(o,t))})}function $zc(e,t){return pQo(uQo.statSync(e),t)}function pQo(e,t){return e.isFile()&&qzc(e,t)}function qzc(e,t){var{mode:n,uid:r,gid:o}=e,s=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),i=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),l=parseInt("010",8),c=parseInt("001",8),u=a|l,d=n&c||n&l&&o===i||n&a&&r===s||n&u&&s===0;return d}});
export {fQo};
