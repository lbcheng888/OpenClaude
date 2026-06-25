// @ts-nocheck
import {Wt,ps} from "./m230.ts";
import {Yrn,Xl} from "../src/config/0651_maxBytes.ts";
import {b} from "../runtime.ts";
class gBa{cache=new Map;maxCacheSize=1000;readFile(e){let t=Wt(),n;try{n=t.statSync(e)}catch(a){throw this.cache.delete(e),a}let r=e,o=this.cache.get(r);if(o&&o.mtime===n.mtimeMs)return{content:o.content,encoding:o.encoding};let s=Yrn(e),i=t.readFileSync(e,{encoding:s}).replaceAll(`\r
`,`
`);if(this.cache.set(r,{content:i,encoding:s,mtime:n.mtimeMs}),this.cache.size>this.maxCacheSize){let a=this.cache.keys().next().value;if(a)this.cache.delete(a)}return{content:i,encoding:s}}clear(){this.cache.clear()}invalidate(e){this.cache.delete(e)}getStats(){return{size:this.cache.size,entries:Array.from(this.cache.keys())}}}
function Suo(e){let{content:t}=Zwp.readFile(e);return t}
var Zwp;
var _Ba=b(()=>{Xl();ps();Zwp=new gBa});
export {gBa,Suo,Zwp,_Ba};
