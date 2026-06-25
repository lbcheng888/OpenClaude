// @ts-nocheck
import {Ni} from "./m127.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
class mno{queue=[];waiters=[];changed=Ni();_revision=0;get length(){return this.queue.length}get revision(){return this._revision}send(e){this._revision++;let t=this.waiters.findIndex((n)=>n.fn(e));if(t!==-1){let n=this.waiters.splice(t,1)[0];if(n){n.resolve(e),this.notify();return}}this.queue.push(e),this.notify()}poll(e=()=>!0){let t=this.queue.findIndex(e);if(t===-1)return;return this.queue.splice(t,1)[0]}receive(e=()=>!0){let t=this.queue.findIndex(e);if(t!==-1){let n=this.queue.splice(t,1)[0];if(n)return this.notify(),Promise.resolve(n)}return new Promise((n)=>{this.waiters.push({fn:e,resolve:n})})}subscribe=this.changed.subscribe;notify(){this.changed.emit()}}
var E_a=b(()=>{ig()});
export {mno,E_a};
