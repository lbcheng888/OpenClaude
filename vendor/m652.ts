// @ts-nocheck
import {Q} from "../runtime.ts";
var dos=Q((X0f,uos)=>{uos.exports=los;los.sync=osu;var aos=require("fs");function los(e,t,n){aos.stat(e,function(r,o){n(r,r?!1:cos(o,t))})}function osu(e,t){return cos(aos.statSync(e),t)}function cos(e,t){return e.isFile()&&ssu(e,t)}function ssu(e,t){var{mode:n,uid:r,gid:o}=e,s=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),i=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),l=parseInt("010",8),c=parseInt("001",8),u=a|l,d=n&c||n&l&&o===i||n&a&&r===s||n&u&&s===0;return d}});
export {dos};
