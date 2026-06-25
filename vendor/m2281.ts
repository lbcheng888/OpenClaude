// @ts-nocheck
import {Nh,dO} from "./m2278.ts";
import {tS,hg} from "./m2280.ts";
import {b} from "../runtime.ts";
function LAi(e){return{request:Nh(`?${e}$p`),match:(t)=>t.type==="decrpm"&&t.mode===e}}
function MAi(){return{request:Nh("?6n"),match:(e)=>e.type==="cursorPosition"}}
function NAi(e){return{request:tS(e,"?"),match:(t)=>t.type==="osc"&&t.code===e}}
function FAi(){return{request:Nh(">0q"),match:(e)=>e.type==="xtversion"}}
class i3r{stdout;queue=[];constructor(e){this.stdout=e}send(e){return new Promise((t)=>{this.queue.push({kind:"query",match:e.match,resolve:(n)=>t(n)}),this.stdout.write(e.request)})}flush(){return new Promise((e)=>{this.queue.push({kind:"sentinel",resolve:e}),this.stdout.write(Yud)})}cancel(e){let t=this.queue.findIndex((r)=>r.kind==="query"&&r.match===e.match);if(t===-1)return;let[n]=this.queue.splice(t,1);if(n?.kind==="query")n.resolve(void 0)}onResponse(e){let t=this.queue.findIndex((n)=>n.kind==="query"&&n.match(e));if(t!==-1){let[n]=this.queue.splice(t,1);if(n?.kind==="query")n.resolve(e);return}if(e.type==="da1"){let n=this.queue.findIndex((r)=>r.kind==="sentinel");if(n===-1)return;for(let r of this.queue.splice(0,n+1))if(r.kind==="query")r.resolve(void 0);else r.resolve()}}}
var Yud;
var VEn=b(()=>{dO();hg();Yud=Nh("c")});
export {LAi,MAi,NAi,FAi,i3r,Yud,VEn};
