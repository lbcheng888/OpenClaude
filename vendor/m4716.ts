// @ts-nocheck
import {X} from "../runtime.ts";
import {ODe} from "./m4710.ts";
import {DDe} from "./m4697.ts";
var xAl=X((c5y,RAl)=>{var gXp=ODe(),_Xp=DDe();function kmt(e){this.mode=gXp.KANJI,this.data=e}kmt.getBitsLength=function(t){return t*13};kmt.prototype.getLength=function(){return this.data.length};kmt.prototype.getBitsLength=function(){return kmt.getBitsLength(this.data.length)};kmt.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=_Xp.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}};RAl.exports=kmt});
export {xAl};
