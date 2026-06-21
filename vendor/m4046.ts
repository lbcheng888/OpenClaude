// @ts-nocheck
import {jt,ws} from "./m228.ts";
import {ftn,mc} from "../src/config/0645_maxBytes.ts";
import {b} from "../runtime.ts";
class lUa{cache=new Map;maxCacheSize=1000;readFile(e){let t=jt(),n;try{n=t.statSync(e)}catch(a){throw this.cache.delete(e),a}let r=e,o=this.cache.get(r);if(o&&o.mtime===n.mtimeMs)return{content:o.content,encoding:o.encoding};let s=ftn(e),i=t.readFileSync(e,{encoding:s}).replaceAll(`\r
`,`
`);if(this.cache.set(r,{content:i,encoding:s,mtime:n.mtimeMs}),this.cache.size>this.maxCacheSize){let a=this.cache.keys().next().value;if(a)this.cache.delete(a)}return{content:i,encoding:s}}clear(){this.cache.clear()}invalidate(e){this.cache.delete(e)}getStats(){return{size:this.cache.size,entries:Array.from(this.cache.keys())}}}
function plo(e){let{content:t}=$vp.readFile(e);return t}
var $vp;
var cUa=b(()=>{mc();ws();$vp=new lUa});
export {lUa,plo,$vp,cUa};
