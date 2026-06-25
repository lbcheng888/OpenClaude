// @ts-nocheck
import {b} from "../runtime.ts";
function n3e(e,t){let n=e?.mcpInfo?.serverName,r=n!==void 0?t.mcpPermissionModeOverrides?.[n]:void 0,o=t.mode==="bypassPermissions"||t.mode==="auto"||t.mode==="plan"&&t.isBypassPermissionsModeAvailable===!0;if(r!==void 0&&o)return r;if(o&&n!==void 0&&mzd.has(n)&&t.chromeClassifierFloorEnabled===!0)return t.canAutoClassifierRun===!0?"auto":"default";return t.mode}
function Mla(e){if(e===null)return{ok:!0,override:void 0};if(e==="default"||e==="auto")return{ok:!0,override:e};return{ok:!1,rejected:e}}
var mzd;
var IDn=b(()=>{mzd=new Set(["claude-in-chrome","Claude in Chrome"])});
export {n3e,Mla,mzd,IDn};
