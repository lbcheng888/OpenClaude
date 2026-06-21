// @ts-nocheck
import {Oh,zO} from "./m2268.ts";
import {aS,lg} from "./m2269.ts";
import {b} from "../runtime.ts";
function R_i(e){return{request:Oh(`?${e}$p`),match:(t)=>t.type==="decrpm"&&t.mode===e}}
function x_i(){return{request:Oh("?6n"),match:(e)=>e.type==="cursorPosition"}}
function k_i(e){return{request:aS(e,"?"),match:(t)=>t.type==="osc"&&t.code===e}}
function H_i(){return{request:Oh(">0q"),match:(e)=>e.type==="xtversion"}}
class kFr{stdout;queue=[];constructor(e){this.stdout=e}send(e){return new Promise((t)=>{this.queue.push({kind:"query",match:e.match,resolve:(n)=>t(n)}),this.stdout.write(e.request)})}flush(){return new Promise((e)=>{this.queue.push({kind:"sentinel",resolve:e}),this.stdout.write(bed)})}cancel(e){let t=this.queue.findIndex((r)=>r.kind==="query"&&r.match===e.match);if(t===-1)return;let[n]=this.queue.splice(t,1);if(n?.kind==="query")n.resolve(void 0)}onResponse(e){let t=this.queue.findIndex((n)=>n.kind==="query"&&n.match(e));if(t!==-1){let[n]=this.queue.splice(t,1);if(n?.kind==="query")n.resolve(e);return}if(e.type==="da1"){let n=this.queue.findIndex((r)=>r.kind==="sentinel");if(n===-1)return;for(let r of this.queue.splice(0,n+1))if(r.kind==="query")r.resolve(void 0);else r.resolve()}}}
var bed;
var sTn=b(()=>{zO();lg();bed=Oh("c")});
export {R_i,x_i,k_i,H_i,kFr,bed,sTn};
