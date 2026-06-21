// @ts-nocheck
import {evn,p2e} from "../src/config/2658_recursive.ts";
import {b} from "../runtime.ts";
class SandboxViolationStore{constructor(){this.violations=[],this.totalCount=0,this.maxSize=100,this.listeners=new Set}addViolation(e){if(this.violations.push(e),this.totalCount++,this.violations.length>this.maxSize)this.violations=this.violations.slice(-this.maxSize);this.notifyListeners()}getViolations(e){if(e===void 0)return[...this.violations];return this.violations.slice(-e)}getCount(){return this.violations.length}getTotalCount(){return this.totalCount}getViolationsForCommand(e){let t=evn(e);return this.violations.filter((n)=>n.encodedCommand===t)}clear(){this.violations=[],this.notifyListeners()}subscribe(e){return this.listeners.add(e),e(this.getViolations()),()=>{this.listeners.delete(e)}}notifyListeners(){let e=this.getViolations();this.listeners.forEach((t)=>t(e))}}
var Mqr=b(()=>{p2e()});
export {SandboxViolationStore,Mqr};
