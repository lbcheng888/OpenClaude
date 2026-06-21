// @ts-nocheck
import {b} from "../runtime.ts";
function mhn(e,t=process.argv){let n;for(let r=0;r<t.length;r++){let o=t[r];if(o==="--")break;if(o?.startsWith(`${e}=`)){n=o.slice(e.length+1);continue}if(o===e&&r+1<t.length){n=t[++r];continue}if(o!==void 0&&dni.has(o))r++}return n}
function pni(e,t=process.argv){for(let n=0;n<t.length;n++){let r=t[n];if(r==="--")break;if(r===e)return!0;if(r!==void 0&&dni.has(r))n++}return!1}
var dni;
var iMr=b(()=>{dni=new Set(["--prefill","--prefill-b64","--deep-link-repo","--deep-link-last-fetch","--deep-link-cwd-b64","--handle-uri","--settings","--managed-settings","--setting-sources","--team-name","--agent-id","--agent-name","--agent-color","--parent-session-id","--agent-type","--model","--agent","--routine","--effort","--permission-mode","--session-id"])});
export {mhn,pni,dni,iMr};
