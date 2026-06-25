// @ts-nocheck
import {yh,Nxe,hy} from "../src/agent/4175_state.ts";
import {kc,aA} from "./m234.ts";
import {Oi,Id,Pf} from "../src/agent/2591_level.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {cc} from "./m2459.ts";
import {b} from "../runtime.ts";
function QMo(e){let t="",n="",r=!0,o=0,s="",i=!1;function a(c,u){let d=yh(kc(n),jQn),p=`${c}|${u}|${d}`;if(p===s)return;s=p,Oi(e).then((m)=>m&&!i?Id(e,{...m,state:c,tempo:u,detail:d,updatedAt:new Date().toISOString()}):void 0).catch(Ie)}let l=setInterval(()=>{if(o>0&&Date.now()-o<Q5l)a("working","active");else if(!r&&n)a("blocked","blocked");else a("working","idle")},Q5l);return l.unref(),{feed(c){let u=cc(c.replace(yDm,"\x00")).replace(/\r\n?/g,`
`).replace(/\0+$/,"").replace(/\0/g,`
`);if(!u)return;o=Date.now(),t+=u;let d=t.split(`
`);if(t=d.pop()??"",r=t==="",n=t.trim()||d.findLast((m)=>m.trim())?.trim()||n,t.length>jQn*2)t=t.slice(-jQn);if(s.startsWith("blocked|"))a("working","active")},dispose(){i=!0,clearInterval(l)},get lastLine(){return yh(kc(n),jQn)}}}
var Q5l=2000,jQn,yDm;
var Z5l=b(()=>{Nxe();Pf();vn();aA();jQn=hy,yDm=/\x1b\[\d*D/g});
export {QMo,Q5l,jQn,yDm,Z5l};
