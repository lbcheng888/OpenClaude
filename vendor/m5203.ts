// @ts-nocheck
import {Uh,VIe,fy} from "../src/agent/4162_state.ts";
import {Kc,tv} from "./m232.ts";
import {ma,Lp,mg} from "../src/agent/2580_level.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {Ec} from "./m2449.ts";
import {b} from "../runtime.ts";
function P0o(e){let t="",n="",r=!0,o=0,s="",i=!1;function a(c,u){let d=Uh(Kc(n),Xzn),p=`${c}|${u}|${d}`;if(p===s)return;s=p,ma(e).then((m)=>m&&!i?Lp(e,{...m,state:c,tempo:u,detail:d,updatedAt:new Date().toISOString()}):void 0).catch(De)}let l=setInterval(()=>{if(o>0&&Date.now()-o<cUl)a("working","active");else if(!r&&n)a("blocked","blocked");else a("working","idle")},cUl);return l.unref(),{feed(c){let u=Ec(c.replace(sCm,"\x00")).replace(/\r\n?/g,`
`).replace(/\0+$/,"").replace(/\0/g,`
`);if(!u)return;o=Date.now(),t+=u;let d=t.split(`
`);if(t=d.pop()??"",r=t==="",n=t.trim()||d.findLast((m)=>m.trim())?.trim()||n,t.length>Xzn*2)t=t.slice(-Xzn);if(s.startsWith("blocked|"))a("working","active")},dispose(){i=!0,clearInterval(l)},get lastLine(){return Uh(Kc(n),Xzn)}}}
var cUl=2000,Xzn,sCm;
var uUl=b(()=>{VIe();mg();Rn();tv();Xzn=fy,sCm=/\x1b\[\d*D/g});
export {P0o,cUl,Xzn,sCm,uUl};
