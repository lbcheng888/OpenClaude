// @ts-nocheck
import {b} from "../runtime.ts";
import {d5s,u5s} from "./m1626.ts";
function eHr(e){m5s=e,Qkr=[],Zkr=[];let t=/\*/g,n=e.split(",").map((r)=>r.trim().replace(t,".*?"));for(let r of n)if(r.startsWith("-"))Zkr.push(new RegExp(`^${r.substr(1)}$`));else Qkr.push(new RegExp(`^${r}$`));for(let r of hpn)r.enabled=tHr(r.namespace)}
function tHr(e){if(e.endsWith("*"))return!0;for(let t of Zkr)if(t.test(e))return!1;for(let t of Qkr)if(t.test(e))return!0;return!1}
function l1u(){let e=m5s||"";return eHr(""),e}
function A5s(e){let t=Object.assign(n,{enabled:tHr(e),destroy:c1u,log:f5s.log,namespace:e,extend:u1u});function n(...r){if(!t.enabled)return;if(r.length>0)r[0]=`${e} ${r[0]}`;t.log(...r)}return hpn.push(t),t}
function c1u(){let e=hpn.indexOf(this);if(e>=0)return hpn.splice(e,1),!0;return!1}
function u1u(e){let t=A5s(`${this.namespace}:${e}`);return t.log=this.log,t}
var p5s,m5s,Qkr,Zkr,hpn,f5s,XYe;
var h5s=b(()=>{d5s();p5s=typeof process<"u"&&process.env&&process.env.DEBUG||void 0,Qkr=[],Zkr=[],hpn=[];if(p5s)eHr(p5s);f5s=Object.assign((e)=>A5s(e),{enable:eHr,enabled:tHr,disable:l1u,log:u5s});XYe=f5s});
export {eHr,tHr,l1u,A5s,c1u,u1u,p5s,m5s,Qkr,Zkr,hpn,f5s,XYe,h5s};
