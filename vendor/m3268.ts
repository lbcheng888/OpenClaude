// @ts-nocheck
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {J_,$X} from "./m446.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function nH(e){return getSettingsForSource("policySettings")?.enabledPlugins?.[e]===!1}
function OW(){let e=getSettingsForSource("policySettings");if(!e?.strictKnownMarketplaces)return null;return e.strictKnownMarketplaces}
function Oit(){if(HPn()?.some((t)=>t.source==="skills-dir"))return!1;let e=OW();return e===null||e.some((t)=>t.source==="skills-dir")}
function kPn(e){return`Plugins from ${e}/ are blocked by your organization's managed settings (strictKnownMarketplaces or blockedMarketplaces). Ask your administrator to add {"source":"skills-dir"} to strictKnownMarketplaces, or remove it from blockedMarketplaces.`}
function HPn(){let e=getSettingsForSource("policySettings");if(!e?.blockedMarketplaces)return null;return e.blockedMarketplaces}
function Dpa(){return getSettingsForSource("policySettings")?.pluginTrustMessage}
function IPn(){return getSettingsForSource("policySettings")?.pluginSuggestionMarketplaces??[]}
function xPn(e,t){let n=getSettingsForSource("policySettings"),r=n?.extraKnownMarketplaces?.[e]?.source;if(r&&Ppa(t,r))return!0;return n?.strictKnownMarketplaces?.some((o)=>Fpa(t,o))??!1}
function Ppa(e,t){if(e.source!==t.source)return!1;switch(e.source){case"url":return e.url===t.url;case"github":return e.repo===t.repo&&(e.ref||void 0)===(t.ref||void 0)&&(e.path||void 0)===(t.path||void 0);case"git":return e.url===t.url&&(e.ref||void 0)===(t.ref||void 0)&&(e.path||void 0)===(t.path||void 0);case"npm":return e.package===t.package;case"file":return e.path===t.path;case"directory":return e.path===t.path;case"settings":return e.name===t.name&&J_(e.plugins,t.plugins);default:return!1}}
function Opa(e){let t=e.indexOf("://");if(t===-1)return!1;let n=e.slice(t+3),r=n.search(/[/?#]/);return(r===-1?n:n.slice(0,r)).includes("\\")}
function eeo(e){switch(e.source){case"github":return"github.com";case"git":{if(e.url.includes("://")){if(Opa(e.url))return null;try{return new URL(e.url).hostname||null}catch{return null}}return e.url.match(/^[^@]+@([^:]+):/)?.[1]??null}case"url":try{return new URL(e.url).hostname}catch{return null}default:return null}}
function Lpa(e,t){let n=eeo(e);if(!n)return!1;try{return new RegExp(t.hostPattern).test(n)}catch{return logForDebugging(`Invalid hostPattern regex in policy settings: ${t.hostPattern}`,{level:"error"}),!1}}
function Mpa(e,t){if(e.source!=="file"&&e.source!=="directory")return!1;try{return new RegExp(t.pathPattern).test(e.path)}catch{return logForDebugging(`Invalid pathPattern regex in policy settings strictKnownMarketplaces: ${t.pathPattern}`,{level:"error"}),!1}}
function Npa(){let e=OW();if(!e)return[];return e.filter((t)=>t.source==="hostPattern").map((t)=>t.hostPattern)}
function xpa(e){let t=e.match(/^git@github\.com:([^/]+\/[^/]+?)(?:\.git)?$/);if(t&&t[1])return t[1];let n=e.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/);if(n&&n[1])return n[1];return null}
function nIe(e,t){if(!e)return!0;return(e||void 0)===(t||void 0)}
function HJd(e,t){if(e.source===t.source)switch(e.source){case"github":{let n=t;if(e.repo!==n.repo)return!1;return nIe(n.ref,e.ref)&&nIe(n.path,e.path)}case"git":{let n=t;if(e.url!==n.url)return!1;return nIe(n.ref,e.ref)&&nIe(n.path,e.path)}case"url":return e.url===t.url;case"npm":return e.package===t.package;case"file":return e.path===t.path;case"directory":return e.path===t.path;case"settings":return e.name===t.name;default:return!1}if(e.source==="git"&&t.source==="github"){if(xpa(e.url)===t.repo)return nIe(t.ref,e.ref)&&nIe(t.path,e.path)}if(e.source==="github"&&t.source==="git"){if(xpa(t.url)===e.repo)return nIe(t.ref,e.ref)&&nIe(t.path,e.path)}return!1}
function QFt(e){let t=HPn();if(t===null)return!1;return t.some((n)=>{if(n.source==="hostPattern")return Lpa(e,n);if(n.source==="pathPattern")return Mpa(e,n);return HJd(e,n)})}
function jA(e){if(e.source==="git"&&Opa(e.url))return!1;if(QFt(e))return!1;let t=OW();if(t===null)return!0;return t.some((n)=>Fpa(e,n))}
function Fpa(e,t){if(t.source==="hostPattern")return Lpa(e,t);if(t.source==="pathPattern")return Mpa(e,t);if(t.source==="skills-dir")return!1;return Ppa(e,t)}
var II=b(()=>{$X();qe();br()});
export {nH,OW,Oit,kPn,HPn,Dpa,IPn,xPn,Ppa,Opa,eeo,Lpa,Mpa,Npa,xpa,nIe,HJd,QFt,jA,Fpa,II};
