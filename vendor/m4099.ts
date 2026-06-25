// @ts-nocheck
import {os} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {v6e,Sye} from "./m3990.ts";
function t4n(e,t,n="replace"){e((r)=>{let o=r.alwaysDenyRules.command,s=n==="union"?os([...o??[],...t]):[...t];if((o?.length??0)===s.length&&(o??[]).every((a,l)=>a===s[l]))return r;return{...r,alwaysDenyRules:{...r.alwaysDenyRules,command:s.length>0?s:void 0}}})}
var Umo=()=>{};
function Jdt(e){let t=e.startsWith("/")?e.slice(1):e,n=t.search(/\s/);if(n===-1)return{name:t,args:""};return{name:t.slice(0,n),args:t.slice(n+1).trim()}}
function wxe(e){let t=e.trim();if(!t.startsWith("/"))return null;let{name:n,args:r}=Jdt(t);if(!n)return null;let o="(MCP)";if(r===o)return{commandName:`${n} ${o}`,args:"",isMcp:!0};if(r.startsWith(o)&&/\s/.test(r.charAt(o.length)))return{commandName:`${n} ${o}`,args:r.slice(o.length).trimStart(),isMcp:!0};return{commandName:n,args:r,isMcp:!1}}
var c4t=()=>{};
function n4n(e,t){if(!e.subcommands)return;let n=t.trimStart(),r=n.search(/\s/),o=r===-1?n:n.slice(0,r),s=o?e.subcommands[o.toLowerCase()]:void 0;if(s===void 0)return;let i=r===-1?"":n.slice(r+1).trimStart();return{targetName:s,consumedToken:o,remainingArgs:i.replace(/(?:^|\s)--comment(?=\s|$)/g,"").trim()}}
function s5a(e){return cOp.has(e)?`/${e}`:null}
var cOp,o5a="(?:\\./)?(?:(?:npx|bunx|uvx|uv\\s+run)\\s+)?",bSy,ESy;
var r4n=b(()=>{cOp=new Set([v6e,Sye]),bSy=[/^(?:bun|npm|yarn|pnpm|deno)\s+(?:run\s+)?test\b/,/^(?:\.\/)?(?:go|cargo|make|mvn|gradle|gradlew|dotnet|swift|mix|sbt|lein|rake|zig|bazel|nx|turbo)\s+test\b/,new RegExp(`^${o5a}(?:pytest|jest|vitest|rspec|phpunit|ctest)\\b`),/^(?:bun|npm|yarn|pnpm)\s+run\s+test:\S/],ESy=[/^(?:bun|npm|yarn|pnpm)\s+run\s+typecheck\b/,new RegExp(`^${o5a}(?:tsc|mypy)\\b`)]});
export {t4n,Umo,Jdt,wxe,c4t,n4n,s5a,cOp,o5a,bSy,ESy,r4n};
