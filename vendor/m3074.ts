// @ts-nocheck
import {Q} from "../runtime.ts";
var AC=Q((rJr)=>{rJr.fromCallback=function(e){return Object.defineProperty(function(...t){if(typeof t[t.length-1]==="function")e.apply(this,t);else return new Promise((n,r)=>{t.push((o,s)=>o!=null?r(o):n(s)),e.apply(this,t)})},"name",{value:e.name})};rJr.fromPromise=function(e){return Object.defineProperty(function(...t){let n=t[t.length-1];if(typeof n!=="function")return e.apply(this,t);else t.pop(),e.apply(this,t).then((r)=>n(null,r),n)},"name",{value:e.name})}});
export {AC};
