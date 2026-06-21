// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
function O7t(e){let t=!1,n,r={addDir:[],pluginDir:[],pluginDirNoMcp:[],settings:void 0,mcpConfig:[],strictMcpConfig:!1},o=[],s={"--cwd":(i)=>{n=i},"--settings":(i)=>{r.settings=i},"--add-dir":(i)=>r.addDir.push(i),"--plugin-dir":(i)=>r.pluginDir.push(i),"--plugin-dir-no-mcp":(i)=>r.pluginDirNoMcp.push(i),"--mcp-config":(i)=>r.mcpConfig.push(i)};for(let i=0;i<e.length;i++){let a=e[i];if(a==="agents"&&!t){t=!0;continue}if(a==="--strict-mcp-config"){r.strictMcpConfig=!0;continue}let l=a.indexOf("="),c=l===-1?a:a.slice(0,l),u=Object.hasOwn(s,c)?s[c]:void 0;if(u){if(l!==-1)u(a.slice(l+1));else if(i+1<e.length)u(e[++i]);else o.push(a);continue}o.push(a)}return{hasAgentsPositional:t,cwdFilter:n,config:r,rest:o}}
function uWe(e,t){let n=(r,o)=>r===""||o&&r.trimStart().startsWith("{")?r:t(r);return{settings:e.settings===void 0?void 0:n(e.settings,!0),pluginDir:e.pluginDir.map((r)=>n(r,!1)),pluginDirNoMcp:e.pluginDirNoMcp.map((r)=>n(r,!1)),addDir:e.addDir.map((r)=>n(r,!1)),mcpConfig:e.mcpConfig.map((r)=>n(r,!0)),strictMcpConfig:e.strictMcpConfig}}
function dWe(e){return[...e.settings?["--settings",e.settings]:[],...e.pluginDir.flatMap((t)=>["--plugin-dir",t]),...e.pluginDirNoMcp.flatMap((t)=>["--plugin-dir-no-mcp",t]),...e.addDir.flatMap((t)=>["--add-dir",t]),...e.mcpConfig.flatMap((t)=>["--mcp-config",t]),...e.strictMcpConfig?["--strict-mcp-config"]:[]]}
var TBo={};
isFullscreenWithTTY(TBo,{lit:()=>Qe,fromSanitizer_SANITIZER_OUTPUT_ONLY:()=>fromSanitizer_SANITIZER_OUTPUT_ONLY,fromNumber:()=>fromNumber,fromEnumOpt:()=>fromEnumOpt,fromEnum:()=>fromEnum});
function ogt(e){return e}
function Qe(e){return ogt(e)}
function fromEnum(e){return ogt(e)}
function fromEnumOpt(e){return e==null?void 0:ogt(e)}
function fromNumber(e){return ogt(String(e))}
function fromSanitizer_SANITIZER_OUTPUT_ONLY(e){return ogt(e)}
function L7t(e){let t=e.indexOf("--handle-uri");if(t===-1||!e[t+1])return null;if(e.length>t+2)return`claude: rejected deep-link invocation \u2014 unexpected arguments after the URI.
`+"The OS protocol handler passes exactly `--handle-uri <uri>`; extra arguments indicate argument injection via the URL. If invoking --handle-uri manually, place other flags before it.";return null}
function st(e){if(!e)return!1;if(typeof e==="boolean")return e;let t=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(t)}
function _l(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let t=String(e).toLowerCase().trim();return["0","false","no","off"].includes(t)}
function gre(e){if(!e||e.startsWith("-")||e.startsWith("/"))return!1;if(e.includes(".."))return!1;if(e.split("/").some((t)=>t==="."||t===""))return!1;return/^[a-zA-Z0-9/._+@-]+$/.test(e)}
function ca(){let e=new Set;return{subscribe(t){return e.add(t),()=>{e.delete(t)}},emit(...t){let n;for(let r of e)try{r(...t)}catch(o){(n??=[]).push(o)}if(n)throw n.length===1?n[0]:AggregateError(n,"Signal listener(s) threw")},clear(){e.clear()}}}
function pWe(e){if(!e)return{code:"en"};let t=e.toLowerCase().trim();if(!t)return{code:"en"};if(SBo.has(t))return{code:t};let n=kdc[t];if(n)return{code:n};let r=t.split("-")[0];if(r&&SBo.has(r))return{code:r};return{code:"en",fellBackFrom:e}}
var kdc,SBo;
var bBo=b(()=>{kdc={english:"en",spanish:"es",espa\u{f1}ol:"es",espanol:"es",french:"fr",fran\u{e7}ais:"fr",francais:"fr",japanese:"ja",\u{65e5}\u{672c}\u{8a9e}:"ja",german:"de",deutsch:"de",portuguese:"pt",portugu\u{ea}s:"pt",portugues:"pt",italian:"it",italiano:"it",korean:"ko",\u{d55c}\u{ad6d}\u{c5b4}:"ko",hindi:"hi",\u{939}\u{93f}\u{928}\u{94d}\u{926}\u{940}:"hi",\u{939}\u{93f}\u{902}\u{926}\u{940}:"hi",indonesian:"id","bahasa indonesia":"id",bahasa:"id",russian:"ru",\u{440}\u{443}\u{441}\u{441}\u{43a}\u{438}\u{439}:"ru",polish:"pl",polski:"pl",turkish:"tr",t\u{fc}rk\u{e7}e:"tr",turkce:"tr",dutch:"nl",nederlands:"nl",ukrainian:"uk",\u{443}\u{43a}\u{440}\u{430}\u{457}\u{43d}\u{441}\u{44c}\u{43a}\u{430}:"uk",greek:"el",\u{3b5}\u{3bb}\u{3bb}\u{3b7}\u{3bd}\u{3b9}\u{3ba}\u{3ac}:"el",czech:"cs",\u{10d}e\u{161}tina:"cs",cestina:"cs",danish:"da",dansk:"da",swedish:"sv",svenska:"sv",norwegian:"no",norsk:"no"},SBo=new Set(["en","es","fr","ja","de","pt","it","ko","hi","id","ru","pl","tr","nl","uk","el","cs","da","sv","no"])});
export {O7t,uWe,dWe,TBo,ogt,Qe,fromEnum,fromEnumOpt,fromNumber,fromSanitizer_SANITIZER_OUTPUT_ONLY,L7t,st,_l,gre,ca,pWe,kdc,SBo,bBo};
