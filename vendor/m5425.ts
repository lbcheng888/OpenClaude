// @ts-nocheck
import {yXr,W9e} from "./m3167.ts";
import {b} from "../runtime.ts";
function zJl(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
function lBo(e){if(/^[/\\]{2}/.test(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(zJl(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>KJl)throw Error(`Deep link cwd exceeds ${KJl} characters (got ${e.length})`)}
function cBo(e){let t=yXr(e).replace(/\r\n?/g,`
`);if(zJl(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>VJl)throw Error(`Deep link query exceeds ${VJl} characters (got ${t.length})`);return t}
function jJl(e){let t=e.startsWith(`${V6}://`)?e:e.startsWith(`${V6}:`)?e.replace(`${V6}:`,`${V6}://`):null;if(!t)throw Error(`Invalid deep link: expected ${V6}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,o=n.searchParams.get("repo")??void 0,s=n.searchParams.get("q");if(r)lBo(r);if(o&&!ZUm.test(o))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${o}"`);let i;if(s&&s.trim().length>0)i=cBo(s.trim());return{query:i,cwd:r,repo:o}}
var V6="claude-cli",ZUm,VJl=5000,KJl=4096;
var str=b(()=>{W9e();ZUm=/^[\w.-]+\/[\w.-]+$/});
export {zJl,lBo,cBo,jJl,V6,ZUm,VJl,KJl,str};
