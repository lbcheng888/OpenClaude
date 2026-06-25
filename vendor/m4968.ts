// @ts-nocheck
import {Gco,tce} from "../src/permissions/3892_permissionMode.ts";
import {Kje,wm} from "./m707.ts";
import {b} from "../runtime.ts";
function NPl(e,t){let n=new Map;for(let s of t)n.set(s.agentType,s);let r=new Set,o=[];for(let s of e){let i=`${s.agentType}:${s.source}`;if(r.has(i))continue;r.add(i);let a=n.get(s.agentType),l=a&&a.source!==s.source?a.source:void 0;o.push({...s,overriddenBy:l})}return o}
function FPl(e){let t=e.model||Gco();if(!t)return;return t==="inherit"?"inherit":t}
function BPl(e){return Kje(e).toLowerCase()}
function UPl(e,t){return e.agentType.localeCompare(t.agentType,void 0,{sensitivity:"base"})}
var _0o;
var y0o=b(()=>{tce();wm();_0o=[{label:"User agents",source:"userSettings"},{label:"Project agents",source:"projectSettings"},{label:"Local agents",source:"localSettings"},{label:"Managed agents",source:"policySettings"},{label:"Plugin agents",source:"plugin"},{label:"CLI arg agents",source:"flagSettings"},{label:"Built-in agents",source:"built-in"}]});
export {NPl,FPl,BPl,UPl,_0o,y0o};
