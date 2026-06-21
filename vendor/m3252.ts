// @ts-nocheck
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {aT,durationUnitMillis} from "./m442.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Lk(e){return getSettingsForSource("policySettings")?.enabledPlugins?.[e]===!1}
function _W(){let e=getSettingsForSource("policySettings");if(!e?.strictKnownMarketplaces)return null;return e.strictKnownMarketplaces}
function Oot(){if(FIn()?.some((t)=>t.source==="skills-dir"))return!1;let e=_W();return e===null||e.some((t)=>t.source==="skills-dir")}
function BIn(e){return`Plugins from ${e}/ are blocked by your organization's managed settings (strictKnownMarketplaces or blockedMarketplaces). Ask your administrator to add {"source":"skills-dir"} to strictKnownMarketplaces, or remove it from blockedMarketplaces.`}
function FIn(){let e=getSettingsForSource("policySettings");if(!e?.blockedMarketplaces)return null;return e.blockedMarketplaces}
function wsa(){return getSettingsForSource("policySettings")?.pluginTrustMessage}
function UIn(){return getSettingsForSource("policySettings")?.pluginSuggestionMarketplaces??[]}
function $In(e,t){let n=getSettingsForSource("policySettings"),r=n?.extraKnownMarketplaces?.[e]?.source;if(r&&Rsa(t,r))return!0;return n?.strictKnownMarketplaces?.some((o)=>Dsa(t,o))??!1}
function Rsa(e,t){if(e.source!==t.source)return!1;switch(e.source){case"url":return e.url===t.url;case"github":return e.repo===t.repo&&(e.ref||void 0)===(t.ref||void 0)&&(e.path||void 0)===(t.path||void 0);case"git":return e.url===t.url&&(e.ref||void 0)===(t.ref||void 0)&&(e.path||void 0)===(t.path||void 0);case"npm":return e.package===t.package;case"file":return e.path===t.path;case"directory":return e.path===t.path;case"settings":return e.name===t.name&&aT(e.plugins,t.plugins);default:return!1}}
function xsa(e){let t=e.indexOf("://");if(t===-1)return!1;let n=e.slice(t+3),r=n.search(/[/?#]/);return(r===-1?n:n.slice(0,r)).includes("\\")}
function gYr(e){switch(e.source){case"github":return"github.com";case"git":{if(e.url.includes("://")){if(xsa(e.url))return null;try{return new URL(e.url).hostname||null}catch{return null}}return e.url.match(/^[^@]+@([^:]+):/)?.[1]??null}case"url":try{return new URL(e.url).hostname}catch{return null}default:return null}}
function ksa(e,t){let n=gYr(e);if(!n)return!1;try{return new RegExp(t.hostPattern).test(n)}catch{return logForDebugging(`Invalid hostPattern regex in policy settings: ${t.hostPattern}`,{level:"error"}),!1}}
function Hsa(e,t){if(e.source!=="file"&&e.source!=="directory")return!1;try{return new RegExp(t.pathPattern).test(e.path)}catch{return logForDebugging(`Invalid pathPattern regex in policy settings strictKnownMarketplaces: ${t.pathPattern}`,{level:"error"}),!1}}
function Isa(){let e=_W();if(!e)return[];return e.filter((t)=>t.source==="hostPattern").map((t)=>t.hostPattern)}
function vsa(e){let t=e.match(/^git@github\.com:([^/]+\/[^/]+?)(?:\.git)?$/);if(t&&t[1])return t[1];let n=e.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/);if(n&&n[1])return n[1];return null}
function fke(e,t){if(!e)return!0;return(e||void 0)===(t||void 0)}
function q6d(e,t){if(e.source===t.source)switch(e.source){case"github":{let n=t;if(e.repo!==n.repo)return!1;return fke(n.ref,e.ref)&&fke(n.path,e.path)}case"git":{let n=t;if(e.url!==n.url)return!1;return fke(n.ref,e.ref)&&fke(n.path,e.path)}case"url":return e.url===t.url;case"npm":return e.package===t.package;case"file":return e.path===t.path;case"directory":return e.path===t.path;case"settings":return e.name===t.name;default:return!1}if(e.source==="git"&&t.source==="github"){if(vsa(e.url)===t.repo)return fke(t.ref,e.ref)&&fke(t.path,e.path)}if(e.source==="github"&&t.source==="git"){if(vsa(t.url)===e.repo)return fke(t.ref,e.ref)&&fke(t.path,e.path)}return!1}
function S1t(e){let t=FIn();if(t===null)return!1;return t.some((n)=>{if(n.source==="hostPattern")return ksa(e,n);if(n.source==="pathPattern")return Hsa(e,n);return q6d(e,n)})}
function Uv(e){if(e.source==="git"&&xsa(e.url))return!1;if(S1t(e))return!1;let t=_W();if(t===null)return!0;return t.some((n)=>Dsa(e,n))}
function Dsa(e,t){if(t.source==="hostPattern")return ksa(e,t);if(t.source==="pathPattern")return Hsa(e,t);if(t.source==="skills-dir")return!1;return Rsa(e,t)}
var nI=b(()=>{durationUnitMillis();qe();yr()});
export {Lk,_W,Oot,BIn,FIn,wsa,UIn,$In,Rsa,xsa,gYr,ksa,Hsa,Isa,vsa,fke,q6d,S1t,Uv,Dsa,nI};
