// @ts-nocheck
import {Qoo,sce} from "../src/permissions/3874_permissionMode.ts";
import {z7e,mf} from "./m702.ts";
import {b} from "../runtime.ts";
function bwl(e,t){let n=new Map;for(let s of t)n.set(s.agentType,s);let r=new Set,o=[];for(let s of e){let i=`${s.agentType}:${s.source}`;if(r.has(i))continue;r.add(i);let a=n.get(s.agentType),l=a&&a.source!==s.source?a.source:void 0;o.push({...s,overriddenBy:l})}return o}
function Ewl(e){let t=e.model||Qoo();if(!t)return;return t==="inherit"?"inherit":t}
function Cwl(e){return z7e(e).toLowerCase()}
function vwl(e,t){return e.agentType.localeCompare(t.agentType,void 0,{sensitivity:"base"})}
var nwo;
var rwo=b(()=>{sce();mf();nwo=[{label:"User agents",source:"userSettings"},{label:"Project agents",source:"projectSettings"},{label:"Local agents",source:"localSettings"},{label:"Managed agents",source:"policySettings"},{label:"Plugin agents",source:"plugin"},{label:"CLI arg agents",source:"flagSettings"},{label:"Built-in agents",source:"built-in"}]});
export {bwl,Ewl,Cwl,vwl,nwo,rwo};
