// @ts-nocheck
import {$7r,F$e} from "./m3158.ts";
import {b} from "../runtime.ts";
function c5l(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
function jOo(e){if(/^[/\\]{2}/.test(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(c5l(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>l5l)throw Error(`Deep link cwd exceeds ${l5l} characters (got ${e.length})`)}
function WOo(e){let t=$7r(e).replace(/\r\n?/g,`
`);if(c5l(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>a5l)throw Error(`Deep link query exceeds ${a5l} characters (got ${t.length})`);return t}
function u5l(e){let t=e.startsWith(`${hj}://`)?e:e.startsWith(`${hj}:`)?e.replace(`${hj}:`,`${hj}://`):null;if(!t)throw Error(`Invalid deep link: expected ${hj}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,o=n.searchParams.get("repo")??void 0,s=n.searchParams.get("q");if(r)jOo(r);if(o&&!WDm.test(o))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${o}"`);let i;if(s&&s.trim().length>0)i=WOo(s.trim());return{query:i,cwd:r,repo:o}}
var hj="claude-cli",WDm,a5l=5000,l5l=4096;
var oXn=b(()=>{F$e();WDm=/^[\w.-]+\/[\w.-]+$/});
export {c5l,jOo,WOo,u5l,hj,WDm,a5l,l5l,oXn};
