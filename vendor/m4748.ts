// @ts-nocheck
import {Q} from "../runtime.ts";
import {DPe} from "./m4742.ts";
import {IPe} from "./m4729.ts";
var ACl=Q((prS,CCl)=>{var Iim=DPe(),xim=IPe();function $ht(e){this.mode=Iim.KANJI,this.data=e}$ht.getBitsLength=function(t){return t*13};$ht.prototype.getLength=function(){return this.data.length};$ht.prototype.getBitsLength=function(){return $ht.getBitsLength(this.data.length)};$ht.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=xim.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}};CCl.exports=$ht});
export {ACl};
